/* eslint-disable prettier/prettier */
import openEye from '../../../assets/openEye.png';
import closeEye from '../../../assets/closeEye.png';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleInputBlur, handleInputFocus } from '@renderer/pages/auth/components/handleInput/HandleInput';

interface Error {
  message: string;
}

interface Props {
  closeModalOpacity: () => void;
  setModal: React.Dispatch<React.SetStateAction<{ display: string }>>;
  setModalOpacity: React.Dispatch<React.SetStateAction<{ display: string }>>;
  setErrors: React.Dispatch<React.SetStateAction<Error[]>>;
}

const LoginField: React.FC<Props> = ({ closeModalOpacity, setModal, setModalOpacity, setErrors }) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await cadastrar();
        limpar();
    };

    const limpar = () => {
        setUsername('');
        setPassword('');
    };

    const cadastrar = async () => {
        const data = {
            username: username,
            password: password,
        };

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const responseJson = await response.json();
                const token = responseJson.token;
                localStorage.setItem('token', token);
                navigate('/');

            } else if (response.status === 401) {
                const error: Error = await response.json();
                console.log(error);
                setErrors([error]);
                setModalOpacity({ display: 'block' });
                setModal({ display: 'block' });
            } else {
                console.log("Ocorreu um erro inesperado: " + response.status);
            }
        } catch (error) {
            console.error("Erro ao enviar a solicitação:", error);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="authForm">
            <div className="authField">
                <label id="usernameLabel" className={username ? 'active' : ''} htmlFor="username">
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onMouseEnter={() => handleInputFocus('usernameLabel')}
                    onMouseLeave={() => handleInputBlur('usernameLabel')}
                />
            </div>
            <div className="authField">
                <label id="passwordLabel" className={password ? 'active' : ''} htmlFor="password">
                    password
                </label>
                <div className="togglePassword">
                    <span onClick={handleTogglePassword}>
                        {showPassword ? <img src={openEye} alt="Open Eye" /> : <img src={closeEye} alt="Closed Eye" />}
                    </span>
                </div>
                <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onMouseEnter={() => handleInputFocus('passwordLabel')}
                    onMouseLeave={() => handleInputBlur('passwordLabel')}
                />
            </div>
            <div className="btn">
                <button type="submit">Login</button>
                <Link to={"/auth/register"}>
                    <span>Don't have registration? register now!</span>
                </Link>
            </div>
        </form>
    )
}

export default LoginField;
