import { useMemo, useState, useEffect, useCallback } from "react";
import {
  getAllPacientes,
  createPaciente,
  updatePaciente,
  deletePaciente,
  estadoPaciente,
  PacienteCardsData,
  PacienteChartGeneroData,
  PacienteChartSangreData,
} from "@/service/Paciente/PacienteService";
import type {
  ClaveColumnaPaciente,
  Paciente,
  PacienteFormValues,
  PacienteChartsData as PacienteChartData,
} from "@/types/paciente";

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

  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroGenero, setFiltroGenero] = useState("todos");

  const [columnasVisibles, setColumnasVisibles] = useState(
    columnasVisiblesIniciales,
  );

  const [totalPacientes, setTotalPacientes] = useState(0);
  const [pacientesActivos, setPacientesActivos] = useState(0);
  const [pacientesInactivos, setPacientesInactivos] = useState(0);
  const [pacientesEdadPromedio, setPacientesEdadPromedio] = useState(0);

  const [pacientesPorGenero, setPacientesPorGenero] = useState<
    PacienteChartData[]
  >([]);
  const [pacientesPorTipoSangre, setPacientesPorTipoSangre] = useState<
    PacienteChartData[]
  >([]);

  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
  const [pacienteSeleccionado, setPacienteSeleccionado] =
    useState<Paciente | null>(null);

  const [modalFormAbierto, setModalFormAbierto] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [datosForm, setDatosForm] = useState<PacienteFormValues | null>(null);

  const [modalDeleteAbierto, setModalDeleteAbierto] = useState(false);

  const cargarDatos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllPacientes();
      setPacientes(response?.pacientes || []);
    } catch (err) {
      setError("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

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

  const formatFecha = (fecha: string | Date | undefined) => {
    if (!fecha) return "-";
    const date = typeof fecha === "string" ? new Date(fecha) : fecha;
    if (isNaN(date.getTime())) return "-";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const onVerDetalle = (paciente: Paciente) => {
    setPacienteSeleccionado(paciente);
    setModalDetalleAbierto(true);
  };

  const onNuevoPaciente = () => {
    setModalMode("create");
    setDatosForm(null);
    setModalFormAbierto(true);
  };

  const onEditarPaciente = (paciente: Paciente) => {
    setModalMode("edit");
    setPacienteSeleccionado(paciente);
    setDatosForm({
      dni: paciente.dni,
      nombres: paciente.nombres,
      apellidos: paciente.apellidos,
      fecha_nacimiento: paciente.fecha_nacimiento,
      genero: paciente.genero,
      celular: paciente.celular || "",
      email: paciente.email || "",
      tipo_sangre: paciente.tipo_sangre,
      seguro_medico: paciente.seguro_medico || "",
      estado: paciente.estado,
    });
    setModalFormAbierto(true);
  };

  const onGuardarPaciente = async (values: PacienteFormValues) => {
    try {
      setLoading(true);
      if (modalMode === "create") {
        await createPaciente(values);
      } else if (modalMode === "edit" && pacienteSeleccionado) {
        await updatePaciente(pacienteSeleccionado.id, values);
      }
      await cargarDatos();
      setModalFormAbierto(false);
    } catch (err) {
      setError("Error al guardar el paciente");
    } finally {
      setLoading(false);
    }
  };

  const onAbrirGestion = (paciente: Paciente) => {
    setPacienteSeleccionado(paciente);
    setModalDeleteAbierto(true);
  };

  const onCambiarEstado = async (paciente: Paciente) => {
    try {
      setLoading(true);
      await estadoPaciente(paciente.id);
      await cargarDatos();
      setModalDeleteAbierto(false);
    } catch (err) {
      setError("Error al cambiar estado");
    } finally {
      setLoading(false);
    }
  };

  const onEliminar = async (paciente: Paciente) => {
    try {
      setLoading(true);
      await deletePaciente(paciente.id);
      await cargarDatos();
      setModalDeleteAbierto(false);
    } catch (err) {
      setError("Error al eliminar el paciente");
    } finally {
      setLoading(false);
    }
  };

  const onCardsData = useCallback(async () => {
    try {
      const data: any = await PacienteCardsData();
      setTotalPacientes(data[0].total_pacientes);
      setPacientesActivos(data[0].pacientes_activos);
      setPacientesInactivos(data[0].pacientes_inactivos);
      setPacientesEdadPromedio(data[0].edad_promedio);
    } catch (err) {
      setError("Error al cargar datos de tarjetas");
    }
  }, []);

  const onChartGeneroData = useCallback(async () => {
    try {
      const data = await PacienteChartGeneroData();
      setPacientesPorGenero(data);
    } catch (err) {
      setError("Error al cargar datos de género");
    }
  }, []);

  const onChartSangreData = useCallback(async () => {
    try {
      const data = await PacienteChartSangreData();
      setPacientesPorTipoSangre(data);
    } catch (err) {
      setError("Error al cargar datos de tipo de sangre");
    }
  }, []);

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
    onVerDetalle,
    modalDetalleAbierto,
    setModalDetalleAbierto,
    pacienteSeleccionado,
    modalFormAbierto,
    setModalFormAbierto,
    modalMode,
    datosForm,
    onNuevoPaciente,
    onEditarPaciente,
    onGuardarPaciente,
    onAbrirGestion,
    onCambiarEstado,
    onEliminar,
    modalDeleteAbierto,
    setModalDeleteAbierto,
    onChartGeneroData,
    onChartSangreData,
    pacientesPorGenero,
    pacientesPorTipoSangre,
    onCardsData,
    totalPacientes,
    pacientesActivos,
    pacientesInactivos,
    pacientesEdadPromedio,
  };
}
