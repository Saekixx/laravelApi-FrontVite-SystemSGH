import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Paciente } from "@/types/paciente";

type PacienteDetalleModalProps = {
  open: boolean;
  paciente: Paciente | null;
  onOpenChange: (open: boolean) => void;
  formatearFecha: (fecha: string) => string;
};

function FilaDetalle({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border/70 bg-muted/30 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function PacienteDetalleModal({
  open,
  paciente,
  onOpenChange,
  formatearFecha,
}: PacienteDetalleModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detalle de paciente</DialogTitle>
          <DialogDescription>
            {paciente
              ? `Información completa de ${paciente.nombres} ${paciente.apellidos}.`
              : "No hay paciente seleccionado."}
          </DialogDescription>
        </DialogHeader>

        {paciente ? (
          <div className="grid gap-3 md:grid-cols-2">
            <FilaDetalle label="DNI" value={paciente.dni} />
            <FilaDetalle label="Nombres" value={paciente.nombres} />
            <FilaDetalle label="Apellidos" value={paciente.apellidos} />
            <FilaDetalle
              label="Fecha de nacimiento"
              value={formatearFecha(paciente.fecha_nacimiento)}
            />
            <FilaDetalle label="Genero" value={paciente.genero} />
            <FilaDetalle label="Celular" value={paciente.celular ?? "-"} />
            <FilaDetalle label="Email" value={paciente.email ?? "-"} />
            <FilaDetalle label="Tipo de sangre" value={paciente.tipo_sangre} />
            <FilaDetalle
              label="Seguro medico"
              value={paciente.seguro_medico ?? "-"}
            />
            <FilaDetalle
              label="Estado"
              value={paciente.estado ? "Activo" : "Inactivo"}
            />
            <FilaDetalle
              label="Creado"
              value={formatearFecha(paciente.created_at)}
            />
            <FilaDetalle
              label="Actualizado"
              value={formatearFecha(paciente.updated_at)}
            />
          </div>
        ) : null}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { PacienteDetalleModal };
