import type { Paciente } from "@/types/paciente";

export type AllGetPacienteResponse = {
  pacientes: Paciente[];
  message: string;
};

export type PacienteResponse = {
  paciente: Paciente;
  message: string;
};

export type DestroyPacienteResponse = {
  message: string;
};
