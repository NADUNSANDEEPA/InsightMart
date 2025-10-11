import axios, { AxiosError } from "axios";
import { BASE_URL } from "../config";
import { handleApiError } from "../util/ExceptionHandler";
import type { LoginResponse } from "../interface/Auth";
import type { TokenInitializeRequest } from "../interface/TokenInitializeRequest";
import type { User } from "../interface/AuthUser";

const api = axios.create({
  baseURL: `${BASE_URL}/api/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------------------------
// Auth Service
// ---------------------------
export const AuthService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>("/login", {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.post("/logout");
      console.log("🚪 Logged out successfully");
    } catch (error) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },

  visitorReg: async (request: TokenInitializeRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>("/visitor-reg", request);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },

  authUserReg: async (request: User): Promise<any> => {
    try {
      const response = await api.post("/register", request);
      console.log("User Registered:", response.data);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },

  getPublicIP: async (): Promise<string> => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (err) {
      console.error("Failed to get IP:", err);
      return "0.0.0.0";
    }
  },

  getDeviceId: async (): Promise<string> => {
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem("deviceId", deviceId);
    }
    return deviceId;
  }
};
