/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import ScrollReveal from 'scrollreveal';

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

    useEffect(() => {
        const sr = ScrollReveal();
    
        const calculateDistance = () => {
          return window.innerWidth > 768 ? '70px' : '15px';
        };
    
        sr.reveal('.authFieldset', {
          origin: 'bottom',
          duration: 1000,
          distance: calculateDistance(),
          reset: true,
        });
        
      }, []);

    return (
        <main className='authMain'>
                <article className="authArticle">
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
