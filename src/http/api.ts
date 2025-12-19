import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

const BASE_URL = 'http:///192.168.1.14:7082/api';

const $api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
});
 

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
