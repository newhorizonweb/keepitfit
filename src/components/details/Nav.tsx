


import { useState, useEffect } from 'react';
import { navIcons } from '../functions/navIcons';
import '../../assets/css/nav.css';

const Nav = () => {



        /* Navigation */

    // Nav Icons
    const { userIcon, bookmarkIcon, favListIcon, pdfIcon } = navIcons();

    const [ isBurgerActive, setIsBurgerActive ] = useState(false);

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



        /* PDF Print */

    const printWidth = "800px";

    const printPage = () => {

        // Add the page cover to hide the narrow body
        const pageCover = document.createElement("div");
        pageCover.classList.add("page-cover", "page-cover-visible");
        document.body.appendChild(pageCover);

        setTimeout(() => {

            // Set the body print class to apply the styles
            document.body.classList.add("page-print");

            // Set the print width
            document.body.style.width = printWidth;

            // Set the print page dimensions
            // + 64px for the footer bottom-padding, to ensure everything fits
            const printHeight:string = `${document.body.scrollHeight + 64}px`;

            document.documentElement.style.setProperty("--printWidth", printWidth);
            document.documentElement.style.setProperty("--printHeight", printHeight);

            // Print the page
            window.print();

            // Remove the print styles
            document.body.classList.remove("page-print");

            // Set the page body to the normal width
            document.body.style.width = "100%";

            // Fade out the page cover
            pageCover.classList.remove("page-cover-visible");

            // Remove the page cover after the fade-out transition
            setTimeout(() => {
                document.body.removeChild(pageCover);
            }, 150); // CSS - trans2

        }, 150); // CSS - trans2

    };



    return(
        <nav className={`${ isBurgerActive ? 'nav-open' : '' }`}>

            <div className="nav-buttons glass">

                <div className="nav-btn nav-user">
                    { userIcon }
                </div>

                <div className="nav-btn nav-bookmark">
                    { bookmarkIcon }
                </div>

                <div className="nav-btn nav-favorites">
                    { favListIcon }
                </div>

                <div className="nav-btn nav-pdf" onClick={printPage}>
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

            </div>

        </nav>
    );
}
 
export default Nav;