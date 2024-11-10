// src/components/ProtectedRoute/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');

  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/no-access" />;
  }

  // Si hay token, renderizar la ruta protegida
  return children;
};

export default ProtectedRoute;
