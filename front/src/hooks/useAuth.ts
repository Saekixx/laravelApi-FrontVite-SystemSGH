import { useState } from "react";
import type {
  CredencialesLogin,
  DatosRegistro,
  EstadoAuth,
  SolicitudRecuperacion,
  SolicitudRestablecimiento,
  UsuarioAuth,
} from "@/types/auth";

const usuarioDemo: UsuarioAuth = {
  id: 1,
  nombre: "Usuario Demo",
  email: "demo@correo.com",
  rol: "medico",
};

function esperar(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function useAuth() {
  const [estadoAuth, setEstadoAuth] = useState<EstadoAuth>({
    usuario: null,
    autenticado: false,
    cargando: false,
    error: null,
  });

  async function iniciarSesion(credenciales: CredencialesLogin) {
    setEstadoAuth((previo) => ({ ...previo, cargando: true, error: null }));

    try {
      await esperar(300);

      if (!credenciales.email || !credenciales.password) {
        throw new Error("Email y contraseña son obligatorios.");
      }

      setEstadoAuth({
        usuario: { ...usuarioDemo, email: credenciales.email },
        autenticado: true,
        cargando: false,
        error: null,
      });

      return { ok: true as const };
    } catch (error) {
      const mensaje =
        error instanceof Error ? error.message : "Error al iniciar sesión.";

      setEstadoAuth((previo) => ({
        ...previo,
        cargando: false,
        error: mensaje,
      }));

      return { ok: false as const, error: mensaje };
    }
  }

  async function registrarUsuario(datos: DatosRegistro) {
    setEstadoAuth((previo) => ({ ...previo, cargando: true, error: null }));

    try {
      await esperar(300);

      if (!datos.email || !datos.password || !datos.name) {
        throw new Error("Nombre, email y contraseña son obligatorios.");
      }

      if (datos.password !== datos.password_confirmation) {
        throw new Error("La confirmación de contraseña no coincide.");
      }

      setEstadoAuth({
        usuario: {
          id: Date.now(),
          nombre: datos.name,
          email: datos.email,
          rol: "medico",
        },
        autenticado: true,
        cargando: false,
        error: null,
      });

      return { ok: true as const };
    } catch (error) {
      const mensaje =
        error instanceof Error ? error.message : "Error al registrar usuario.";

      setEstadoAuth((previo) => ({
        ...previo,
        cargando: false,
        error: mensaje,
      }));

      return { ok: false as const, error: mensaje };
    }
  }

  async function solicitarRecuperacion(datos: SolicitudRecuperacion) {
    setEstadoAuth((previo) => ({ ...previo, cargando: true, error: null }));

    try {
      await esperar(250);

      if (!datos.email) {
        throw new Error("Debes indicar un email para recuperar contraseña.");
      }

      setEstadoAuth((previo) => ({ ...previo, cargando: false, error: null }));
      return { ok: true as const };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : "Error al solicitar recuperación.";

      setEstadoAuth((previo) => ({
        ...previo,
        cargando: false,
        error: mensaje,
      }));

      return { ok: false as const, error: mensaje };
    }
  }

  async function restablecerContrasena(datos: SolicitudRestablecimiento) {
    setEstadoAuth((previo) => ({ ...previo, cargando: true, error: null }));

    try {
      await esperar(250);

      if (!datos.password) {
        throw new Error("La nueva contraseña es obligatoria.");
      }

      if (datos.password.length < 8) {
        throw new Error("La contraseña debe tener al menos 8 caracteres.");
      }

      if (datos.password !== datos.password_confirmation) {
        throw new Error("La confirmación de contraseña no coincide.");
      }

      setEstadoAuth((previo) => ({ ...previo, cargando: false, error: null }));
      return { ok: true as const };
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : "Error al restablecer la contraseña.";

      setEstadoAuth((previo) => ({
        ...previo,
        cargando: false,
        error: mensaje,
      }));

      return { ok: false as const, error: mensaje };
    }
  }

  function cerrarSesion() {
    setEstadoAuth({
      usuario: null,
      autenticado: false,
      cargando: false,
      error: null,
    });
  }

  function limpiarErrorAuth() {
    setEstadoAuth((previo) => ({ ...previo, error: null }));
  }

  return {
    estadoAuth,
    iniciarSesion,
    registrarUsuario,
    solicitarRecuperacion,
    restablecerContrasena,
    cerrarSesion,
    limpiarErrorAuth,
  };
}
