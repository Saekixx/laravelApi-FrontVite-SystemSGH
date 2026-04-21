import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PacienteModal } from "@/components/pacientes/PacienteModal";
import { PacienteDetalleModal } from "@/components/pacientes/PacienteDetalleModal";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePaciente } from "@/hooks/usePaciente";

function PacientesTable() {
  const {
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
  } = usePaciente();

  return (
    <Card className="border-border/70 py-0 shadow-lg shadow-foreground/5">
      <CardHeader className="border-b border-border/70">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle>Pacientes</CardTitle>

          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" onClick={abrirCrearPaciente}>
              Crear paciente
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" type="button">
                  Elegir campos
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Columnas visibles</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {columnasPaciente.map((columna) => (
                  <DropdownMenuCheckboxItem
                    key={columna.key}
                    checked={columnasVisibles[columna.key]}
                    onCheckedChange={(checked) =>
                      cambiarVisibilidadColumna(columna.key, checked === true)
                    }
                  >
                    {columna.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-6">
        <div className="grid gap-3 md:grid-cols-[1fr_180px_180px]">
          <Input
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Buscar por DNI, nombre o email"
          />

          <Select value={filtroGenero} onValueChange={setFiltroGenero}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Genero" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los generos</SelectItem>
              <SelectItem value="Masculino">Masculino</SelectItem>
              <SelectItem value="Femenino">Femenino</SelectItem>
              <SelectItem value="Otro">Otro</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filtroEstado} onValueChange={setFiltroEstado}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los estados</SelectItem>
              <SelectItem value="activos">Activos</SelectItem>
              <SelectItem value="inactivos">Inactivos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              {columnasActivas.map((columna) => (
                <TableHead key={columna.key}>{columna.label}</TableHead>
              ))}
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pacientesFiltrados.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columnasActivas.length + 1}
                  className="text-center text-muted-foreground"
                >
                  No se encontraron pacientes para los filtros seleccionados.
                </TableCell>
              </TableRow>
            ) : (
              pacientesFiltrados.map((paciente) => (
                <TableRow key={paciente.id}>
                  {columnasActivas.map((columna) => {
                    if (columna.key === "estado") {
                      return (
                        <TableCell key={columna.key}>
                          <Badge
                            variant={paciente.estado ? "secondary" : "outline"}
                          >
                            {paciente.estado ? "Activo" : "Inactivo"}
                          </Badge>
                        </TableCell>
                      );
                    }

                    if (
                      columna.key === "fecha_nacimiento" ||
                      columna.key === "created_at" ||
                      columna.key === "updated_at"
                    ) {
                      return (
                        <TableCell key={columna.key}>
                          {formatearFecha(paciente[columna.key])}
                        </TableCell>
                      );
                    }

                    const value = paciente[columna.key];
                    return (
                      <TableCell key={columna.key}>{value ?? "-"}</TableCell>
                    );
                  })}

                  <TableCell className="text-right">
                    <div className="inline-flex gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => abrirDetallePaciente(paciente)}
                      >
                        Ver detalles
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => abrirEditarPaciente(paciente)}
                      >
                        Editar
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => pedirConfirmacionEliminar(paciente)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      <PacienteModal
        open={modalPacienteAbierto}
        mode={pacienteEnEdicion ? "edit" : "create"}
        initialValues={valoresInicialesModalPaciente}
        onOpenChange={setModalPacienteAbierto}
        onSave={guardarPaciente}
      />

      <PacienteDetalleModal
        open={modalDetalleAbierto}
        paciente={pacienteEnDetalle}
        onOpenChange={cambiarEstadoModalDetalle}
        formatearFecha={formatearFecha}
      />

      <Dialog
        open={modalEliminarAbierto}
        onOpenChange={cambiarEstadoModalEliminar}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Gestionar paciente</DialogTitle>
            <DialogDescription>
              {pacienteAEliminar
                ? `Elige si deseas eliminar o desactivar a ${pacienteAEliminar.nombres} ${pacienteAEliminar.apellidos}.`
                : "Selecciona una acción para el paciente."}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => cambiarEstadoModalEliminar(false)}
            >
              Cancelar
            </Button>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  if (pacienteAEliminar) {
                    desactivarPaciente(pacienteAEliminar.id);
                  }
                }}
                disabled={!pacienteAEliminar}
              >
                Desactivar paciente
              </Button>

              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  if (pacienteAEliminar) {
                    eliminarPaciente(pacienteAEliminar.id);
                  }
                }}
                disabled={!pacienteAEliminar}
              >
                Eliminar paciente
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export { PacientesTable };
