import { useMemo, useState } from "react";
import type {
  ClaveColumnaPaciente,
  Paciente,
  PacienteFormValues,
} from "@/types/paciente";

const datosInicialesPacientes: Paciente[] = [
  {
    id: 1,
    dni: "73219845",
    nombres: "Carlos",
    apellidos: "Gomez Rojas",
    fecha_nacimiento: "1988-04-12",
    genero: "Masculino",
    celular: "+57 300 111 2233",
    email: "carlos.gomez@email.com",
    tipo_sangre: "O+",
    seguro_medico: "Sanitas",
    estado: true,
    created_at: "2026-04-10T08:30:00Z",
    updated_at: "2026-04-16T11:20:00Z",
  },
  {
    id: 2,
    dni: "54677210",
    nombres: "Laura",
    apellidos: "Perez Molina",
    fecha_nacimiento: "1995-09-03",
    genero: "Femenino",
    celular: "+57 301 555 9800",
    email: "laura.perez@email.com",
    tipo_sangre: "A-",
    seguro_medico: "Sura",
    estado: true,
    created_at: "2026-04-11T09:15:00Z",
    updated_at: "2026-04-17T10:45:00Z",
  },
  {
    id: 3,
    dni: "88991123",
    nombres: "Alex",
    apellidos: "Torres Diaz",
    fecha_nacimiento: "2001-01-22",
    genero: "Otro",
    celular: null,
    email: "alex.torres@email.com",
    tipo_sangre: "B+",
    seguro_medico: null,
    estado: false,
    created_at: "2026-04-12T15:40:00Z",
    updated_at: "2026-04-15T14:05:00Z",
  },
  {
    id: 4,
    dni: "12003456",
    nombres: "Maria",
    apellidos: "Ramirez Soto",
    fecha_nacimiento: "1979-12-07",
    genero: "Femenino",
    celular: "+57 320 456 7788",
    email: null,
    tipo_sangre: "AB+",
    seguro_medico: "Compensar",
    estado: true,
    created_at: "2026-04-09T12:10:00Z",
    updated_at: "2026-04-13T16:50:00Z",
  },
  {
    id: 5,
    dni: "33344556",
    nombres: "Jorge",
    apellidos: "Castro Nunez",
    fecha_nacimiento: "1990-05-19",
    genero: "Masculino",
    celular: "+57 315 222 1100",
    email: "jorge.castro@email.com",
    tipo_sangre: "O-",
    seguro_medico: "Nueva EPS",
    estado: false,
    created_at: "2026-04-08T07:00:00Z",
    updated_at: "2026-04-14T09:22:00Z",
  },
];

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

function aNuloSiVacio(valor: string) {
  const texto = valor.trim();
  return texto.length > 0 ? texto : null;
}

