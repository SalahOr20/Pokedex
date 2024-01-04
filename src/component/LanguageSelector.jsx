import React from 'react';
import { useTranslation } from 'react-i18next';
import enImage from './en.png';
import frImage from './fr.png';

function LanguageSelector({ setSelectedLanguage }) {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
  };
  const imageStyle = {
    width: '35px', // Modifier la taille ici selon vos besoins
    height: '35px', // Modifier la taille ici selon vos besoins
    cursor: 'pointer', // Curseur de la souris indiquant une action cliquable
    marginRight: '10px', // Espacement entre les images
  };
  const header = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end', 
  };

  return (
    <div style={header}>
      <img style={imageStyle} src={enImage} alt="English" onClick={() => changeLanguage('en')} />
      <img style={imageStyle}src={frImage} alt="Français" onClick={() => changeLanguage('fr')} />
    </div>
  );
}

export default LanguageSelector;
