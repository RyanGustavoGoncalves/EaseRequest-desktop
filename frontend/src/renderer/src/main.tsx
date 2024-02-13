import './css/main.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Register from './pages/auth/register/Register';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import Login from './pages/auth/login/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={App} />,
    // element: <App />,
  },
  {
    path: "/auth/register",
    element: <Register />
  },
  {
    path: "/auth/login",
    element: <Login />
  },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
