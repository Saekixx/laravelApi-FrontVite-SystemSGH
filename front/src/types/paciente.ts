export type GeneroPaciente = "Masculino" | "Femenino" | "Otro";

export type Paciente = {
  id: number;
  dni: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  genero: GeneroPaciente;
  celular: string | null;
  email: string | null;
  tipo_sangre: string;
  seguro_medico: string | null;
  estado: boolean;
  created_at: string;
  updated_at: string;
};

export type PacienteFormValues = {
  dni: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  genero: GeneroPaciente;
  celular: string;
  email: string;
  tipo_sangre: string;
  seguro_medico: string;
  estado: boolean;
};

export type ClaveColumnaPaciente =
  | "dni"
  | "nombres"
  | "apellidos"
  | "fecha_nacimiento"
  | "genero"
  | "celular"
  | "email"
  | "tipo_sangre"
  | "seguro_medico"
  | "estado"
  | "created_at"
  | "updated_at";

export type PacienteCardsData = {
  total_pacientes: number;
  pacientes_activos: number;
  pacientes_inactivos: number;
  edad_promedio: number;
};

export type PacienteChartsData = {
  tipo?: string;
  genero?: string; // Solo para gráfico de género
  cantidad: number;
};
