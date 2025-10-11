import axios, { AxiosError } from "axios";
import { BASE_URL } from "../config";
import { handleApiError } from "../util/ExceptionHandler";
import type { LoginResponse } from "../interface/Auth";

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

      console.log("✅ Login Successful:", response.data);
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
};
