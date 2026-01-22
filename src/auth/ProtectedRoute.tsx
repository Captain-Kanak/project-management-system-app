import { Navigate } from "react-router";
import { useAuth } from "./AuthContext";

export const ProtectedRoute = ({ children }: any) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};
