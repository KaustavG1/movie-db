import getAuth from "../../helpers/getAuth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, redirectTo }) {
  let isAuthenticated = getAuth()
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}
