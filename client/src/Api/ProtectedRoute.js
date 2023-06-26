import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  redirectPath = "/login",
  children,
  token,
}) {
  const location = useLocation();

  if (!token) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return children || <Outlet />;
}
