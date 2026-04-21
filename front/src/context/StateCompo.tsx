import { useState } from "react";
import { authContext } from "./authContext";
import type { EstadoAuth } from "@/types/auth";

export function StateCompo({ children }: { children: React.ReactNode }) {
  const [estadoAuth, setEstadoAuth] = useState<EstadoAuth>({
    usuario: null,
    autenticado: false,
    cargando: false,
    error: null,
  });

  return (
    <authContext.Provider value={{ estadoAuth, setEstadoAuth }}>
      {children}
    </authContext.Provider>
  );
}
