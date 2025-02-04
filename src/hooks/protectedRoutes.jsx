import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const ProtectedRoutes = () => {
  const { authData } = useAuth();
  // Outlet represente toutes les routes qui seront dans notre route qui pour element <ProtectedRoutes/>
  // voir src/components/layout/main.js
  return authData ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoutes;