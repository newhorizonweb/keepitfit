


import { KeyboardEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageContext } from '../../App';
import PageTransition from '../app/PageTransition';

import '../../assets/css/main.css';
import Logo from '../../assets/img/keep-it-fit-logo.svg';

const Main = () => {

    // Page navigation
    const navigate = useNavigate();



        /* Variables */

    // Page Context Variables
    const { urlPath, magGlassIcon } = useContext(PageContext);

    // Search keyword
    const [searchVal, setSearchVal] = useState("");



        /* Search */

    // Searchbar input value
    const [inpMsg, setInpMsg] = useState("");

    // Check if the search input value is valid
    const [isValid, setIsValid] = useState(false);

    // Display message
    const [displayMsg, setDisplayMsg] = useState(false);

    // Validation regex
    const regex = /^[a-zA-Z0-9,.()\- \p{L}]+$/u;
    const invalidCharMsg = "Invalid characters detected";

    // Too short
    const minCharSearch = 3;
    const tooShortMsg = `Use at least ${minCharSearch} characters`;

    // Too long
    const maxCharSearch = 128;
    const tooLongMsg = `Use max ${maxCharSearch} characters`;


    

    

        /* Functions */

    // Go to the Details Page
    // Display a message if the keyword is too short
    const goToDetails = () => {

        if (isValid){
            navigate(`${ urlPath }/details`);
        } else {
            setDisplayMsg(true);
        }
        
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter"){
            goToDetails();
        }
    }

    // Update the search value (reactive searchVal -> localstorage)
    useEffect(() => {

        setIsValid(false);

        switch (true){
            case searchVal.length < minCharSearch:
                setInpMsg(tooShortMsg);
                break;

            case searchVal.length > maxCharSearch:
                setInpMsg(tooLongMsg);
                break;

                case !regex.test(searchVal):
                const invalidChars = new Set(searchVal.match(/[^a-zA-Z0-9,.()\- \p{L}]/gu));
                const invalidCharList = Array.from(invalidChars).join("");
                setInpMsg(
                    `${invalidCharMsg}: 
                    ${invalidCharList ? invalidCharList : invalidCharList}`
                );
                break;

            default:
                setIsValid(true);
                setDisplayMsg(false);
                break;
        }

        if (isValid){
            localStorage.setItem("current-search-val", searchVal);
        }

    }, [searchVal]);
    
    return (
        <section className="main-page wrapper">

            <div className="main-content">
                <img className="logo" src={ Logo } alt="Keep It Fit Logo" />

                <div className="search-bar glass">
                    <input
                        type="text"
                        placeholder="Tomato..."
                        onChange={ (e) => setSearchVal(e.currentTarget.value) }
                        onKeyDown={ (e) => handleKeyDown(e) }
                    />
                    <button className={
                        `${ isValid ? 'valid-search' : '' }`
                    }
                    onClick={ goToDetails }>
                        { magGlassIcon }
                    </button>
                </div>

                <p className={
                    `search-msg glass
                    ${ displayMsg ? 'search-msg-active' : '' }`
                }>
                    { inpMsg }
                </p>
            </div>

        </section>
    );
}
 
export default PageTransition(Main);