


// React
import App from './App';
import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { store } from "./components/redux/store";
import { Provider } from 'react-redux'

// Locales
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next.use(initReactI18next).use(LanguageDetector).use(HttpApi)
.init({
    supportedLngs: ["en", "de", "es", "fr", "pl"],
    fallbackLng: "en",
    detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
    },
    backend: {
        loadPath: '../../keepitfit/locales/{{lng}}/{{ns}}.json'
    }
});

// App
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <I18nextProvider i18n={ i18next }>
                <App />
            </I18nextProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();