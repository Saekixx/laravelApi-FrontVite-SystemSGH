import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Paciente } from "@/types/paciente";

type PacienteModalDeleteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paciente: Paciente | null;
  onEliminar: (paciente: Paciente) => void;
  onCambiarEstado: (paciente: Paciente) => void;
};

export function PacienteModalDelete({
  open,
  onOpenChange,
  paciente,
  onEliminar,
  onCambiarEstado,
}: PacienteModalDeleteProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gestionar paciente</DialogTitle>
          <DialogDescription>
            {paciente
              ? `¿Qué acción deseas realizar con ${paciente.nombres} ${paciente.apellidos}?`
              : "Selecciona una acción para el paciente."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <div className="flex gap-2">
            {paciente?.estado ? (
              <Button
                type="button"
                variant="secondary"
                onClick={() => paciente && onCambiarEstado(paciente)}
              >
                Desactivar paciente
              </Button>
            ) : (
              <Button
                type="button"
                variant="secondary"
                onClick={() => paciente && onCambiarEstado(paciente)}
              >
                Activar paciente
              </Button>
            )}
            <Button
              type="button"
              variant="destructive"
              onClick={() => paciente && onEliminar(paciente)}
            >
              Eliminar paciente
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
