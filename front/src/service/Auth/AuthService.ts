import { postConfig } from "../fetchConfig";

import type { loginResponse, registerResponse } from "@/types/apiResponse";

import type {
  AuthResponse,
  CredencialesLogin,
  DatosRegistro,
} from "@/types/auth";

export const login = async (
  datos: CredencialesLogin,
): Promise<loginResponse> => {
  return await postConfig<loginResponse, CredencialesLogin>("login", datos);
};

export const register = async (
  datos: DatosRegistro,
): Promise<registerResponse> => {
  return await postConfig<registerResponse, DatosRegistro>("register", datos);
};

export const logout = async (): Promise<{ message: string }> => {
  return await postConfig<{ message: string }, {}>("logout", {});
};
