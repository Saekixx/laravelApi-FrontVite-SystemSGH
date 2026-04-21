import {
  login,
  register,
  logout,
  resetPasswordLink,
  resetPassword,
} from "@/service/Auth/AuthService";

import type {
  CredencialesLogin,
  DatosRegistro,
  ResetPassword,
} from "@/types/auth";

import type {
  loginResponse,
  loginErrorResponse,
  registerErrorResponse,
  registerResponse,
} from "@/types/apiResponse";

import { useContext } from "react";
import { authContext } from "@/context/authContext";

export function useAuth() {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("useAuth debe estar dentro de StateCompo");
  }

  const { estadoAuth, setEstadoAuth } = context;

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

  const GoogleLogin = async () => {
    try {
      window.location.href = "http://localhost:8000/api/google-auth/redirect";
    } catch (error) {
      // Manejar errores de inicio de sesión con Google si es necesario
    }
  };

  const RecuperarPasswordEmail = async (email: string) => {
    try {
      await resetPasswordLink(email);
    } catch (error) {
      // Manejar errores al enviar el enlace de recuperación de contraseña si es necesario
      alert(
        "Error al enviar el enlace de recuperación de contraseña. Por favor, inténtalo de nuevo.",
      );
    }
  };

  const ReestablecerPassword = async (data: ResetPassword) => {
    try {
      await resetPassword(data);
      alert(
        "Contraseña restablecida exitosamente. Ahora puedes iniciar sesión.",
      );
    } catch (error) {
      // Manejar errores al restablecer la contraseña si es necesario
      alert(
        "Error al restablecer la contraseña. Por favor, verifica los datos e inténtalo de nuevo.",
      );
    }
  };

  const limpiarError = () => {
    setEstadoAuth((prev) => ({ ...prev, error: null }));
  };

  return {
    estadoAuth,
    IniciarSesion,
    Registrar,
    CerrarSesion,
    GoogleLogin,
    RecuperarPasswordEmail,
    ReestablecerPassword,
    limpiarError,
  };
}
