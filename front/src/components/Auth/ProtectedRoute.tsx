import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const ProtectedRoute = () => {
  const { estadoAuth } = useAuth();

  if (estadoAuth.cargando) {
    return <div>Cargando...</div>; // O un spinner
  }

  if (!estadoAuth.autenticado) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
