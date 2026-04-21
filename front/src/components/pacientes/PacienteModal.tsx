import { useEffect, useMemo, useState } from "react";
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
  initialValues?: PacienteFormValues;
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
  const [values, setValues] = useState<PacienteFormValues>(emptyPaciente);

  useEffect(() => {
    if (!open) return;
    setValues(initialValues ?? emptyPaciente);
  }, [initialValues, open]);

  const title = useMemo(
    () => (mode === "create" ? "Crear paciente" : "Editar paciente"),
    [mode],
  );

  const description =
    mode === "create"
      ? "Completa la información por secciones para registrar al paciente."
      : "Actualiza la información del paciente por secciones.";

  function updateField<K extends keyof PacienteFormValues>(
    key: K,
    value: PacienteFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="contacto">Contacto</TabsTrigger>
              <TabsTrigger value="clinico">Clinico</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4 pt-2">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="paciente-dni">DNI</Label>
                  <Input
                    id="paciente-dni"
                    value={values.dni}
                    onChange={(event) => updateField("dni", event.target.value)}
                    maxLength={12}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paciente-fecha-nacimiento">
                    Fecha de nacimiento
                  </Label>
                  <Input
                    id="paciente-fecha-nacimiento"
                    type="date"
                    value={values.fecha_nacimiento}
                    onChange={(event) =>
                      updateField("fecha_nacimiento", event.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paciente-nombres">Nombres</Label>
                  <Input
                    id="paciente-nombres"
                    value={values.nombres}
                    onChange={(event) =>
                      updateField("nombres", event.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paciente-apellidos">Apellidos</Label>
                  <Input
                    id="paciente-apellidos"
                    value={values.apellidos}
                    onChange={(event) =>
                      updateField("apellidos", event.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="paciente-genero">Genero</Label>
                  <Select
                    value={values.genero}
                    onValueChange={(value) =>
                      updateField(
                        "genero",
                        value as PacienteFormValues["genero"],
                      )
                    }
                  >
                    <SelectTrigger id="paciente-genero" className="w-full">
                      <SelectValue placeholder="Selecciona genero" />
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

            <TabsContent value="contacto" className="space-y-4 pt-2">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="paciente-celular">Celular</Label>
                  <Input
                    id="paciente-celular"
                    value={values.celular}
                    onChange={(event) =>
                      updateField("celular", event.target.value)
                    }
                    placeholder="Opcional"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paciente-email">Email</Label>
                  <Input
                    id="paciente-email"
                    type="email"
                    value={values.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    placeholder="Opcional"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="clinico" className="space-y-4 pt-2">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="paciente-tipo-sangre">Tipo de sangre</Label>
                  <Input
                    id="paciente-tipo-sangre"
                    value={values.tipo_sangre}
                    onChange={(event) =>
                      updateField("tipo_sangre", event.target.value)
                    }
                    placeholder="Ej: O+"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paciente-seguro-medico">Seguro medico</Label>
                  <Input
                    id="paciente-seguro-medico"
                    value={values.seguro_medico}
                    onChange={(event) =>
                      updateField("seguro_medico", event.target.value)
                    }
                    placeholder="Opcional"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="paciente-estado">Estado</Label>
                  <Select
                    value={values.estado ? "activo" : "inactivo"}
                    onValueChange={(value) =>
                      updateField("estado", value === "activo")
                    }
                  >
                    <SelectTrigger id="paciente-estado" className="w-full">
                      <SelectValue placeholder="Selecciona estado" />
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

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {mode === "create" ? "Crear" : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { PacienteModal };
