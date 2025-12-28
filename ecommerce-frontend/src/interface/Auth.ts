import type { CommonResponse } from "./CommonResponse";

export interface LoginData {
  token: string;
  username: string;
}

export interface LoginResponse extends CommonResponse{
  data: LoginData;
}
