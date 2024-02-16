/* eslint-disable prettier/prettier */
import openEye from '../../../assets/openEye.png';
import closeEye from '../../../assets/closeEye.png';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleInputBlur, handleInputFocus } from '@renderer/pages/auth/components/handleInput/HandleInput';
import Modal from '@renderer/components/Modal';
import { closeModal } from '@renderer/pages/home/components/utils/ModalFunctions/ModalFunctions';
import InputField from '@renderer/pages/home/components/inputField/InputField';
import PasswordUpdateModal from '@renderer/pages/settings/components/profileSettings/components/PasswordUpdateModal ';
import PasswordUpdateWithNewPasswordModal from '@renderer/pages/settings/components/profileSettings/components/PasswordUpdateWithNewPasswordModal ';
import { tokenCheckAndUpdatePassword } from '@renderer/pages/home/components/utils/tokenCheckUpdate/TokenCheckAndUpdatePassword';
import { tokenMailForgotPassword } from '@renderer/pages/home/components/utils/tokenMailForgotPassword/tokenMailForgotPassword';

interface Error {
    message: string;
}

interface Props {
    closeModalOpacity: () => void;
    setModal: React.Dispatch<React.SetStateAction<{ display: string }>>;
    setModalOpacity: React.Dispatch<React.SetStateAction<{ display: string }>>;
    setErrors: React.Dispatch<React.SetStateAction<Error[]>>;
}

interface TokenMailLabel {
    token: string;
    newPassword: string;
}

const LoginField: React.FC<Props> = ({ closeModalOpacity, setModal, setModalOpacity, setErrors }) => {
    const navigate = useNavigate();

    const [usernameEdit, setUsernameEdit] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [showUpdateScreen, setShowUpdateScreen] = useState<boolean>(true);
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [modalLabelAndPassword, setModalLabelAndPassword] = useState<boolean>(false);
    const [tokenMailLabel, setTokenMailLabel] = useState<TokenMailLabel>({
        token: "",
        newPassword: ""
    });


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

    const handleTokenCheckAndUpdatePassword = async (tokenMailLabel) => {
        await tokenCheckAndUpdatePassword(tokenMailLabel, setModalLabelAndPassword, setUpdateModal);
        setModalIsOpen(false);
        setShowUpdateScreen(false);
        setUpdateModal(false);
        setModalLabelAndPassword(false);
    }

    const sendToken = async (username) => {
        setLoading(true);
        await tokenMailForgotPassword(username)
        setLoading(false);
        setShowUpdateScreen(false);
        setUpdateModal(true);

    }
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
                <a onClick={() => setModalIsOpen(true)}>
                    <span>Forgot password</span>
                </a>
            </div>

            <Modal isOpen={modalIsOpen} onClose={() => {
                closeModal(setModalIsOpen)
                setShowUpdateScreen(true)
                setUpdateModal(false)
                setModalLabelAndPassword(false)
            }}>
                {loading && (
                    <div className="loading-container">
                        <div className="spinner"></div>
                    </div>
                )}
                {showUpdateScreen && (

                    <div className="password-update-modal">
                        <h5>Update Password</h5>
                        <p>Enter the username where you want<br /> to receive the token</p>

                        <InputField
                            id="usernameEdit"
                            label="Username"
                            value={usernameEdit}
                            onChange={(e) => setUsernameEdit(() => (e.target.value))}
                            onMouseEnter={() => handleInputFocus('usernameEditLabel')}
                            onMouseLeave={() => handleInputBlur('usernameEditLabel')}
                        />

                        <div className="btnSave">
                            <button onClick={() => sendToken({ usernameEdit })}>Send!</button>
                        </div>
                    </div>
                )}
                {updateModal && (
                    <PasswordUpdateModal
                        label="Enter token to update password"
                        value={tokenMailLabel.token}
                        onChange={(e) => setTokenMailLabel((prev) => ({ ...prev, token: e.target.value }))}
                        onClick={() => { setUpdateModal(false), setModalLabelAndPassword(true) }}
                    />
                )}

                {modalLabelAndPassword && (
                    <PasswordUpdateWithNewPasswordModal
                        label="Enter your new password"
                        value={tokenMailLabel.newPassword}
                        onChange={(e) => setTokenMailLabel((prev) => ({ ...prev, newPassword: e.target.value }))}
                        onClick={() => handleTokenCheckAndUpdatePassword(tokenMailLabel)}
                    />
                )}
            </Modal>
        </form>
    )
}

export default LoginField;
