import { postConfig, getConfig, putConfig, deleteConfig } from "../fetchConfig";

import type {
  AllGetPacienteResponse,
  DestroyPacienteResponse,
  PacienteResponse,
} from "@/types/Api/Paciente/pacienteResponse";

import type {
  PacienteFormValues,
  PacienteChartsData as PacienteChartData,
  PacienteCardsData as PacienteCardData,
} from "@/types/paciente";

export const getAllPacientes = async (): Promise<AllGetPacienteResponse> => {
  return await getConfig<AllGetPacienteResponse>("pacientes");
};

export const getPacienteById = async (
  id: number,
): Promise<PacienteResponse> => {
  return await getConfig<PacienteResponse>(`pacientes/${id}`);
};

export const createPaciente = async (
  datos: PacienteFormValues,
): Promise<PacienteResponse> => {
  return await postConfig<PacienteResponse, PacienteFormValues>(
    "pacientes",
    datos,
  );
};

export const updatePaciente = async (
  id: number,
  datos: PacienteFormValues,
): Promise<PacienteResponse> => {
  return await putConfig<PacienteResponse, PacienteFormValues>(
    `pacientes/${id}`,
    datos,
  );
};

export const estadoPaciente = async (id: number): Promise<PacienteResponse> => {
  return await putConfig<PacienteResponse, {}>(`pacientes/activate/${id}`, {});
};

export const deletePaciente = async (
  id: number,
): Promise<DestroyPacienteResponse> => {
  return await deleteConfig<DestroyPacienteResponse>(`pacientes/${id}`);
};

export const PacienteCardsData = async (): Promise<PacienteCardData> => {
  return await getConfig<PacienteCardData>("dashboard/cards-data");
};

export const PacienteChartGeneroData = async () => {
  return await getConfig<PacienteChartData[]>("dashboard/chart-genero");
};

export const PacienteChartSangreData = async () => {
  return await getConfig<PacienteChartData[]>("dashboard/chart-sangre");
};
