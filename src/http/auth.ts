import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import type { AuthResponse, LoginRequest, RegisterRequest } from "./types/auth";
import $api from "./api";

export default class AuthService {
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      console.log("Attempting login...");
      const response = await $api.post<AuthResponse>("/auth/login", credentials);

      console.log("resp", response.data);
      console.log("token", response.data.accessToken);
      console.log("role", response.data.role);
      console.log("email", response.data.email);
      console.log("id", response.data.userId);

      if (response.data.accessToken) {
        await AsyncStorage.setItem("accessToken", response.data.accessToken);
        await AsyncStorage.setItem("userRole", response.data.role);
        await AsyncStorage.setItem("userEmail", response.data.email);
        await AsyncStorage.setItem("userId", String(response.data.userId));
        console.log("Login successful, tokens saved");
      }

      return response.data;
    } catch {
      throw new Error("Login failed");
    }
  }

  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await $api.post<AuthResponse>("/auth/register", userData);

      if (response.data.accessToken) {
        await AsyncStorage.setItem("accessToken", response.data.accessToken);
        await AsyncStorage.setItem("userRole", response.data.role);
        await AsyncStorage.setItem("userEmail", response.data.email);
      }

      return response.data;
    } catch {
      throw new Error("Registration failed");
    }
  }

  static async refreshToken(): Promise<string> {
    try {
      //const BASE_URL = 'http://192.168.0.104:9081/api';
      const refreshApi = axios.create({
        //   baseURL: 'http://192.168.1.14:7081/api',

        baseURL: "http://192.168.1.14:7081/api",
        withCredentials: true,
        timeout: 10000,
      });

      const token = await AsyncStorage.getItem("accessToken");

      if (token) {
        refreshApi.defaults.headers.Authorization = `Bearer ${token}`;
      }

      const response = await refreshApi.get<AuthResponse>("/auth/refresh");

      if (response.data.accessToken) {
        await AsyncStorage.setItem("accessToken", response.data.accessToken);

        return response.data.accessToken;
      }

      throw new Error("No access token in response");
    } catch {
      console.log("  Token refresh failed:");

      await this.clearStorage();
      throw new Error("SESSION_EXPIRED");
    }
  }

  static async logout(): Promise<void> {
    try {
      await $api.post("/auth/logout");
    } catch {
      console.log("Error");
    } finally {
      await this.clearStorage();
    }
  }

  static async validateToken(): Promise<AuthResponse> {
    try {
      const response = await $api.get<AuthResponse>("/auth/validate");

      return response.data;
    } catch {
      console.log("Val failed");
      throw new Error("Token validation failed");
    }
  }

  static async getCurrentUser() {
    try {
      const [token, role, email, userId] = await Promise.all([
        AsyncStorage.getItem("accessToken"),
        AsyncStorage.getItem("userRole"),
        AsyncStorage.getItem("userEmail"),
        AsyncStorage.getItem("userId"),
      ]);

      if (!token) {
        return null;
      }

      return {
        accessToken: token,
        role,
        email,
        userId,
      };
    } catch {
      return null;
    }
  }
  static async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem("accessToken");

      if (!token) {
        return false;
      }

      await this.validateToken();

      return true;
    } catch {
      return false;
    }
  }

  private static async clearStorage(): Promise<void> {
    await AsyncStorage.multiRemove(["accessToken", "userRole", "userEmail"]);
  }
}
