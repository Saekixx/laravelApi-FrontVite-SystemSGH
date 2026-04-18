export type UsuarioAuth = {
  id: number;
  nombre: string;
  email: string;
  rol: "admin" | "medico" | "recepcion";
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

export type SolicitudRecuperacion = {
  email: string;
};

export type SolicitudRestablecimiento = {
  password: string;
  password_confirmation: string;
};

export type EstadoAuth = {
  usuario: UsuarioAuth | null;
  autenticado: boolean;
  cargando: boolean;
  error: string | null;
};
