import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import Login from './Components/LoginPage/Login'
import Details from './Components/DetailsPage/Details'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { arabicContent, englishContent } from './constants/locale'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute redirectTo="/login">
        <Details pageContent={englishContent}/>
      </ProtectedRoute>
    ),
    errorElement: <div>An error occured</div>
  },
  {
    path: "/login",
    element: <Login pageContent={englishContent}/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