export function usePaciente() {
  const [pacientes, setPacientes] = useState<Paciente[]>(
    datosInicialesPacientes,
  );
  const [busqueda, setBusqueda] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("todos");
  const [filtroEstado, setFiltroEstado] = useState("todos");

  const [modalPacienteAbierto, setModalPacienteAbierto] = useState(false);
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);

  const [pacienteEnEdicion, setPacienteEnEdicion] = useState<Paciente | null>(
    null,
  );
  const [pacienteAEliminar, setPacienteAEliminar] = useState<Paciente | null>(
    null,
  );
  const [pacienteEnDetalle, setPacienteEnDetalle] = useState<Paciente | null>(
    null,
  );

  const [columnasVisibles, setColumnasVisibles] = useState<
    Record<ClaveColumnaPaciente, boolean>
  >(columnasVisiblesIniciales);

  const pacientesFiltrados = useMemo(() => {
    return pacientes.filter((paciente) => {
      const textoBusqueda =
        `${paciente.dni} ${paciente.nombres} ${paciente.apellidos} ${paciente.email ?? ""}`.toLowerCase();
      const coincideBusqueda = textoBusqueda.includes(busqueda.toLowerCase());
      const coincideGenero =
        filtroGenero === "todos" || paciente.genero === filtroGenero;
      const coincideEstado =
        filtroEstado === "todos" ||
        (filtroEstado === "activos" ? paciente.estado : !paciente.estado);

      return coincideBusqueda && coincideGenero && coincideEstado;
    });
  }, [busqueda, filtroEstado, filtroGenero, pacientes]);

  const columnasActivas = useMemo(
    () => columnasPaciente.filter((columna) => columnasVisibles[columna.key]),
    [columnasVisibles],
  );

  const valoresInicialesModalPaciente: PacienteFormValues | undefined =
    pacienteEnEdicion
      ? {
          dni: pacienteEnEdicion.dni,
          nombres: pacienteEnEdicion.nombres,
          apellidos: pacienteEnEdicion.apellidos,
          fecha_nacimiento: pacienteEnEdicion.fecha_nacimiento,
          genero: pacienteEnEdicion.genero,
          celular: pacienteEnEdicion.celular ?? "",
          email: pacienteEnEdicion.email ?? "",
          tipo_sangre: pacienteEnEdicion.tipo_sangre,
          seguro_medico: pacienteEnEdicion.seguro_medico ?? "",
          estado: pacienteEnEdicion.estado,
        }
      : undefined;

  function formatearFecha(fecha: string) {
    return new Date(fecha).toLocaleDateString("es-CO");
  }

  function cambiarVisibilidadColumna(
    columna: ClaveColumnaPaciente,
    visible: boolean,
  ) {
    setColumnasVisibles((previo) => ({
      ...previo,
      [columna]: visible,
    }));
  }

  function abrirCrearPaciente() {
    setPacienteEnEdicion(null);
    setModalPacienteAbierto(true);
  }

  function abrirEditarPaciente(paciente: Paciente) {
    setPacienteEnEdicion(paciente);
    setModalPacienteAbierto(true);
  }

  function pedirConfirmacionEliminar(paciente: Paciente) {
    setPacienteAEliminar(paciente);
    setModalEliminarAbierto(true);
  }

  function abrirDetallePaciente(paciente: Paciente) {
    setPacienteEnDetalle(paciente);
    setModalDetalleAbierto(true);
  }

  function cambiarEstadoModalDetalle(abierto: boolean) {
    setModalDetalleAbierto(abierto);
    if (!abierto) {
      setPacienteEnDetalle(null);
    }
  }

  function cambiarEstadoModalEliminar(abierto: boolean) {
    setModalEliminarAbierto(abierto);
    if (!abierto) {
      setPacienteAEliminar(null);
    }
  }

  function eliminarPaciente(id: number) {
    setPacientes((previo) => previo.filter((paciente) => paciente.id !== id));
    setPacienteAEliminar(null);
    setModalEliminarAbierto(false);
  }

  function desactivarPaciente(id: number) {
    const ahora = new Date().toISOString();

    setPacientes((previo) =>
      previo.map((paciente) =>
        paciente.id === id
          ? {
              ...paciente,
              estado: false,
              updated_at: ahora,
            }
          : paciente,
      ),
    );

    setPacienteAEliminar(null);
    setModalEliminarAbierto(false);
  }

  function guardarPaciente(valores: PacienteFormValues) {
    const ahora = new Date().toISOString();

    if (pacienteEnEdicion) {
      setPacientes((previo) =>
        previo.map((paciente) =>
          paciente.id === pacienteEnEdicion.id
            ? {
                ...paciente,
                dni: valores.dni,
                nombres: valores.nombres,
                apellidos: valores.apellidos,
                fecha_nacimiento: valores.fecha_nacimiento,
                genero: valores.genero,
                celular: aNuloSiVacio(valores.celular),
                email: aNuloSiVacio(valores.email),
                tipo_sangre: valores.tipo_sangre,
                seguro_medico: aNuloSiVacio(valores.seguro_medico),
                estado: valores.estado,
                updated_at: ahora,
              }
            : paciente,
        ),
      );
      return;
    }

    const idMaximo =
      pacientes.length > 0
        ? Math.max(...pacientes.map((paciente) => paciente.id))
        : 0;

    const nuevoPaciente: Paciente = {
      id: idMaximo + 1,
      dni: valores.dni,
      nombres: valores.nombres,
      apellidos: valores.apellidos,
      fecha_nacimiento: valores.fecha_nacimiento,
      genero: valores.genero,
      celular: aNuloSiVacio(valores.celular),
      email: aNuloSiVacio(valores.email),
      tipo_sangre: valores.tipo_sangre,
      seguro_medico: aNuloSiVacio(valores.seguro_medico),
      estado: valores.estado,
      created_at: ahora,
      updated_at: ahora,
    };

    setPacientes((previo) => [nuevoPaciente, ...previo]);
  }

  return {
    columnasPaciente,
    columnasActivas,
    columnasVisibles,
    pacientesFiltrados,
    busqueda,
    setBusqueda,
    filtroGenero,
    setFiltroGenero,
    filtroEstado,
    setFiltroEstado,
    modalPacienteAbierto,
    setModalPacienteAbierto,
    modalEliminarAbierto,
    modalDetalleAbierto,
    pacienteEnEdicion,
    pacienteAEliminar,
    pacienteEnDetalle,
    valoresInicialesModalPaciente,
    formatearFecha,
    cambiarVisibilidadColumna,
    abrirCrearPaciente,
    abrirEditarPaciente,
    abrirDetallePaciente,
    pedirConfirmacionEliminar,
    cambiarEstadoModalDetalle,
    cambiarEstadoModalEliminar,
    eliminarPaciente,
    desactivarPaciente,
    guardarPaciente,
  };
}
