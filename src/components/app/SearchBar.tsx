


// React
import { FormEvent, KeyboardEvent, useContext, useEffect, useRef, useState } from 'react';
import '../../assets/css/searchBar.css';

// Redux
import { useDispatch } from 'react-redux';
import {
    updateSearchedData,
    updateSearchedError,
    clearSearchedVars
} from "../redux/search";

// Page
import { PageContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import Typed from "typed.js";

// Search
import useSearchList from '../hooks/useSearchList';
import SearchList from '../app/SearchList';
import { searchValid } from '../functions/searchValid';
import { searchData } from '../functions/searchData';

// TS
interface PropTypes{
    page: string;
}

const SearchBar = (props: PropTypes) => {



        /* Page */

    // Current page
    const page = props.page;

    // Page Context Variables
    const { apiId, apiKey, urlPath, magGlassIcon } = useContext(PageContext);

    // Redux dispatch (update variables)
    const dispatch = useDispatch();



        /* Search */

    // Search Bar keyword value
    const [searchVal, setSearchVal] = useState(
        localStorage.getItem("current-search-val") ?? ""
    );

    // Check if the search input value is valid
    const [isValid, setIsValid] = useState(false);

    // Search validation message
    const [inpMsg, setInpMsg] = useState("");

    // Display message
    const [displayMsg, setDisplayMsg] = useState(false);



        /* Search Bar Fetch Data */

    function loadData(searchVal: string){

        searchData(searchVal, apiId, apiKey)
        .then(({ apiData, apiError }) => {

            if (apiData){
                dispatch(updateSearchedData(apiData));
            }

            dispatch(updateSearchedError(apiError ?? "Unknown error"));
            
        })
        .catch(error => {
            dispatch(updateSearchedError(error ?? "Unknown error"));
        });

    }

    // Search Bar Input Value
    const [searchInpVal, setSearchInpVal] = useState("");

    // Change the value (when clicking an item in the search list)
    const changeInpVal = (inpVal: string) => {
        setSearchInpVal(inpVal)
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

    const goToDetails = (searchVal: string) => {

        if (isValid && document.querySelector(".list-link")){

            if (page === "main"){

                // Clear the redux data before redirecting to the details page
                dispatch(clearSearchedVars());

                // Redirect to the details page
                navigate(`${ urlPath }/details`);

            } else if(page === "details"){

                // Load the data on display page load
                loadData(searchVal);

            }

        } else if (!isValid){

            // Display a message if the validation check was failed
            setDisplayMsg(true);

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
        setInpMsg(inpSearchMsg);

        if (displaySearchMsg !== undefined){
            setDisplayMsg(displaySearchMsg);
        }

    }

    const searchInpKeyDown = (e: KeyboardEvent<HTMLParagraphElement>) => {
        if (e.key === "Enter"){
            goToDetails(searchVal);
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

    // Update the localStorage value
    // UseEffect prevents bugs when pasting something (ctrl+v) to the input
    useEffect(() => {
        localStorage.setItem("current-search-val", searchVal);
    }, [searchVal]);



        /* Search Bar Placeholder */

    // Search bar text animation
    const searchPhRef = useRef(null);

    // Placeholders
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

    }, []);



        /* Search List Fetch Data */

    const [listData, setListData] = useState<Partial<{ common: any[] }>>({});
    const [listError, setListError] = useState("");
    const { apiData, apiError } = useSearchList(searchVal, true);

    // Update the search list on page load
    useEffect(() => {
        if (page === "details"){
            
            // Check the validation
            checkValid(searchVal);

            // Update the data & error
            setListData(apiData ?? {});
            setListError(apiError as string ?? "");

        }
    }, []);

    // Update the search list when the fetch data changes
    useEffect(() => {
        setListData(apiData ?? {});
        setListError(apiError as string ?? "");
    }, [ apiData, apiError ]);

    

    return (
        <div className="search-section">

            <div className="search-div">
                <div className="search-bar glass">

                    <div className="search-inner">

                        <div className={`
                            search-placeholder
                            ${ showPlaceHolder ? 'show-placeholder' : ''}
                        `}>
                            <span ref={searchPhRef}
                                className="search-placeholder-txt">
                            </span>
                        </div>

                        <input
                            type="text" className="search-input"
                            value={ searchInpVal }
                            onInput={(e) => searchInpChange(e)}
                            onKeyDown={ (e) => searchInpKeyDown(e) }>
                        </input>

                    </div>

                    <button className={`${ isValid ? 'valid-search' : '' }`}
                        onClick={ () => goToDetails(searchVal) }>
                        { magGlassIcon }
                    </button>

                </div>

                { isValid &&
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