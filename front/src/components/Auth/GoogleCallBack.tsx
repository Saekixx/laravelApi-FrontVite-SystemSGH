import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setEstadoAuth } = useAuth(); // Asegúrate de que useAuth devuelva setEstadoAuth

  useEffect(() => {
    const token = searchParams.get("token");
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    // Puedes recibir más datos: nombre, avatar, etc.

    if (token) {
      // Guardar en LocalStorage para persistencia
      localStorage.setItem("token", token);

      // Actualizar el estado global
      setEstadoAuth({
        usuario: { name: name || "Usuario", email: email || undefined },
        autenticado: true,
        cargando: false,
        error: null,
      });

      // Limpiar la URL y mandarlo al Dashboard
      navigate("/dashboard", { replace: true });
    } else {
      // Si algo falló
      navigate("/login", { replace: true });
    }
  }, [searchParams, navigate, setEstadoAuth]);

  return <div>Procesando inicio de sesión con Google...</div>;
};
