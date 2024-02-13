/* eslint-disable prettier/prettier */
import { useState } from "react";
import '../css/style.css';
import imgError from '../assets/icons8-erro-48 (1).png';
import LoginField from "./components/loginField/loginField";

interface Error {
    Error: string;
}

const Login: React.FC = () => {
    const [errors, setErrors] = useState<Error[]>([]);

    const [modal, setModal] = useState<{ display: string }>({ display: 'none' });
    const [modalOpacity, setModalOpacity] = useState<{ display: string }>({ display: 'none' });

    const closeModalOpacity = () => {
        setModalOpacity({ display: 'none' });
        setModal({ display: 'none' });
    };

    return (
        <section className="sectionRegister">
            <article className="authArticle">
                <fieldset className="authFieldsetLogin">
                    <LoginField closeModalOpacity={closeModalOpacity} setModal={setModal} setModalOpacity={setModalOpacity} setErrors={setErrors} />
                </fieldset>
                <div className="modal" style={{ display: modal.display }}>
                    <div className="errorModal">
                        <div className="errorIcon">
                            <img src={imgError} alt="Error" />
                            <h2>Erro!</h2>
                        </div>
                        <hr />
                        <div className="errorMessages">
                            {errors.map((erro, index) => (
                                <div key={index}>
                                    <strong>{erro.Error}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Modal de fundo */}
                <div className="modalOpacity" onClick={closeModalOpacity} style={{ display: modalOpacity.display }}></div>
            </article>
        </section>
    );
};

export default Login;
