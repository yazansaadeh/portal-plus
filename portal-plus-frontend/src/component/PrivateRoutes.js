import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes() {
  const { isLogin } = useSelector((state) => {
    return state.auth;
  });
  return isLogin ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoutes;
