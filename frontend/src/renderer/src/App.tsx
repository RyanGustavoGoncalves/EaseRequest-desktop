import { Link } from 'react-router-dom';
import './css/app.css';
import { useEffect, useState } from 'react';


function App(): JSX.Element {
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch('http://localhost:8080/token', {
          headers: {
            Authorization: `Bearer ${token}`, // Substitua pelo token real
          },
        });

        if (response.ok) {
          const responseBody = await response.json();
          setRole(responseBody.role);
        } else {
          setRole(null);
        }
      } catch (error) {
        console.error('Erro ao obter a função do usuário:', error);
        setRole(null);
      }
    };

    console.log(token);
    fetchUserRole();
  }, [token]);

return (
  <>
    <Link to={"auth/register"}>
      <h1>HomePage</h1>
    </Link>
  </>
)
}

export default App
