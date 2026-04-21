export type UsuarioAuth = {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
};

export type CredencialesLogin = {
  email: string;
  password: string;
};

export type DatosRegistro = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type ResetPassword = {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
};

export type AuthResponse = {
  message: string;
  accessToken: string;
  token_type: string;
  user: UsuarioAuth;
};

export type EstadoAuth = {
  usuario: UsuarioAuth | null;
  autenticado: boolean;
  cargando: boolean;
  error: string | null;
};
