import type { UsuarioAuth } from "./auth";

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
  user: UsuarioAuth;
  message: string;
};

export type registerErrorResponse = {
  message: string;
};
