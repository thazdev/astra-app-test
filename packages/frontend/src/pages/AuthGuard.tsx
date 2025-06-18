// packages/frontend/src/pages/AuthGuard.tsx
import { Navigate } from "react-router-dom";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const user = localStorage.getItem("user");
  return user ? <>{children}</> : <Navigate to="/register" replace />;
}
