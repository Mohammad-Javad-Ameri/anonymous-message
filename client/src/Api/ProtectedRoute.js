import { Navigate, Outlet, useLocation } from "react-router-dom";


export default function ProtectedRoute({
  redirectPath = "/login",
  children,
  
}) {
  const location = useLocation();
const getToken = JSON.parse(localStorage.getItem("user"));
  if (getToken==null) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return children || <Outlet />;
}
