'use client'

import logo from "@/app/assets/Bank.png";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from '../../app/styles/Home.module.css';
import LanguageSwitcher from "../components/toggleLinguages";
import { axeAccessibilityReporter } from "../utils/axeAccessibilityReporter";

axeAccessibilityReporter()
export default function Home() {

  const {t} = useTranslation('common');

  const [isModal, setIsModal] = useState(false)
  const modalRef = useRef<HTMLDivElement | null>(null); 

  function openModal() {
    setIsModal(true);
  }

  function closeModal() {
    setIsModal(false);
  }

  useEffect(() => {
    if (isModal) {
      modalRef.current?.focus();
    }
  }, [isModal]);

  return (
    <>
    <Head>
      <title>
        {t('main.welcome')}
      </title>
    </Head>
      <header role="banner" className={styles.header}>
        <Image
          alt={t('header.logoAlt')}
          src={logo}
          width={100}
        />
        {/* <div className={styles.nav}>
          <nav aria-label="header">
            <a aria-label="acessar GitHub" href="https://github.com/Mirandadiego">
                <p>link anexado</p>
            </a>
          </nav>
      
      </div> */}
      <LanguageSwitcher/>
      </header>
      <main>
      <article className={styles.content}>
        <header >
          <h1> 
            {t('main.welcome')}
          </h1>
      
    
        </header>
      
        <p>
            {t('main.description')}
          </p>
        <h2 className="text-xs">
{           t('main.aboutMe')}
        </h2>
        <p>
          {t('main.objective')}
        </p>
        <p>
          {t('main.examples')}
        </p>

          <h3>{t('main.accessibilityTitle')}</h3>

      </article>

      </main>

      <footer aria-label="footer"  className={styles.header}>
        <Image
          alt="morpheus"
          src={logo}
          width={100}
        />
        <div >
          <nav className="" aria-label="Rodapé">
          <a
          className="p-4 bg-yellow-50"
          href="#">
               <button 
        onClick={openModal} 
        className={styles.button}
        aria-haspopup="dialog"
        aria-expanded={isModal}
      >
        {t('footer.modalButton')}
      </button>
          </a>
          </nav>
          
      </div>
      </footer>
      {isModal && (
        <div
          ref={modalRef}
          role="dialog"
          tabIndex={-1} // Torna o elemento focável
          aria-labelledby="modal1Title"
          aria-describedby="modal1Description"
          className={styles.modal}
        >
          <h2 id="modal1Title">{t('footer.modalTitle')}</h2>
          <p id="modal1Description">{t('footer.modalDescription')}</p>
          <button onClick={closeModal} className={styles.button}>
          {t('footer.closeModal')}
          </button>
        </div>
      )}
    
    </>
  );
}
