import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";

function FormResetPassword() {
  const { ReestablecerPassword } = useAuth();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await ReestablecerPassword({
      email: email || "",
      token: token || "",
      password,
      password_confirmation: passwordConfirmation,
    });
    setLoading(false);
    navigate("/login");
  };

  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-chart-2/20 blur-3xl" />

      <Card className="relative z-10 w-full max-w-md border border-border/70 shadow-xl shadow-foreground/5 backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl">Cambiar contraseña</CardTitle>
          <CardDescription>
            Completa los datos para establecer tu nueva contraseña.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" action="" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="reset-password">Nueva contraseña</Label>
              <Input
                id="reset-password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
                placeholder="Mínimo 8 caracteres"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reset-password-confirmation">
                Confirmar contraseña
              </Label>
              <Input
                id="reset-password-confirmation"
                name="password_confirmation"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
                placeholder="Repite la contraseña"
              />
            </div>

            <Button
              type="submit"
              className="h-10 w-full font-medium"
              disabled={loading}
            >
              {loading ? "Actualizando..." : "Cambiar contraseña"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              ¿Ya la recordaste?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Volver al login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export { FormResetPassword };
