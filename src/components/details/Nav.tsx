


import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFavSearch } from "../redux/favorites";

import { navIcons } from '../functions/navIcons';
import { printPage } from '../functions/printPage';
import '../../assets/css/nav.css';

const Nav = () => {



        /* Navigation */

    // Nav Icons
    const { userIcon, bookmarkIcon, favListIcon, pdfIcon } = navIcons();
    const [ isBurgerActive, setIsBurgerActive ] = useState(false);

    // Toggle the active button (nav content)
    const [activeButton, setActiveButton] = useState("");

    const toggleActiveBtn = (button: string) => {
        setActiveButton(activeButton === button ? "" : button);
    };

    // Collapse Nav & Closest Section
    useEffect(() => {

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
            setIsBurgerActive(false);
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
        const favList = localStorage.getItem("fav-list");
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
            localStorage.setItem("fav-list", updatedList);

        }

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
        localStorage.setItem("fav-list", updatedList);

    }

    // Search the clicked item from the fav list
    const searchFav = (val: string) => {
        dispatch(updateFavSearch(val));
    };



    return(
        <nav className={`${ isBurgerActive ? 'nav-open' : ''}
            ${ isFavListVisible ? ' fav-list-visible' : '' }`}>

            <div className="nav-buttons glass">

                <div className={`nav-btn nav-btn-check nav-user
                    ${activeButton === 'user' ? 'active' : ''}
                `}
                    onClick={() => toggleActiveBtn("user")}>
                    { userIcon }
                </div>

                <div className={`nav-btn nav-bookmark
                    ${ isFavorite ? ' active' : '' }`}
                    onClick={ toggleFavSearch }>
                    { bookmarkIcon }
                </div>

                <div className={`nav-btn nav-btn-check nav-fav-list
                    ${activeButton === 'fav-list' ? 'active' : ''}
                `}
                    onClick={ () => {
                        setIsFavListVisible(!isFavListVisible);
                        toggleActiveBtn("fav-list");
                    }
                }>
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
                    <h4 className="scroll-link" id="search-scroll-btn"
                        onClick={() => scrollTo("search-bar")}>
                        Search
                    </h4>
                    
                    <h4 className="scroll-link" id="nutrition-scroll-btn"
                        onClick={() => scrollTo("search-bar")}>
                        Nutrition Facts
                    </h4>

                    <h4 className="scroll-link" id="charts-scroll-btn"
                        onClick={() => scrollTo("search-bar")}>
                        Charts
                    </h4>

                    <h4 className="scroll-link" id="micronut-scroll-btn"
                        onClick={() => scrollTo("search-bar")}>
                        Micronutrients
                    </h4>

                    <h4 className="scroll-link" id="diet-scroll-btn"
                        onClick={() => scrollTo("search-bar")}>
                        Diet Labels
                    </h4>
                </div>

                <div className="nav-favorites">

                    <h4 className="fav-heading">Favorite Items</h4>

                    <div className="fav-list small-scroll">
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
                    </div>

                </div>

            </div>

        </nav>
    );
}
 
export default Nav;