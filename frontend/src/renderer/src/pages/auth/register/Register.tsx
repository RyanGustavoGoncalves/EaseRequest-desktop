/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import Typewriter from 'react-typewriter-effect';

import '../css/style.css';
import imgError from '../assets/icons8-erro-48 (1).png';
import RegisterField from './components/registerField/registerField';

const Register: React.FC = () => {

    const [modal, setModal] = useState<{ display: string }>({ display: 'none' });
    const [modalOpacity, setModalOpacity] = useState<{ display: string }>({ display: 'none' });
    const [errors, setErrors] = useState<{ campo: string, mensagem: string }[]>([]);

    const closeModalOpacity = () => {
        setModalOpacity({ display: 'none' });
        setModal({ display: 'none' });
    };

    return (
        <main className='authMain'>
                <article className="authArticle">
                    <div className='align-welcome-txt'>
                        <Typewriter
                            text="Welcome"
                            onInit={(typewriter) => {
                                typewriter
                                    .pauseFor(2000)
                                    .start();
                            }}
                        />
                        <span>Make your first register!</span>
                    </div>
                    <fieldset className="authFieldset">
                        <RegisterField setModalOpacity={setModalOpacity} setModal={setModal} setErrors={setErrors} />
                    </fieldset>
                    <div className="modal" style={{ display: modal.display }}>
                        <div className="errorModal">
                            <div className="errorIcon">
                                <img src={imgError} alt="Error" />
                                <h2>Erro!</h2>
                            </div>
                            <hr />
                            <div className="errorMessages">
                                {errors.map((error, index) => (
                                    <div key={index}>
                                        <strong>{error.campo}</strong> {error.mensagem}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="modalOpacity" onClick={closeModalOpacity} style={{ display: modalOpacity.display }}></div>
                </article>
        </main>
    )
}

export default Register;
