import { createContext, type Dispatch, type SetStateAction } from "react";
import type { EstadoAuth } from "@/types/auth";

interface AuthContextType {
  estadoAuth: EstadoAuth;
  setEstadoAuth: Dispatch<SetStateAction<EstadoAuth>>;
}

export const authContext = createContext<AuthContextType | undefined>(
  undefined,
);
