import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { auth as user } from "../Redux/AuthProvider";

const RequireAuth = ({ allowedRoles }) => {
  const auth = useRecoilValue(user);
  const location = useLocation();

  return (
    auth?.roles?.find(role => allowedRoles?.includes(role))
      ? <Outlet />
      : auth?.user
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;