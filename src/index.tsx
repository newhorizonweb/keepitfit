


// React
import App from './App';
import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { store } from "./components/redux/store";
import { Provider } from 'react-redux'

// Locales (i18next)
import { I18nextProvider } from 'react-i18next';
import i18next from "./components/app/i18n";

// App
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <I18nextProvider i18n={i18next}>
                <App />
            </I18nextProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();