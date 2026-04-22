import { postConfig } from "../fetchConfig";

import type {
  loginResponse,
  registerResponse,
  resetPasswordRequest,
} from "@/types/Api/Auth/apiResponse";

import type { CredencialesLogin, DatosRegistro } from "@/types/auth";

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

export const resetPasswordLink = async (
  email: string,
): Promise<{ message: string }> => {
  return await postConfig<{ message: string }, { email: string }>(
    "password/email",
    { email },
  );
};

export const resetPassword = async (
  data: resetPasswordRequest,
): Promise<{ message: string }> => {
  return await postConfig<{ message: string }, resetPasswordRequest>(
    "password/reset",
    data,
  );
};
