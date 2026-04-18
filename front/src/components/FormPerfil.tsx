import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ProfileData = {
  name: string;
  email: string;
  phone: string;
  city: string;
};

const initialProfile: ProfileData = {
  name: "Usuario Demo",
  email: "usuario@correo.com",
  phone: "+57 300 123 4567",
  city: "Bogotá",
};

function FormPerfil() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [draft, setDraft] = useState<ProfileData>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditToggle() {
    setDraft(profile);
    setIsEditing(true);
  }

  function handleCancel() {
    setDraft(profile);
    setIsEditing(false);
  }

  function handleConfirm() {
    setProfile(draft);
    setIsEditing(false);
  }

  function updateField<K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K],
  ) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <Card className="border-border/70 py-0 shadow-lg shadow-foreground/5">
      <CardHeader className="border-b border-border/70">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle>Mi perfil</CardTitle>

          {!isEditing ? (
            <Button type="button" onClick={handleEditToggle}>
              Editar
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button type="button" onClick={handleConfirm}>
                Confirmar
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="profile-image">Foto de perfil</Label>
            <Input
              id="profile-image"
              type="file"
              accept="image/*"
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-name">Nombre</Label>
            <Input
              id="profile-name"
              value={draft.name}
              disabled={!isEditing}
              onChange={(event) => updateField("name", event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-email">Correo</Label>
            <Input
              id="profile-email"
              type="email"
              value={draft.email}
              disabled={!isEditing}
              onChange={(event) => updateField("email", event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile-phone">Teléfono</Label>
            <Input
              id="profile-phone"
              value={draft.phone}
              disabled={!isEditing}
              onChange={(event) => updateField("phone", event.target.value)}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="profile-city">Ciudad</Label>
            <Input
              id="profile-city"
              value={draft.city}
              disabled={!isEditing}
              onChange={(event) => updateField("city", event.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { FormPerfil };
