


import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFavSearch } from "../redux/favorites";

// Locales
import { useTranslation } from 'react-i18next';

import LangSwitch from './LangSwitch';
import NavUser from './NavUser';

import { navIcons } from '../functions/navIcons';
import { printPage } from '../functions/printPage';
import '../../assets/css/nav.css';

const Nav = () => {

    // Languages Icon
    const langIcon = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle className="cls-1" cx="100" cy="100" r="95"/><path className="cls-1" d="M100,195c29.4,0,53.2-42.5,53.2-95S129.4,5,100,5"/><path className="cls-1" d="M100,5C70.6,5,46.8,47.5,46.8,100s23.8,95,53.2,95"/><path className="cls-1" d="M176.6,43.8C159.3,57,131.4,65.6,100,65.6S40.7,57,23.4,43.8"/><path className="cls-1" d="M176.6,156.2c-17.3-13.2-45.2-21.8-76.6-21.8S40.7,143,23.4,156.2"/><line className="cls-1" x1="100" y1="5" x2="100" y2="195"/></svg>);

    // Translation
    const { t } = useTranslation(['nav']);



        /* Navigation */

    // Nav Icons
    const { userIcon, bookmarkIcon, favListIcon, pdfIcon } = navIcons();
    const [ isBurgerActive, setIsBurgerActive ] = useState(false);

    // Toggle the active button (nav content)
    const [activeBtn, setActiveBtn] = useState("");

    const toggleActiveBtn = (button: string) => {
        setActiveBtn(activeBtn === button ? "" : button);
    };

    // Toggle the nav language selector
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    // Close navigation on mobile to dekstop resize
    const closeNavOnResize = () => {
        if (window.innerWidth > 900){
            setIsBurgerActive(false);
        }
    }

    // Collapse Nav & Closest Section
    useEffect(() => {

        const navContent = document.querySelector(".nav-content");

        setTimeout(() => {
            navContent?.classList.add("nav-content-loaded");
        }, 2200);

        closestSection();

        window.addEventListener("click", (e) =>{

            const navElem = document.getElementsByTagName("nav")[0];
    
            if (navElem && navElem !== e.target &&
                !navElem.contains(e.target as Node)){
    
                setIsBurgerActive(false);
            }
    
        });

        window.addEventListener('scroll', () => {
            closestSection();
        });

        window.addEventListener('resize', () => {
            closeNavOnResize();
            closestSection();
        });

    }, []);



        /* Closest Section */

    // "activation point"
    // e.g. 0.3 = 30vh from the top edge of the screen
    const topScrollPadding = window.innerHeight * 0.3; 

    const closestSection = () => {

        // Scroll Position from the top of the page
        const scrollPos = window.scrollY;

        // Nav buttons
        const scrollLinks = document.querySelectorAll(".scroll-link");

        // Sections to be detected
        const sections = document.querySelectorAll(".section-detector");

        sections.forEach((section, index) => {

            const sectionPos = section.getBoundingClientRect();

            // The distance between the top of the page and the section
            const sectionTop = sectionPos.top;

            if ((index === 0 && scrollPos < sectionTop) ||
                sectionTop <= topScrollPadding){

                // Remove the class from each link button
                scrollLinks.forEach((link) => {
                    link.classList.remove('closest-section');
                });

                // Add the class to the button corresponding to the closest section
                const scrollBtn = (section as HTMLElement).dataset.scroll;
                const closestLink = document.querySelector("#"+scrollBtn);

                if (closestLink){
                    closestLink.classList.add('closest-section');
                }
                
            }

        });

    }



        /* ScrollTo */

    const offset = 64; // in px;

    const scrollTo = (elem:string) => {

        const targetElem = document.getElementById(elem);

        if (targetElem){

            const targetPosition =
                targetElem.getBoundingClientRect().top +
                window.scrollY - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

        }

    };



        /* Favorites */

    const [isFavorite, setIsFavorite] = useState(false);
    const [favList, setFavList] = useState([] as string[]);

    // LocalStorage favorites list
    const getFavList = () => {
        const currLang = localStorage.getItem("i18nextLng");
        const favList = localStorage.getItem(`fav-list-${currLang}`);
        const splitArray = favList ? favList.split(', ') : [];
        return(splitArray);
    }

    // Check if the current LS search value is added to the fav list
    const checkFavList = () => {

        const favList = getFavList();
        const searchVal = localStorage.getItem("current-search-val");

        if (searchVal){

            if (favList.includes(searchVal)){
                setIsFavorite(true);
            } else {
                setIsFavorite(false);
            }

        }

    }

    // Add the current search value to the favorites list
    const toggleFavSearch = () => {

        const favList = getFavList();
        const searchVal = localStorage.getItem("current-search-val");

        if (searchVal){

            const deleteIndex = favList.indexOf(searchVal);

            if (!favList.includes(searchVal)){

                // Add the value
                favList.push(searchVal);
                setIsFavorite(true);

            } else if(favList.includes(searchVal) && deleteIndex !== -1){

                // Remove the value
                favList.splice(deleteIndex, 1);
                setIsFavorite(false);

            }

            // Update the fav list
            setFavList(favList);

            // Update the LS fav list
            const updatedList = favList.join(', ');
            const currLang = localStorage.getItem("i18nextLng");
            localStorage.setItem(`fav-list-${currLang}`, updatedList);

        }

    }

    // Load the favorites list
    const loadFavSearch = () => {

        // Unmark the bookmark button
        checkFavList();

        // Load the favorites list
        setFavList(getFavList());
    }

    // Mark the fav search on page load and when searching
    const { searchedData } = useSelector(
        ( state:{search:{searchedData:any}} ) => state.search
    );

    useEffect(checkFavList, [ searchedData ]);
    useEffect(() => setFavList(getFavList()), []);



        /* Favorites List */

    // Redux dispatch (update variables)
    const dispatch = useDispatch(); // redux
    const [isFavListVisible, setIsFavListVisible] = useState(false);

    const removeFromFavList = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        // Prevent from closing the nav
        e.stopPropagation();

        const elem = e.currentTarget.dataset.elem;

        if (!elem) return;
 
        const favList = getFavList();
        const deleteIndex = favList.indexOf(elem);

        // Remove the value
        if (favList.includes(elem) && deleteIndex !== -1){
            favList.splice(deleteIndex, 1);

            if (elem === localStorage.getItem("current-search-val")){
                setIsFavorite(false);
            }
            
        }

        // Update the fav list
        setFavList(favList);

        // Update the LS fav list
        const updatedList = favList.join(', ');
        const currLang = localStorage.getItem("i18nextLng");
        localStorage.setItem(`fav-list-${currLang}`, updatedList);

    }

    // Search the clicked item from the fav list
    const searchFav = (val: string) => {
        dispatch(updateFavSearch(val));
    };



    return(
        <nav className={`${ isBurgerActive ? 'nav-open' : ''}
            ${ activeBtn === '' ? ' scroll-visible' : '' }
            ${ activeBtn === 'fav-list' ? ' fav-list-visible' : '' }
            ${ activeBtn === 'user' ? ' user-visible' : '' }
        `}>

            <div className="nav-buttons glass">

                <div className={`nav-btn nav-btn-check nav-user
                    ${activeBtn === 'user' ? 'active' : ''}
                `}
                    onClick={() => toggleActiveBtn("user")}>
                    { userIcon }
                </div>

                <div className={`nav-btn nav-bookmark
                    ${ isFavorite ? ' active-bookmark' : '' }`}
                    onClick={() => {
                        loadFavSearch();
                        toggleFavSearch();
                    }}>
                    { bookmarkIcon }
                </div>

                <div className={`nav-btn nav-btn-check nav-fav-list
                    ${activeBtn === 'fav-list' ? 'active' : ''}
                `}
                onClick={() => {
                    loadFavSearch();
                    setIsFavListVisible(!isFavListVisible);
                    toggleActiveBtn("fav-list");
                }}>
                    { favListIcon }
                </div>

                <div className="nav-btn nav-pdf"
                    onClick={ () => printPage("800px") }>
                    { pdfIcon }
                </div>

                <div className="nav-btn burger-btn"
                    onClick={() => { setIsBurgerActive(!isBurgerActive) }}>

                    <div className="burger-inner">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                </div>

            </div>

            <div className="nav-content glass">

                <div className="nav-scroll">

                    <h4 className="nav-content-head">
                        { t("sections.section_name") }
                    </h4>

                    <div className={`nav-content-inner small-scroll-acc
                        ${isInfoOpen ? 'nav-info-open' : ''}`}>
                        
                        <button className="nav-info-btn glass"
                            aria-label="Calculate AMR and BMI"
                            onClick={() => {setIsInfoOpen(!isInfoOpen)}}>
                            { langIcon }
                        </button>

                        <LangSwitch
                            isInfoOpen={isInfoOpen}
                            loadFavSearch={loadFavSearch}
                        />

                        <h5 className="scroll-link" id="search-scroll-btn"
                            onClick={() => scrollTo("search-bar")}>
                            { t("sections.search") }
                        </h5>
                        
                        <h5 className="scroll-link" id="nutrition-scroll-btn"
                            onClick={() => scrollTo("search-bar")}>
                            { t("sections.nutri_facts") }
                        </h5>

                        <h5 className="scroll-link" id="charts-scroll-btn"
                            onClick={() => scrollTo("search-bar")}>
                            { t("sections.charts") }
                        </h5>

                        <h5 className="scroll-link" id="micronut-scroll-btn"
                            onClick={() => scrollTo("search-bar")}>
                            { t("sections.micronutrients") }
                        </h5>

                        <h5 className="scroll-link" id="diet-scroll-btn"
                            onClick={() => scrollTo("search-bar")}>
                            { t("sections.diet_labels") }
                        </h5>
                    </div>
                </div>

                <NavUser />

                <div className="nav-favorites">

                    <h4 className="nav-content-head">
                        { t("fav_items") }
                    </h4>

                    <div className="nav-content-inner small-scroll-acc">
                        {favList.map((elem, index) => (

                            <div className="fav-elem" key={ index }>
                                <p onClick={() => searchFav(elem)}>
                                    { elem }
                                </p>

                                <div className="remove-fav-btn"
                                    data-elem={ elem }
                                    onClick={(e) => removeFromFavList(e)}>
                                    <span></span><span></span>
                                </div>
                            </div>

                        ))}

                        {favList.length === 0 &&
                            <div className="fav-elem">
                                <p className="no-favs">-----</p>
                            </div>
                        }
                    </div>

                </div>

            </div>

        </nav>
    );
}
 
export default Nav;