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

export type profile = {
  name: string;
  last_name: string;
  dni?: string;
  phone?: string;
  address?: string;
  email: string;
  avatar?: string;
};

export type profileResponse = {
  user: profile;
  avatar_url?: string;
  message: string;
};

export type profileFormValues = {
  name: string;
  last_name: string;
  email: string;
  dni?: string;
  phone?: string;
  address?: string;
  password?: string;
  password_confirmation?: string;
};
