export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: any;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
