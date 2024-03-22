


// React
import { FormEvent, KeyboardEvent, useContext, useEffect, useRef, useState } from 'react';
import '../../assets/css/search-bar.css';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    updateSearchedData,
    clearSearchedVars
} from "../redux/search";

// Page
import { PageContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import Typed from "typed.js";

// Locales
import { useTranslation } from 'react-i18next';

// Search
import useSearchList from '../hooks/useSearchList';
import SearchList from '../app/SearchList';
import { searchValid } from '../functions/searchValid';
import { searchData } from '../functions/searchData';

// TS
interface PropTypes{
    page: string;
}

const SearchBar: React.FC<PropTypes> = (props: PropTypes) => {



        /* SVG */

    // Magnifying glass icon
    const magGlassIcon = (<svg className="search-icon mag-glass-icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><circle className='cls-1' cx='67.8' cy='67.9' r='62.8'/><path className='cls-1' d='M145.7,159,178,191.3c4.3,4.3,10.8,4.8,14.5,1.2h0c3.6-3.7,3.1-10.2-1.1-14.5L159,145.7c-22.1-22.1-43-37.1-46.7-33.4S123.6,136.9,145.7,159Z'/><path className='cls-1' d='M41.8,29.6a45.7,45.7,0,0,1,26-8,46.4,46.4,0,0,1,32.3,13'/></svg>);

    // Loading Icon
    const loadingIcon=(<svg className="search-icon loading-icon" height="100" width="100" viewBox="0 0 100 100"><circle className="loading-circle loading-bg" cx="50" cy="50" r="45"></circle><circle className="loading-circle loading-loader" cx="50" cy="50" r="45"></circle></svg>);



        /* Page */

    // Current page
    const page = props.page;

    // Translation
    const { t, i18n } = useTranslation(['search_ph', 'errors']);

    // Fav List Value
    const { favoriteSearch } = useSelector(
        ( state:{favorites:{favoriteSearch:string}} ) => state.favorites
    );

    // Page Context Variables
    const { apiId, apiKey, urlPath } = useContext(PageContext);

    // Redux dispatch (update variables)
    const dispatch = useDispatch();



        /* Search */

    // Search Bar keyword value
    const [searchVal, setSearchVal] = useState(
        localStorage.getItem("current-search-val") ?? ""
    );

    // Change the value (when clicking an item in the search list)
    const updateSearchLS = (val: string) => {
        localStorage.setItem("current-search-val", val);
    }

    // Check if the search input value is valid
    const {isValid: initValid} = searchValid(searchVal);
    const [isValid, setIsValid] = useState(initValid);

    // Check if there was a search bar value change
    const [wasSearchFocused, setWasSearchFocused] = useState(false);



        /* Language Switch */

    // Clear the search when switching the language
    const userLang = i18n.language;

    const clearSearch = () => {
        setSearchInpVal("");
        updateSearchLS("");
        setShowPlaceholder(true);
    }

    // Language code for API data fetching
    const switchApiLang = (userLang: string) => {

        let langCode = "";

        switch(userLang){
            case "en":
                langCode = "en_US";
                break;
            case "de":
                langCode = "de_DE";
                break;
            case "es":
                langCode = "es_ES";
                break;
            case "fr":
                langCode = "fr_FR";
                break;
            case "pl":
                langCode = "pl_PL";
                break;
            default:
                langCode = "en_US";
        }

        return langCode;

    }

    const [apiLang, setApiLang] = useState(switchApiLang(userLang));
    
    // Do NOT call the function on page load
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {

        setApiLang(switchApiLang(userLang));

        if (isMounted){
            clearSearch();
        } else {
            setIsMounted(true);
        }

        setInpMsg(errorHandler(currError));

    }, [ userLang ]);



        /* Loading Icon */

    // Delay for the icon to disappear after the results are loaded
    const removeLoadingTimeout:number = 500; // in ms

    // Are the results loading (API fetch)
    const [isLoading, setIsLoading] = useState(false);

    const [loadingTimeout, setLoadingTimeout] =
        useState(undefined as ReturnType<typeof setTimeout> | undefined);

    useEffect(() => {

        if (isLoading){
            document.body.classList.add("loading-data");
        } else {
            document.body.classList.remove("loading-data");
        }
        
    }, [isLoading])

    const startLoading = () => {
        setIsLoading(true);
    }

    const stopLoading = () => {
    
        // Clear the previous timeout
        // If there was another fetch request in the meantime
        clearTimeout(loadingTimeout);

        setLoadingTimeout(
            setTimeout(() => {
                setIsLoading(false)
            }, removeLoadingTimeout)
        )
        
    }

    const stopLoadingForced = () => {

        // Immediately clear the timeout caused by the search list fetch
        // When the details results (search fetch) are loaded
        clearTimeout(loadingTimeout);
        setIsLoading(false);

    }



        /* Message Tile */

    // The time after the "too long" message is displayed
    // Usually it takes around 400ms
    const delayTreshold = 5000; // in ms

    // Display the message/error tile for this amount of time
    const msgDisplayTime = 8000; // in ms

    // Search validation/error message
    const [inpMsg, setInpMsg] = useState("");

    // Display message
    const [displayMsg, setDisplayMsg] = useState(false);

    // Response delay messages
    let respApiTimeout: ReturnType<typeof setTimeout> | undefined;

    const setApiMsgTimeout = () => {

        clearTimeout(respApiTimeout);
        clearTimeout(msgTimeout);

        respApiTimeout = setTimeout(() => {
            setInpMsg(t("errors:waiting"));
            setDisplayMsg(true);
        }, delayTreshold);

    };

    const clearApiMsgTimeout = () => {
        clearTimeout(respApiTimeout)
        setDisplayMsg(false);
    }

    // Error messages
    const [msgTimeout, setMsgTimeout] =
        useState<ReturnType<typeof setTimeout> | undefined>();

    const showMsg = (message: string) => {

        clearTimeout(respApiTimeout);
        clearTimeout(msgTimeout);

        setInpMsg(message);
        setDisplayMsg(true);
        
        setMsgTimeout(
            setTimeout(() => {
                setDisplayMsg(false);
            }, msgDisplayTime)
        );

    }

    const [ currError, setCurrError ] = useState("");

    const errorHandler = (error: string) => {

        // Set the current error to change the language of the message
        setCurrError(error);

        let errorMsg = error;

        // Check if the error is a code, e.g. 400, 401
        if (/^\d+$/.test(error)){
            errorMsg = `${error} - ${t("errors:" + error)}`;

            // If the error code doesn't match the pre-defined codes
            if (/^\d+$/.test(errorMsg)){
                errorMsg = t("errors:unknown");
            }

        }

        return errorMsg;

    }

    const hideMsg = () => {
        clearTimeout(msgTimeout);
        setDisplayMsg(false);
    }



        /* Search Bar Fetch Data */

    // Search Bar Input Value
    const [searchInpVal, setSearchInpVal] = useState("");

    // Change the value (when clicking an item in the search list)
    const changeInpVal = (inpVal: string) => {
        setSearchInpVal(inpVal)
    }

    function loadData(fetchVal: string){

        // Set the search bar value
        setSearchInpVal(fetchVal);

        // Set the first list element value
        setFirstElem(fetchVal);

        // Delay message
        setApiMsgTimeout();

        // Loading Icon
        startLoading();

        searchData(fetchVal, apiId, apiKey, apiLang)
        .then(({ apiData, apiError }) => {

            // Clear the timeout for the "too long response" msg
            clearApiMsgTimeout();

            if (apiData){
                dispatch(updateSearchedData(apiData));
                setWasSearchFocused(false);
            }

            if (apiError){
                showMsg(errorHandler(apiError));
            }
            
        })
        .catch(error => {

            // Clear the timeout for the "too long response" msg
            clearApiMsgTimeout();

            // Show the error message tile
            if (error){
                showMsg(errorHandler(error));
            }

        })
        .finally(() => {

            // Stop the loading icon
            stopLoadingForced();

            // Remove the search bar focus = close the search list
            const activeElement = document.activeElement as HTMLElement;
            if (activeElement){
                activeElement.blur();
            }

        });

    }

    useEffect(() => {
        
        if (page === "details"){

            const { isValid: isSearchValid } = searchValid(searchVal);

            if (isSearchValid){

                // Load the API data
                loadData(searchVal);

                // Set the search bar value
                setSearchInpVal(searchVal);

                // Hide the placeholder if the search bar has a value
                if (searchVal != ""){
                    setShowPlaceholder(false);
                }

            }

        }
        
    }, []);



        /* Search Bar Events / Actions */

    // Page navigation
    const navigate = useNavigate();

    const goToDetails = (fetchVal: string) => {

        if (isValid && document.querySelector(".list-link")){

            // Update the keyword to the localStorage
            updateSearchLS(fetchVal);

            if (page === "main"){

                // Clear the redux data before redirecting to the details page
                dispatch(clearSearchedVars());

                // Redirect to the details page
                navigate(`${ urlPath }/details`);

            } else if(page === "details"){

                // Load the data on display page load
                loadData(fetchVal);

            }

        }
        
    }

    // Validation
    const checkValid = (searchVal: string) => {

        const {
            isValid: isSearchValid,
            inpMsg: inpSearchMsg,
            displayMsg: displaySearchMsg
        } = searchValid(searchVal);

        setIsValid(isSearchValid);

        if (displaySearchMsg){
            showMsg(inpSearchMsg);
        } else {
            hideMsg();
        }

    }

    const searchInpKeyDown = (e: KeyboardEvent<HTMLParagraphElement>) => {
        if (e.key === "Enter"){
            goToDetails(firstElem);
        }
    }

    const searchInpChange = (e: FormEvent<HTMLInputElement>) => {

        // Search keyword
        const text = e.currentTarget.value ?? "";
        setSearchInpVal(text);

        // Check validation
        checkValid(text);
        
        // Update the search keyword
        setSearchVal(text);

        // Update the placeholder text behavior
        if (text !== null && text !== ""){
            setShowPlaceholder(false);
        } else {
            setShowPlaceholder(true);
        }

    }

    // Search the clicked favorite item from the fav list (nav component)
    useEffect(() => {
        if (favoriteSearch){
            goToDetails(favoriteSearch)
        }
    }, [favoriteSearch])



        /* Search Bar Placeholder */

    // Search bar text animation
    const searchPhRef = useRef(null);

    // Placeholders
    const typingContents = [
        t("search_ph:ph0"),
        t("search_ph:ph1"),
        t("search_ph:ph2"),
        t("search_ph:ph3"),
        t("search_ph:ph4"),
        t("search_ph:ph5"),
        t("search_ph:ph6"),
        t("search_ph:ph7"),
        t("search_ph:ph8"),
        t("search_ph:ph9"),
        t("search_ph:ph10"),
        t("search_ph:ph11"),
        t("search_ph:ph12"),
        t("search_ph:ph13"),
        t("search_ph:ph14"),
        t("search_ph:ph15"),
        t("search_ph:ph16"),
        t("search_ph:ph17"),
        t("search_ph:ph18"),
        t("search_ph:ph19")
    ];

    const [showPlaceHolder, setShowPlaceholder] = useState(true);

    // Typing animation - typed.js
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

    }, [ typingContents ]);



        /* Search List Fetch Data */

    const [listData, setListData] = useState<Partial<{ common: any[] }>>({});
    const [listError, setListError] = useState("");
    const [firstElem, setFirstElem] = useState("");

    const { apiData, apiError, isListLoading } =
        useSearchList(searchVal, isValid, apiLang);
    
    // Update the first list element && LS search value
    const setFirstListElem = (data: { common: any[] }) => {
        
        if (data && data.common && data.common.length > 0 && isValid){
            const foodName = data.common[0].food_name;
            setFirstElem(foodName)
        } else {
            setFirstElem("");
        }

    }

    // Update the search list on page load
    useEffect(() => {

        if (page === "details"){
            
            // Check the validation
            checkValid(searchVal);

            // Update the data & error
            setListData(apiData ?? {});
            setListError(apiError as string ?? "");

            if (apiError){
                showMsg(errorHandler(apiError));
            }

            // Update the first list element
            setFirstListElem((apiData as {common: any[]}))

        }
        
    }, []);

    // Update the search list when the fetch data changes
    useEffect(() => {

        setListData(apiData ?? {});
        setListError(apiError as string ?? "");

        if (isListLoading && isValid){
            startLoading();
        } else {
            stopLoading();
        }

        if (apiError){
            showMsg(errorHandler(apiError));
        }
      
        setFirstListElem((apiData as {common: any[]}));

    }, [ apiData, apiError, isListLoading ]);


    
    return (
        <div className="search-section">

            <div className="search-div">
                <div className="search-bar glass section-detector" 
                    id="search-bar" data-scroll="search-scroll-btn">

                    <div className="search-inner">

                        <div className={`
                            search-placeholder
                            ${ showPlaceHolder ? 'show-placeholder' : ''}
                        `}>
                            <span ref={searchPhRef}
                                className="search-placeholder-txt">
                            </span>
                        </div>

                        <input aria-label="Seach Input" autoComplete="off"
                            type="text" className="search-input"
                            id="search-input" value={ searchInpVal }
                            onInput={(e) => searchInpChange(e)}
                            onKeyDown={(e) => searchInpKeyDown(e)}
                            onClick={() => {setWasSearchFocused(true)}}>
                        </input>

                    </div>

                    <button className={`
                        ${ isValid && wasSearchFocused ?
                            'valid-search' : '' }`
                        }
                        aria-label="search-button"
                        onClick={ () => goToDetails(firstElem) }>
                        { !isLoading && magGlassIcon }
                        { isLoading && loadingIcon }
                    </button>
                    
                </div>

                { isValid && searchInpVal != "" &&
                    <SearchList
                        page={page}
                        apiData={listData}
                        apiError={listError}
                        goToDetails={goToDetails}
                        changeInpVal={changeInpVal}
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
    );
}
 
export default SearchBar;