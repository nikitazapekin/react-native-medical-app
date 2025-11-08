import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

import AuthService from './auth';

/* const BASE_URL = 'http://192.168.1.14:7081/api'; */
const BASE_URL = 'http://192.168.1.14:7081/api';

const $api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

interface FailedQueueItem {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {

  failedQueue.forEach(prom => {
    if (error) {

      prom.reject(error);
    } else if (token) {

      prom.resolve(token);
    }
  });
  failedQueue = [];
};

$api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {

    if (config.url !== '/auth/refresh') {
      const token = await AsyncStorage.getItem('accessToken');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;

      }
    }

    return config;
  },
  (error: AxiosError) => {

    return Promise.reject(error);
  }
);

$api.interceptors.response.use(
  (response: AxiosResponse) => {

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean,
      _skipRefresh?: boolean
    };

    if (originalRequest.url === '/auth/refresh') {

      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest._skipRefresh) {

      if (isRefreshing) {

        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token: string) => {
            if (token === 'SESSION_EXPIRED') {

              throw new Error('SESSION_EXPIRED');
            }

            originalRequest.headers.Authorization = `Bearer ${token}`;

            return $api(originalRequest);
          })
          .catch((err: Error) => {

            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {

        const newAccessToken = await AuthService.refreshToken();

        await AsyncStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        return $api(originalRequest);

      } catch  {

        await AsyncStorage.multiRemove(['accessToken', 'userRole', 'userEmail']);

        const sessionExpiredError = new Error('SESSION_EXPIRED');

        sessionExpiredError.name = 'SESSION_EXPIRED';

        processQueue(sessionExpiredError, 'SESSION_EXPIRED');

        return Promise.reject(sessionExpiredError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.status === 401) {

      await AsyncStorage.multiRemove(['accessToken', 'userRole', 'userEmail']);

      const sessionExpiredError = new Error('SESSION_EXPIRED');

      sessionExpiredError.name = 'SESSION_EXPIRED';

      return Promise.reject(sessionExpiredError);
    }

    return Promise.reject(error);
  }
);

export default $api;
