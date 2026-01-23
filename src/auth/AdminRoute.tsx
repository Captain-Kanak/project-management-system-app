import { Navigate } from "react-router";
import { useAuth } from "./AuthContext";

export const AdminRoute = ({ children }: any) => {
  const { user } = useAuth();

  if (user?.role === "ADMIN") return children;

  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};
