


import { FormEvent, KeyboardEvent, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typed from "typed.js";

import { PageContext } from '../../App';
import PageTransition from '../app/PageTransition';

import '../../assets/css/main.css';
import Logo from '../../assets/img/keep-it-fit-logo.svg';
import useSearchList from '../hooks/useSearchList';

import SearchList from '../app/SearchList';
import { searchValid } from '../functions/searchValid';

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
        "Avocado",
        "Asparagus",
    ];

    const [showPlaceHolder, setShowPlaceholder] = useState(true);
    const [isFocused, setIsFocused] = useState(false);



        /* Functions */

    // Go to the Details Page if there are results
    // Display a message if the validation check was failed
    const goToDetails = () => {

        if (document.querySelector(".main-content .list-link")){
            if (isValid){
                navigate(`${ urlPath }/details`);
            } else {
                setDisplayMsg(true);
            }
        }

    }

    const searchInpKeyDown = (e: KeyboardEvent<HTMLParagraphElement>) => {
        
        if (e.key === "Enter"){
            goToDetails();
        }
    }

    const searchInpChange = (e: FormEvent<HTMLInputElement>) => {
        
        // Search keyword
        const text = (e.currentTarget.value ?? "").trim();

        // Search validation
        const {
            isValid: isSearchValid,
            inpMsg: inpSearchMsg,
            displayMsg: displaySearchMsg
        } = searchValid(text);

        setIsValid(isSearchValid);
        setInpMsg(inpSearchMsg);

        if (displaySearchMsg !== undefined){
            setDisplayMsg(displaySearchMsg);
        }
        
        // Update the search keyword & placeholder text behavior
        if (text !== null && text !== ""){
            setSearchVal(text);
            setShowPlaceholder(false);
        } else {
            setShowPlaceholder(true);
        }

        // Save the search to the LS to retrieve it on the details page
        if (isValid){
            localStorage.setItem("current-search-val", text);
        }

    }

    const searchInpFocus = () => {
        setIsFocused(true);
    };
    
    const searchInpBlur = () => {
        setIsFocused(false);
    };

    // Search bar text animation
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

    // API Data
    const [listData, setListData] = useState<Partial<{ common: any[] }>>({});
    const [listError, setListError] = useState("");
    const { apiData, apiError } = useSearchList(searchVal, isValid);

    useEffect(() => {

        if (apiData){
            setListData(apiData);
        } else {
            setListData({});
        }
        
        if (apiError){
            setListError(apiError as string);
        } else {
            setListError("");
        }

    }, [ apiData, apiError ]);





    return (
        <section className="main-page wrapper">

            <div className="main-content">

                <img className="logo" src={ Logo } alt="Keep It Fit Logo" />

                <div className="search-div">
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

                            <input type="text" className="search-input"
                                onInput={(e) => searchInpChange(e)}
                                onKeyDown={ (e) => searchInpKeyDown(e) }
                                onFocus={ searchInpFocus }
                                onBlur={ searchInpBlur }></input>

                        </div>

                        <button className={`${ isValid ? 'valid-search' : '' }`}
                            onClick={ goToDetails }>
                            { magGlassIcon }
                        </button>

                    </div>

                    { isValid &&
                        <SearchList
                            apiData={listData}
                            apiError={listError}
                        />
                    }

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