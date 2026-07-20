import Cookie from "js-cookie";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children, allowedRoles }) => {
  const jwtToken = Cookie.get("jwt_token");
  const role = Cookie.get("role");

  if (!jwtToken) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

export default ProtectedRoute;
