import { useMemo, useState, useEffect } from "react";
import { getAllPacientes } from "@/service/Paciente/PacienteService";
import type { ClaveColumnaPaciente, Paciente } from "@/types/paciente";

const columnasPaciente: Array<{ key: ClaveColumnaPaciente; label: string }> = [
  { key: "dni", label: "DNI" },
  { key: "nombres", label: "Nombres" },
  { key: "apellidos", label: "Apellidos" },
  { key: "fecha_nacimiento", label: "Fecha nacimiento" },
  { key: "genero", label: "Genero" },
  { key: "celular", label: "Celular" },
  { key: "email", label: "Email" },
  { key: "tipo_sangre", label: "Tipo sangre" },
  { key: "seguro_medico", label: "Seguro medico" },
  { key: "estado", label: "Estado" },
  { key: "created_at", label: "Creado" },
  { key: "updated_at", label: "Actualizado" },
];

const columnasVisiblesIniciales: Record<ClaveColumnaPaciente, boolean> = {
  dni: true,
  nombres: true,
  apellidos: true,
  fecha_nacimiento: true,
  genero: true,
  celular: false,
  email: true,
  tipo_sangre: true,
  seguro_medico: false,
  estado: true,
  created_at: false,
  updated_at: false,
};

export function usePaciente() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para filtros
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroGenero, setFiltroGenero] = useState("todos");

  // Estado para columnas visibles
  const [columnasVisibles, setColumnasVisibles] = useState(
    columnasVisiblesIniciales,
  );

  // Modal de detalle
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
  const [pacienteSeleccionado, setPacienteSeleccionado] =
    useState<Paciente | null>(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const response = await getAllPacientes();
        setPacientes(response?.pacientes || []);
      } catch (err) {
        setError("Error al cargar datos");
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  const pacientesFiltrados = useMemo(() => {
    return pacientes.filter((p) => {
      const cumpleBusqueda =
        p.dni.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.nombres.toLowerCase().includes(busqueda.toLowerCase());
      const cumpleEstado =
        filtroEstado === "todos" ||
        (filtroEstado === "activos" ? p.estado : !p.estado);
      const cumpleGenero =
        filtroGenero === "todos" || p.genero === filtroGenero;

      return cumpleBusqueda && cumpleEstado && cumpleGenero;
    });
  }, [pacientes, busqueda, filtroEstado, filtroGenero]);

  const columnasActivas = useMemo(() => {
    return columnasPaciente.filter((col) => columnasVisibles[col.key]);
  }, [columnasVisibles]);

  const toggleColumna = (key: ClaveColumnaPaciente) => {
    setColumnasVisibles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  function formatFecha(fecha: string | Date | undefined) {
    if (!fecha) return "-";
    const date = typeof fecha === "string" ? new Date(fecha) : fecha;
    if (isNaN(date.getTime())) return "-";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }

  const onVerDetalle = (paciente: Paciente) => {
    setPacienteSeleccionado(paciente);
    setModalDetalleAbierto(true);
  };

  return {
    pacientes: pacientesFiltrados,
    loading,
    busqueda,
    setBusqueda,
    filtroEstado,
    setFiltroEstado,
    filtroGenero,
    setFiltroGenero,
    columnasTodas: columnasPaciente,
    columnasActivas,
    columnasVisibles,
    toggleColumna,
    error,
    formatFecha,
    // Modal detalle
    onVerDetalle,
    modalDetalleAbierto,
    setModalDetalleAbierto,
    pacienteSeleccionado,
  };
}
