export const patientsByMonth = [
  { month: "Ene", pacientes: 18 },
  { month: "Feb", pacientes: 24 },
  { month: "Mar", pacientes: 21 },
  { month: "Abr", pacientes: 29 },
  { month: "May", pacientes: 31 },
  { month: "Jun", pacientes: 36 },
];

export const patientsByGender = [
  { genero: "Masculino", cantidad: 54 },
  { genero: "Femenino", cantidad: 63 },
  { genero: "Otro", cantidad: 9 },
];

export const totalPatients = patientsByGender.reduce(
  (total, row) => total + row.cantidad,
  0,
);
