import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

function FormRegister() {
  const { Registrar, estadoAuth, limpiarError } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    limpiarError();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await Registrar({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    } as any);
    setLoading(false);
    if (result?.ok) {
      navigate("/login");
    }
  };
  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-chart-2/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />

      <Card className="relative z-10 w-full max-w-md border border-border/70 shadow-xl shadow-foreground/5 backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center">
          <p className="text-xs font-semibold tracking-[0.28em] text-muted-foreground uppercase">
            Crea tu cuenta
          </p>
          <CardTitle className="text-2xl">Registro</CardTitle>
          <CardDescription>
            Completa los datos para registrarte.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
                placeholder="Tu nombre"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                placeholder="tuemail@ejemplo.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                minLength={8}
                placeholder="Mínimo 8 caracteres"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirmation">
                Confirmar contraseña
              </Label>
              <Input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                autoComplete="new-password"
                required
                minLength={8}
                placeholder="Repite tu contraseña"
              />
            </div>

            <Button
              type="submit"
              className="h-10 w-full font-medium"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrarme"}
            </Button>

            {estadoAuth.error && (
              <p className="text-center text-sm text-destructive">
                {estadoAuth.error}
              </p>
            )}

            <p className="text-center text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Inicia sesión
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export { FormRegister };
