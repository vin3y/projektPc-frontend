import { api } from "@/api/axios";

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;

  user: {
    id: number;
    username: string;
    email: string;
  };
}

export const login = async (payLoad: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post("/projektpc/v1/auth/login", payLoad);
  return response.data;
};
