
export interface LoginData {
  token: string;
  username: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginData;
}
