import { PacientesTable } from "@/components/pacientes/PacientesTable";
import { FilterPacientes } from "@/components/pacientes/FilterPacientes";
import { PacienteDetalleModal } from "@/components/pacientes/PacienteDetalleModal";
import { PacienteModalDelete } from "@/components/pacientes/PacienteModalDelete";
import { PacienteModal } from "@/components/pacientes/PacienteModal";
import { usePaciente } from "@/hooks/usePaciente";
import { SideBar } from "@/components/SideBar";

function PacientesPage() {
  const {
    pacientes,
    loading,
    busqueda,
    setBusqueda,
    filtroEstado,
    setFiltroEstado,
    filtroGenero,
    setFiltroGenero,
    columnasTodas,
    columnasActivas,
    columnasVisibles,
    toggleColumna,
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
  } = usePaciente();

  return (
    <main className="h-screen bg-background p-4 sm:p-6">
      <div className="grid h-full w-full gap-6 lg:grid-cols-[16rem_1fr]">
        <SideBar className="max-w-none" />

        <section className="space-y-4 overflow-auto pr-1">
          <header>
            <h1 className="text-2xl font-semibold text-foreground">
              Pacientes
            </h1>
            <p className="text-sm text-muted-foreground">
              Gestiona los registros y personaliza los campos que quieres ver.
            </p>
          </header>

          <FilterPacientes
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            filtroEstado={filtroEstado}
            setFiltroEstado={setFiltroEstado}
            filtroGenero={filtroGenero}
            setFiltroGenero={setFiltroGenero}
            columnasTodas={columnasTodas}
            columnasVisibles={columnasVisibles}
            toggleColumna={toggleColumna}
          />

          {loading ? (
            <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
              Cargando datos de pacientes...
            </div>
          ) : (
            <div className="rounded-md border bg-card">
              <PacientesTable
                columnas={columnasActivas}
                onCrear={onNuevoPaciente}
                onEditar={onEditarPaciente}
                onVerDetalle={onVerDetalle}
                onEliminar={onAbrirGestion}
                pacientes={pacientes}
                formatFecha={formatFecha}
              />
            </div>
          )}

          <PacienteDetalleModal
            open={modalDetalleAbierto}
            paciente={pacienteSeleccionado}
            onOpenChange={setModalDetalleAbierto}
            formatearFecha={formatFecha}
          />

          <PacienteModal
            open={modalFormAbierto}
            mode={modalMode}
            initialValues={datosForm}
            onOpenChange={setModalFormAbierto}
            onSave={onGuardarPaciente}
          />

          <PacienteModalDelete
            open={modalDeleteAbierto}
            paciente={pacienteSeleccionado}
            onOpenChange={setModalDeleteAbierto}
            onEliminar={onEliminar}
            onCambiarEstado={onCambiarEstado}
          />
        </section>
      </div>
    </main>
  );
}

export default PacientesPage;
