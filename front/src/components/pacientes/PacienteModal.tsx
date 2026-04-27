import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { PacienteFormValues } from "@/types/paciente";

type PacienteModalProps = {
  open: boolean;
  mode: "create" | "edit";
  initialValues?: PacienteFormValues | null; // Aceptamos null para limpiezas
  onOpenChange: (open: boolean) => void;
  onSave: (values: PacienteFormValues) => void;
};

const emptyPaciente: PacienteFormValues = {
  dni: "",
  nombres: "",
  apellidos: "",
  fecha_nacimiento: "",
  genero: "Masculino",
  celular: "",
  email: "",
  tipo_sangre: "",
  seguro_medico: "",
  estado: true,
};

function PacienteModal({
  open,
  mode,
  initialValues,
  onOpenChange,
  onSave,
}: PacienteModalProps) {
  // Un solo estado tipo objeto es más eficiente para formularios grandes
  const [values, setValues] = useState<PacienteFormValues>(emptyPaciente);

  // Sincroniza el formulario cuando el modal se abre o cambian los valores iniciales
  useEffect(() => {
    if (open) {
      if (mode === "edit" && initialValues) {
        setValues(initialValues);
      } else {
        setValues(emptyPaciente);
      }
    }
  }, [open, mode, initialValues]);

  const title = mode === "create" ? "Crear paciente" : "Editar paciente";
  const description =
    mode === "create"
      ? "Completa la información para registrar al nuevo paciente."
      : "Modifica los campos necesarios para actualizar al paciente.";

  // Función genérica para actualizar cualquier campo
  const handleChange = (key: keyof PacienteFormValues, value: any) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(values); // Enviamos el objeto completo de estados
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="contacto">Contacto</TabsTrigger>
              <TabsTrigger value="clinico">Clínico</TabsTrigger>
            </TabsList>

            {/* --- SECCIÓN PERSONAL --- */}
            <TabsContent value="personal" className="space-y-4 pt-2">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dni">DNI</Label>
                  <Input
                    id="dni"
                    value={values.dni}
                    onChange={(e) => handleChange("dni", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
                  <Input
                    id="fecha_nacimiento"
                    type="date"
                    value={values.fecha_nacimiento}
                    onChange={(e) =>
                      handleChange("fecha_nacimiento", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nombres">Nombres</Label>
                  <Input
                    id="nombres"
                    value={values.nombres}
                    onChange={(e) => handleChange("nombres", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellidos">Apellidos</Label>
                  <Input
                    id="apellidos"
                    value={values.apellidos}
                    onChange={(e) => handleChange("apellidos", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Género</Label>
                  <Select
                    value={values.genero}
                    onValueChange={(val) => handleChange("genero", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona género" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Masculino">Masculino</SelectItem>
                      <SelectItem value="Femenino">Femenino</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            {/* --- SECCIÓN CONTACTO --- */}
            <TabsContent value="contacto" className="space-y-4 pt-2">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="celular">Celular</Label>
                  <Input
                    id="celular"
                    value={values.celular || ""}
                    onChange={(e) => handleChange("celular", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={values.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            {/* --- SECCIÓN CLÍNICA --- */}
            <TabsContent value="clinico" className="space-y-4 pt-2">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tipo_sangre">Tipo de Sangre</Label>
                  <Select
                    value={values.tipo_sangre}
                    onValueChange={(val) => handleChange("tipo_sangre", val)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona tipo de sangre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seguro_medico">Seguro Médico</Label>
                  <Input
                    id="seguro_medico"
                    value={values.seguro_medico || ""}
                    onChange={(e) =>
                      handleChange("seguro_medico", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Estado del Registro</Label>
                  <Select
                    value={values.estado ? "activo" : "inactivo"}
                    onValueChange={(val) =>
                      handleChange("estado", val === "activo")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="activo">Activo</SelectItem>
                      <SelectItem value="inactivo">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {mode === "create" ? "Registrar Paciente" : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { PacienteModal };
