import React, { useState, useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import Navbar from '../../components/Navbar';

import seta from './assets/seta.png';
import Aside from './components/asideSettings/Aside';
import ProfileSettings from './components/profileSettings/ProfileSettings';
import RequestSettings from './components/requestSettings/RequestSettings';

const Settings: React.FC = () => {
  const [asideOpen, setAsideOpen] = useState<boolean>(true);
  const [select, setSelect] = useState<number>(0);

  const toggleAside = () => {
    setAsideOpen((prevAsideOpen) => !prevAsideOpen);
  };

  useEffect(() => {
    const sr = ScrollReveal();

    const calculateDistance = () => {
      return window.innerWidth > 768 ? '100px' : '0px';
    };

    sr.reveal('.headerLogoName', {
      origin: 'left',
      duration: 1000,
      distance: calculateDistance(),
      reset: true,
    });
    sr.reveal('.information-user-content', {
      origin: 'left',
      duration: 1000,
      distance: calculateDistance(),
      reset: true,
    });
    sr.reveal('.menuConfig', {
      origin: 'left',
      duration: 1000,
      distance: calculateDistance(),
      reset: true,
    });
    sr.reveal('.userImage', {
      origin: 'top',
      duration: 1000,
      distance: calculateDistance(),
      reset: true,
    });
  }, []);

  return (
    <main className="main-settings-content">
      <Navbar />
      <section className="section-settings-content">
        <div className='menuConfig'>
          {asideOpen && <Aside select={select} setSelect={setSelect} />}
          <img src={seta} alt="menu" onClick={toggleAside} />
        </div>
        {select === 0 ? (
          <ProfileSettings />
        ) : (
          <RequestSettings />
        )}
      </section>
    </main>
  );
};

export default Settings;
