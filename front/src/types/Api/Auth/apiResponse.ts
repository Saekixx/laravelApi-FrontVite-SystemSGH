import type { UsuarioAuth } from "@/types/auth";
export type loginResponse = {
  access_token: string;
  token_type: string;
  user: UsuarioAuth;
  message: string;
};

export type loginErrorResponse = {
  message: string;
};

export type registerResponse = {
  access_token: string;
  token_type: string;
  message: string;
};

export type registerErrorResponse = {
  message: string;
};

export type resetPasswordRequest = {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
};
