import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Rechercher par nom": "Search by name",
      "Toutes les générations": "All generations",
      "Génération": "Generation",
      "Tous les types": "All types",
      "Numéro": "Number",
      "Alphabétique": "Alphabetical",
      "Poids": "Weight",
      "Taille": "Size",
      "Croissant": "Ascending",
      "Décroissant": "Descending",
      "Fermer": "Close",
      "fr": "en"
    }
  },
  fr: {
    translation: {
      "Rechercher par nom": "Rechercher par nom",
      "Toutes les générations": "Toutes les générations",
      "Génération": "Génération",
      "Tous les types": "Tous les types",
      "Numéro": "Numéro",
      "Alphabétique": "Alphabétique",
      "Poids": "Poids",
      "Taille": "Taille",
      "Croissant": "Croissant",
      "Décroissant": "Décroissant",
      "Fermer": "Fermer",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;