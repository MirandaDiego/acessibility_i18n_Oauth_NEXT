import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(HttpBackend) // Carrega traduções do backend
  .use(initReactI18next) // Inicializa o react-i18next
  .init({
    fallbackLng: 'pt', // Idioma padrão
    debug: process.env.NODE_ENV === 'development', // Habilita logs no dev
    interpolation: {
      escapeValue: false, // React já protege contra XSS
    },
    backend: {
      loadPath: 'locales/{{lng}}/{{ns}}.json', // Caminho dos arquivos JSON
    },
  });

export default i18n;
