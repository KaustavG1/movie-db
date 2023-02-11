import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, redirectTo }) {
  let isAuthenticated = true // Get Auth here
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}
