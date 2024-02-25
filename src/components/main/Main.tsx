


import { FormEvent, KeyboardEvent, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typed from "typed.js";

import { PageContext } from '../../App';
import PageTransition from '../app/PageTransition';

import '../../assets/css/main.css';
import Logo from '../../assets/img/keep-it-fit-logo.svg';

const Main = () => {

    // Page navigation
    const navigate = useNavigate();

    // Page Context Variables
    const { urlPath, magGlassIcon } = useContext(PageContext);



        /* Search */

    // Search keyword value
    const [searchVal, setSearchVal] = useState("");

    // Search validation message
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

    // Placeholders (typing animation - typed.js)
    const typingContents = [
        "Brown Rice",
        "Bro^1500ccoli",
        "Honey",
        "Pork Chop",
        "Pork Tenderloin",
        "Tomato",
        "Greek Yogurt",
        "Chicken^500 Breast",
        "Chic^500kpe^500as",
        "Apricot",
        "Roast^500ed Almonds",
        "Carrots",
        "Cabbage",
        
        "Shrimp",
        "Maple Syrup",
        "Pea^1000nuts",
        "Peaches",
        "Oregano",
        "Avodado",
        "Asparagus"

    ];

    const [showPlaceHolder, setShowPlaceholder] = useState(true);
    const [isFocused, setIsFocused] = useState(false);



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

    const searchInpKeyDown = (e: KeyboardEvent<HTMLParagraphElement>) => {
        
        if (e.key === "Enter"){
            goToDetails();
        }
    }

    const searchInpChange = (e: FormEvent<HTMLParagraphElement>) => {
        
        const text = e.currentTarget.textContent;

        if (text !== null) {
            setSearchVal(text);
        }
        
        if (text != ""){
            setShowPlaceholder(false);
        } else {
            setShowPlaceholder(true);
        }

    }

    const searchInpFocus = () => {
        setIsFocused(true);
    };
    
    const searchInpBlur = () => {
        setIsFocused(false);
    };

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

    const searchPhRef = useRef(null);

    useEffect(() => {
        const typed = new Typed(searchPhRef.current, {
            strings: typingContents,
            
            startDelay: 0,
            typeSpeed: 200,
            backSpeed: 70,
            backDelay: 2000,

            smartBackspace: true,
            loop: true,
            showCursor: true,
            cursorChar: "",
        });

        return () => {
            typed.destroy();
        };

    }, []);




    
    return (
        <section className="main-page wrapper">

            <div className="main-content">
                <img className="logo" src={ Logo } alt="Keep It Fit Logo" />

                {/* <div className="search-bar glass">
                    <input
                        type="text"
                        

                        onChange={ (e) => setSearchVal(e.currentTarget.value) }
                        onKeyDown={ (e) => handleKeyDown(e) }
                    />
                    <button className={
                        `${ isValid ? 'valid-search' : '' }`
                    }
                    onClick={ goToDetails }>
                        { magGlassIcon }
                    </button>
                </div> */}

                <div className="search-bar glass">

                    <div className="search-inner">

                        <div className={`
                            search-placeholder
                            ${ showPlaceHolder ? 'show-placeholder' : ''}
                            ${ isFocused ? 'hide-cursor' : ''}
                        `}>
                            <span ref={searchPhRef}
                                className="search-placeholder-txt">
                            </span>
                        </div>

                        <p className="search-input"
                            onInput={(e) => searchInpChange(e)}
                            onKeyDown={ (e) => searchInpKeyDown(e) }
                            onFocus={ searchInpFocus }
                            onBlur={ searchInpBlur }
                            contentEditable="true">
                        </p>
                    </div>

                    <button className={`${ isValid ? 'valid-search' : '' }`}
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