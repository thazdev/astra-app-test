import { createBrowserRouter, Navigate } from "react-router-dom";
import Contract from "./pages/Contract";
import Login from "./pages/Login";
import Register from "./pages/Register";

function NotFound() {
  return <h2>Página não encontrada</h2>;
}

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/contracts/:id", element: <Contract /> },
  { path: "*", element: <NotFound /> },
]);
