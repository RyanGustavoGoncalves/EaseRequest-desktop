/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Navigate, RouteProps, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


interface ProtectedRouteProps extends RouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          const response = await fetch('http://localhost:8080/token', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const responseBody = await response.json();
            const role = responseBody.role;
            localStorage.setItem('role', role);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);

            // Exibir alerta de erro
            Swal.fire({
              icon: 'error',
              title: 'Erro',
              text: 'Token inválido ou expirado!',
            });
          }
        } catch (error) {
          // Exibir alerta de erro
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao buscar o token!',
          });

          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, [token, setIsAuthenticated]);

  if (isAuthenticated === null) {
    return null;
  }

  (window as any).electron.ipcRenderer.send('update-is-login-or-register', isAuthenticated);

  (window as any).electron.ipcRenderer.on('limparLocalStorage', () => {
    localStorage.clear();
    navigate("/auth/login");
    (window as any).electron.ipcRenderer.send('update-is-login-or-register', false);
  }
  );

  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/auth/register" />;
};

export default ProtectedRoute;
