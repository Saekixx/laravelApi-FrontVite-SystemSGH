import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2 } from "lucide-react";
import type { profile, profileFormValues } from "@/types/Api/Auth/apiResponse";

interface FormPerfilProps {
  profile: profile | null;
  setProfile: (data: profile) => void;
  obtenerProfile: (email: string) => Promise<void>;
  guardarProfile: (data: FormData) => Promise<any>;
  userEmail: string;
}

function FormPerfil({
  profile,
  obtenerProfile,
  guardarProfile,
  userEmail,
}: FormPerfilProps) {
  const [draft, setDraft] = useState<profileFormValues>({
    name: "",
    last_name: "",
    phone: "",
    address: "",
    dni: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (userEmail) {
      obtenerProfile(userEmail);
    }
  }, [userEmail]);

  useEffect(() => {
    if (profile) {
      setDraft({
        name: profile.name || "",
        last_name: profile.last_name || "",
        phone: profile.phone || "",
        address: profile.address || "",
        dni: profile.dni || "",
        email: profile.email || "",
      });

      if (profile.avatar && !selectedFile) {
        setPreviewUrl(profile.avatar);
      }
    }
  }, [profile, selectedFile]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("La imagen es muy pesada (máx 2MB)");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  function handleCancel() {
    if (profile) {
      setDraft({
        name: profile.name,
        last_name: profile.last_name,
        phone: profile.phone || "",
        address: profile.address || "",
        dni: profile.dni || "",
        email: profile.email,
      });
      setPreviewUrl(profile.avatar || null);
    }
    setIsEditing(false);
    setPassword("");
    setConfirmPassword("");
    setSelectedFile(null);
  }

  async function handleConfirm() {
    if (isUploading) return;

    if (password && password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("name", draft.name);
    formData.append("last_name", draft.last_name);
    formData.append("email", draft.email);
    formData.append("dni", draft.dni || "");
    formData.append("phone", draft.phone || "");
    formData.append("address", draft.address || "");

    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    if (password.trim() !== "") {
      formData.append("password", password);
      formData.append("password_confirmation", confirmPassword);
    }

    try {
      const res = await guardarProfile(formData);

      if (res && res.avatar_url) {
        setPreviewUrl(`${res.avatar_url}?t=${Date.now()}`);
      }

      setSelectedFile(null);
      setPassword("");
      setConfirmPassword("");

      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("No se pudo guardar el perfil. Revisa la consola.");
    } finally {
      setIsUploading(false);
    }
  }

  function updateField<K extends keyof profileFormValues>(
    key: K,
    value: profileFormValues[K],
  ) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  if (!profile && !isEditing) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="border-border/70 py-0 shadow-lg shadow-foreground/5">
      <CardHeader className="border-b border-border/70">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle>Mi perfil</CardTitle>
          {!isEditing ? (
            <Button type="button" onClick={() => setIsEditing(true)}>
              Editar
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isUploading}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={handleConfirm}
                disabled={isUploading}
              >
                {isUploading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Confirmar
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6 px-8 py-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="h-24 w-24 border-2 border-border shadow-sm">
              <AvatarImage
                key={previewUrl}
                src={previewUrl || ""}
                className="object-cover"
              />
              <AvatarFallback className="text-xl">
                {draft.name?.charAt(0)}
                {draft.last_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {isEditing && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
                disabled={isUploading}
              >
                <Camera className="h-4 w-4" />
              </button>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Nombres</Label>
            <Input
              value={draft.name}
              disabled={!isEditing || isUploading}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Apellidos</Label>
            <Input
              value={draft.last_name}
              disabled={!isEditing || isUploading}
              onChange={(e) => updateField("last_name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>DNI</Label>
            <Input
              value={draft.dni}
              disabled={!isEditing || isUploading}
              onChange={(e) => updateField("dni", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Teléfono</Label>
            <Input
              value={draft.phone || ""}
              disabled={!isEditing || isUploading}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Dirección</Label>
            <Input
              value={draft.address || ""}
              disabled={!isEditing || isUploading}
              onChange={(e) => updateField("address", e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Correo</Label>
            <Input
              type="email"
              value={draft.email}
              disabled={!isEditing || isUploading}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>

          {isEditing && (
            <>
              <div className="space-y-2 md:col-span-2 border-t pt-4">
                <Label>Nueva contraseña (opcional)</Label>
                <Input
                  type="password"
                  value={password}
                  disabled={isUploading}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Confirmar contraseña</Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  disabled={isUploading}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export { FormPerfil };
