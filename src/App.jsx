import Details from "./Components/DetailsPage/Details"
import Login from "./Components/LoginPage/Login"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute redirectTo="/login">
        <Details />
      </ProtectedRoute>
    ),
    errorElement: <div>An error occured</div>
  },
  {
    path: "/login",
    element: <Login />
  }
]);

export default function App() {
  return <RouterProvider router={router} />
}
