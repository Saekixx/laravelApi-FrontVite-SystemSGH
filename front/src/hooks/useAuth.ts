import {
  login,
  register,
  logout,
  resetPasswordLink,
  resetPassword,
  getprofile,
  actualizarProfile,
} from "@/service/Auth/AuthService";

import type { UsuarioAuth } from "@/types/auth";

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
} from "@/types/Api/Auth/apiResponse";

import { useContext, useState, useCallback } from "react";
import { authContext } from "@/context/authContext";
import type { profile } from "@/types/Api/Auth/apiResponse";

export function useAuth() {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("useAuth debe estar dentro de StateCompo");
  }

  const { estadoAuth, setEstadoAuth } = context;
  const [profile, setProfile] = useState<profile | null>(null);

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

  const obtenerProfile = async (email: string) => {
    try {
      const response = await getprofile(email);
      if (response && response.user) {
        const perfilCompleto = {
          ...response.user,
          avatar: response.avatar_url,
        };
        setProfile(perfilCompleto);
      }
    } catch (error) {
      console.log("Error al obtener el perfil:", error);
    }
  };

  const guardarProfile = async (datos: any) => {
    try {
      const response = await actualizarProfile(datos);

      if (response && response.user) {
        const perfilActualizado = {
          ...response.user,
          avatar: response.avatar_url,
        };

        setProfile(perfilActualizado);

        setEstadoAuth((prev) => ({
          ...prev,
          usuario: perfilActualizado,
        }));

        console.log("Estado global sincronizado con nueva foto");
      }

      return response;
    } catch (error) {
      console.error("Error al guardar:", error);
      throw error;
    }
  };

  const cargarPerfilCompleto = useCallback(async () => {
    const email = estadoAuth.email || estadoAuth.usuario?.email;

    if (email && !estadoAuth.usuario?.avatar) {
      try {
        const response = await getprofile(email);

        if (response?.user) {
          setEstadoAuth((prev) => ({
            ...prev,
            usuario: {
              ...response.user,
              avatar: response.avatar_url,
            },
            email: email,
          }));
        }
      } catch (error) {
        console.error("Error al sincronizar perfil:", error);
      }
    }
  }, [estadoAuth.email, estadoAuth.usuario?.email, setEstadoAuth]);

  return {
    estadoAuth,
    setEstadoAuth,
    IniciarSesion,
    Registrar,
    CerrarSesion,
    GoogleLogin,
    RecuperarPasswordEmail,
    ReestablecerPassword,
    limpiarError,
    profile,
    setProfile,
    obtenerProfile,
    guardarProfile,
    cargarPerfilCompleto,
  };
}
