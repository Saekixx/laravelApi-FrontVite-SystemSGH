import { useState } from "react";
import { login, register, logout } from "@/service/Auth/AuthService";
import type {
  CredencialesLogin,
  DatosRegistro,
  AuthResponse,
  UsuarioAuth,
  EstadoAuth,
} from "@/types/auth";

import type {
  loginResponse,
  loginErrorResponse,
  registerErrorResponse,
  registerResponse,
} from "@/types/apiResponse";

export function useAuth() {
  const [estadoAuth, setEstadoAuth] = useState<EstadoAuth>({
    usuario: null,
    autenticado: false,
    cargando: false,
    error: null,
  });

  const IniciarSesion = async (datos: CredencialesLogin) => {
    setEstadoAuth((prev) => ({ ...prev, cargando: true, error: null }));
    try {
      const response: loginResponse = await login(datos);
      // Guarda el token en localStorage
      localStorage.setItem("token", response.access_token);
      setEstadoAuth({
        usuario: response.user,
        autenticado: true,
        cargando: false,
        error: null,
      });
      return { ok: true };
    } catch (error) {
      const errorResponse = error as loginErrorResponse;
      setEstadoAuth((prev) => ({
        ...prev,
        cargando: false,
        error: errorResponse.message,
      }));
      return { ok: false, error: errorResponse.message };
    }
  };

  const Registrar = async (datos: DatosRegistro) => {
    setEstadoAuth((prev) => ({ ...prev, cargando: true, error: null }));
    try {
      const response: registerResponse = await register(datos);
      // Guarda el token en localStorage
      localStorage.setItem("token", response.access_token);
      setEstadoAuth((prev) => ({
        ...prev,
        usuario: response.user,
        autenticado: true,
        cargando: false,
        error: null,
      }));
      return { ok: true };
    } catch (error) {
      const errorResponse = error as registerErrorResponse;
      setEstadoAuth((prev) => ({
        ...prev,
        cargando: false,
        error: errorResponse.message,
      }));
      return { ok: false, error: errorResponse.message };
    }
  };

  const CerrarSesion = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      setEstadoAuth({
        usuario: null,
        autenticado: false,
        cargando: false,
        error: null,
      });
    } catch (error) {
      // Ignoramos los errores al cerrar sesión, ya que el token se eliminará de todos modos
    }
  };

  return {
    estadoAuth,
    IniciarSesion,
    Registrar,
    CerrarSesion,
  };
}
