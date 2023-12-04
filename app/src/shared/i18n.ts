// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          'verification': 'Text Verification',
          'langue':"Language",
          'texte':"Enter the text to verify",
          'button':"Analyze"
        }
      },
      fr: {
        translation: {
          'verification': "Vérification d'une texte",
          'langue':"Langue",
          'texte':"Entrer le texte à vérifier",
          'button':'Analyser'
        }
      },
    },
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
