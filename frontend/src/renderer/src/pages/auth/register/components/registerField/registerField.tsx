/* eslint-disable prettier/prettier */
import { useRef, useState } from "react";
import { handleInputBlur, handleInputFocus } from "../../../components/handleInput/HandleInput";
import Swal from 'sweetalert2';

import iconList from '../../../../../assets/iconList.png';
import openEye from '../../../assets/openEye.png';
import closeEye from '../../../assets/closeEye.png';
import user from '../../../assets/user.png';
import { Link, useNavigate } from "react-router-dom";

const RegisterField: React.FC = ({ setModalOpacity, setModal, setErrors }) => {
    const [username, setUsername] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [birth, setBirth] = useState<string>("");
    const [role, setRole] = useState<string>("USER");
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const navigate = useNavigate();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleImageClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateInputs()) {
            if (password === confirmPassword) {
                await cadastrar();
                limpar();
            } else {
                setErrors([{ campo: "Confirmação de senha", mensagem: "As senhas não coincidem." }]);
                setModalOpacity({ display: "block" });
                setModal({ display: "block" });
            }
        } else {
            setErrors([{ campo: "Campos obrigatórios", mensagem: "Preencha todos os campos obrigatórios." }]);
            setModalOpacity({ display: "block" });
            setModal({ display: "block" });
        }
    };

    const validateInputs = () => {
        if (!username.trim() || !firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !birth.trim()) {
            return false;
        }
        return true;
    };

    const cadastrar = async () => {
        const userData = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            birth: birth,
            role: role,
        };

        const formData = new FormData();
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }
        formData.append('userData', new Blob([JSON.stringify(userData)], { type: 'application/json' }));

        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                body: formData,
            });

            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful registration!',
                });
            } else if (response.status === 400) {
                const errorData = await response.json();
                const errorArray: { campo: string, mensagem: string }[] = [];
                for (const fieldName in errorData) {
                    const errorMessage = errorData[fieldName];
                    errorArray.push({ fieldName, errorMessage });
                }
                setModalOpacity({ display: 'block' });
                setErrors(errorArray);
                setModal({ display: 'block' });
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Erro ao cadastrar usuário.',
                });
            } else {
                console.log('Ocorreu um erro inesperado: ' + response.status);
            }
        } catch (error) {
            console.log('Erro ao enviar a solicitação:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao enviar a solicitação.',
            });
        }
    };

    const limpar = () => {
        setUsername("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setBirth("");
        setProfileImage(null);
    };

    const handleImagePreview = () => {
        if (profileImage) {
            return URL.createObjectURL(profileImage);
        }
        return null;
    };
    return (
        <form onSubmit={handleSubmit} className="authForm">
            <div className="iconList">
                <img src={iconList} alt="iconList" />
                <h2>RequestEase</h2>
            </div>
            <div className="flex-align">
                <div className="authFieldImage">
                    <span>Select your profile image</span>
                    <div className="imagePreview" onClick={handleImageClick}>
                        <img src={handleImagePreview() || user} alt="userImage" />
                    </div>
                    <input
                        ref={inputRef}
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProfileImage(e.target.files ? e.target.files[0] : null)}
                        style={{ display: "none" }}
                    />
                </div>
                <div className="align-fields">
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
                        <label id="firstNameLabel" className={firstName ? 'active' : ''} htmlFor="firstName">
                            firstName
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            onMouseEnter={() => handleInputFocus('firstNameLabel')}
                            onMouseLeave={() => handleInputBlur('firstNameLabel')}
                        />
                    </div>
                    <div className="authField">
                        <label id="lastNameLabel" className={lastName ? 'active' : ''} htmlFor="lastName">
                            lastName
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            onMouseEnter={() => handleInputFocus('lastNameLabel')}
                            onMouseLeave={() => handleInputBlur('lastNameLabel')}
                        />
                    </div>
                    <div className="authField">
                        <label id="emailLabel" className={email ? 'active' : ''} htmlFor="email">
                            email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onMouseEnter={() => handleInputFocus('emailLabel')}
                            onMouseLeave={() => handleInputBlur('emailLabel')}
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
                    <div className="authField">
                        <label id="confirmPasswordLabel" className={confirmPassword ? 'active' : ''} htmlFor="confirmPassword">
                            Confirmar senha
                        </label>
                        <input
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onMouseEnter={() => handleInputFocus('confirmPasswordLabel')}
                            onMouseLeave={() => handleInputBlur('confirmPasswordLabel')}
                        />
                    </div>
                    <div className="authField">
                        <legend>birth</legend>
                        <input
                            type="date"
                            value={birth}
                            onChange={(e) => setBirth(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="btn">
                <button type="submit">Register</button>

                <Link to={"/auth/login"}>
                    <span>Already registered? log in!</span>
                </Link>
            </div>
        </form>
    )
}

export default RegisterField;