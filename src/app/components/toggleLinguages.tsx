'use client';

import { useTranslation } from 'react-i18next';
import styles from '../styles/Home.module.css';


export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.toggleLinguages}>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('pt')}>Português</button>
      <button onClick={() => changeLanguage('es')}>Espanhol</button>

    </div>
  );
}
