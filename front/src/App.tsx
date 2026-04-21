import { Route, Routes, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/Auth/ProtectedRoute";
import { GoogleCallback } from "@/components/Auth/GoogleCallBack";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import PerfilPage from "@/pages/PerfilPage";
import PacientesPage from "@/pages/PacientesPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/pacientes" element={<PacientesPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
