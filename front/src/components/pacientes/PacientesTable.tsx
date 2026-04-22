import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Paciente } from "@/types/paciente";

type Columna = {
  key: keyof Paciente;
  label: string;
};

type PacientesTableProps = {
  pacientes: Paciente[];
  columnas: Columna[];
  onVerDetalle: (paciente: Paciente) => void;
  onEditar: (paciente: Paciente) => void;
  onEliminar: (paciente: Paciente) => void;
  onCrear: () => void;
  formatFecha?: (fecha: string) => string;
};

export function PacientesTable({
  pacientes,
  columnas,
  onVerDetalle,
  onEditar,
  onEliminar,
  onCrear,
  formatFecha,
}: PacientesTableProps) {
  return (
    <>
      <div className="flex items-end justify-end border-b px-4 py-2">
        <div className="flex justify-end">
          <Button type="button" variant="default" onClick={onCrear}>
            Crear paciente
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              {columnas.map((col) => (
                <TableHead key={col.key} className="capitalize">
                  {col.label}
                </TableHead>
              ))}
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pacientes.map((paciente) => (
              <TableRow key={paciente.id}>
                {columnas.map((col) => (
                  <TableCell key={col.key}>
                    {col.key === "estado"
                      ? paciente.estado
                        ? "Activo"
                        : "Inactivo"
                      : col.key === "created_at" || col.key === "updated_at"
                        ? formatFecha
                          ? formatFecha(paciente[col.key])
                          : "-"
                        : (paciente[col.key] as React.ReactNode)}
                  </TableCell>
                ))}
                <TableCell className="flex gap-2 justify-center items-center text-center">
                  <Button
                    type="button"
                    size="xs"
                    variant="secondary"
                    onClick={() => onVerDetalle(paciente)}
                  >
                    Ver Detalle
                  </Button>
                  <Button
                    type="button"
                    size="xs"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => onEditar(paciente)}
                  >
                    Editar
                  </Button>
                  <Button
                    type="button"
                    size="xs"
                    variant="destructive"
                    onClick={() => onEliminar(paciente)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
