


// React
import { useEffect, useState } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { updateLang } from "../redux/language";
import '../../assets/css/lang-switch.css';

// Locales
import i18next from "i18next";

// Flag Icons
import Flag_US from '../../assets/img/flags/us.svg';
import Flag_DE from '../../assets/img/flags/de.svg';
import Flag_ES from '../../assets/img/flags/es.svg';
import Flag_FR from '../../assets/img/flags/fr.svg';
import Flag_PL from '../../assets/img/flags/pl.svg';

// TS
interface PropTypes{
    isInfoOpen: boolean;
    loadFavSearch: () => void;
}

const LangSwitch = (props: PropTypes) => {

    // Props
    const isInfoOpen = props.isInfoOpen;
    const loadFavSearch = props.loadFavSearch;

    // Redux dispatch (update variables)
    const dispatch = useDispatch();

    // Language List
    const langList = [
        {
            langName: "English",
            code: "en",
            country: Flag_US,
        },
        {
            langName: "Deutsch",
            code: "de",
            country: Flag_DE,
        },
        {
            langName: "Español",
            code: "es",
            country: Flag_ES,
        },
        {
            langName: "Français",
            code: "fr",
            country: Flag_FR,
        },
        {
            langName: "Polski",
            code: "pl",
            country: Flag_PL,
        },
    ];

    // Current language
    const [currLang, setCurrLang] = useState(
        localStorage.getItem("i18nextLng") ?? ""
    );

    // Change language
    const chngLang = (langCode: string) => {
        i18next.changeLanguage(langCode);
        dispatch(updateLang(langCode));
        setCurrLang(langCode);
        loadFavSearch();
    };

    // Update the language on page load
    // AFTER the localStorage is set by the i18next
    useEffect(() => {
        chngLang(localStorage.getItem("i18nextLng") ?? "")
    }, []);

    
    
    return (
        <div className={`nav-info lang-switch glass
            ${isInfoOpen ? 'nav-info-open' : ''}`}>
            
            {langList.map(({ langName, code, country }) => (

                <div className={`nav-info-lang
                    ${currLang === code ? 'curr-lang' : ''}`}
                    
                    onClick={() => {chngLang(code)}} key={code}>

                    <div className="flag-img">
                        <img src={country} alt={`${code} flag`} />
                    </div>
                    <p>{ langName }</p>

                </div>

            ))}

        </div>
    );
}
 
export default LangSwitch;