


import { useState, useEffect } from 'react';
import '../../assets/css/nav.css';

const Nav = () => {

    const userIcon = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle className="anim-elem1" cx="100.4" cy="46.3" r="42.3"/><path d="M54,196a39.7,39.7,0,0,1-22.4-6.6,7.1,7.1,0,0,1-1.4-1c-7.7-5.7-11.8-15.2-12.4-24.5a103.8,103.8,0,0,1,.5-19.3A87.2,87.2,0,0,1,25,120.5c3.1-7.2,7.1-14.3,13.3-19.3s12-7.1,18.8-6.9c8.5.2,13.5,4.9,21.3,7.7a70.4,70.4,0,0,0,21.3,3.7h.6a70.4,70.4,0,0,0,21.3-3.7c7.8-2.8,12.8-7.5,21.3-7.7,6.8-.2,13.4,2.7,18.8,6.9s10.2,12.1,13.3,19.3a87.2,87.2,0,0,1,6.7,24.1,103.8,103.8,0,0,1,.5,19.3c-.6,9.3-4.7,18.8-12.4,24.5a7.1,7.1,0,0,1-1.4,1A39.7,39.7,0,0,1,146,196Z"/></svg>);

    const bookmarkIcon = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path className="anim-elem1" d="M151.6,4C164.5,4,175,17.4,175,34V189.9a6.1,6.1,0,0,1-10.4,4.3l-58.5-58.5a8.6,8.6,0,0,0-12.2,0L35.4,194.2A6.1,6.1,0,0,1,25,189.9V34C25,17.4,35.5,4,48.4,4Z"/></svg>);

    const favListIcon = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M169.1,16.9A28.1,28.1,0,0,1,190,44.1V167.8A28.1,28.1,0,0,1,161.9,196H38.1A28.1,28.1,0,0,1,10,167.8V44.1A28.1,28.1,0,0,1,38.1,16h81"/><rect x="43.4" y="95.5" width="116" height="20.89" rx="7.3"/><rect x="43.4" y="48" width="56.6" height="20.89" rx="7.3"/><rect x="43.4" y="143" width="116" height="20.89" rx="7.3"/><path className="anim-elem1" d="M161.3,4c4.3,0,7.8,4.5,7.8,10V66a2,2,0,0,1-3.5,1.4L146.1,47.9a2.8,2.8,0,0,0-4,0L122.6,67.4a2,2,0,0,1-3.5-1.4V14c0-5.5,3.5-10,7.8-10Z"/></svg>);

    const pdfIcon = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M50.3,75V25.5A19.4,19.4,0,0,1,69.7,6.2h56.5a23.6,23.6,0,0,1,16.7,7l35.3,35.2a23.6,23.6,0,0,1,6.9,16.7V174.5a19.4,19.4,0,0,1-19.3,19.3H69.7a19.4,19.4,0,0,1-19.4-19.3V154.9"/><path className="anim-elem1" d="M132.7,7.2V43.3A15.8,15.8,0,0,0,148.3,59h36.1"/><path className="nostroke anim-elem2" d="M54.2,95.5h0A10.3,10.3,0,0,0,48,93.6H34.8a4.6,4.6,0,0,0-3.2,1.3,4.7,4.7,0,0,0-1.4,3.3v33.5a4.4,4.4,0,0,0,1.2,3.2,4,4,0,0,0,3,1.3h.4a4.3,4.3,0,0,0,3-1.3,5,5,0,0,0,1.1-3.2v-10H48a11.1,11.1,0,0,0,6.2-1.9,13.4,13.4,0,0,0,4.6-5.1A15,15,0,0,0,54.2,95.5Zm-2.6,12.1a6.5,6.5,0,0,1-2.1,4.8h-.1a1.7,1.7,0,0,1-1.4.7H38.9V102.3H48a2.3,2.3,0,0,1,1.5.7,7.5,7.5,0,0,1,1.5,2A5.5,5.5,0,0,1,51.6,107.6Z"/><path className="nostroke anim-elem2" d="M97.3,100a17,17,0,0,0-5.8-4.7,19.7,19.7,0,0,0-7.9-1.7H69.8a4.7,4.7,0,0,0-3.3,1.3,4.4,4.4,0,0,0-1.3,3.3v33.5a4.1,4.1,0,0,0,1.3,3.2,3.9,3.9,0,0,0,2.9,1.3H83.6a16.9,16.9,0,0,0,10.1-2.9,17.7,17.7,0,0,0,6.2-7.8,24.8,24.8,0,0,0,2.1-10.6,26.9,26.9,0,0,0-1.2-8.1A19.1,19.1,0,0,0,97.3,100Zm-4.8,14.9a25.7,25.7,0,0,1-1,6.5,11.7,11.7,0,0,1-3.1,4.5,8.8,8.8,0,0,1-5.4,1.6H74.5V102.3H83a8.4,8.4,0,0,1,4.2,1,7.6,7.6,0,0,1,2.9,2.7,11.8,11.8,0,0,1,1.8,4A19.9,19.9,0,0,1,92.5,114.9Z"/><path className="nostroke anim-elem2" d="M130.1,102.3a4.4,4.4,0,0,0,3.2-1.3,3.4,3.4,0,0,0,1.3-2.8,4.2,4.2,0,0,0-1.3-3.4,4.7,4.7,0,0,0-3.2-1.2H111.3a5.1,5.1,0,0,0-3.4,1.3,4.8,4.8,0,0,0-1.2,3.3v33.5A4.4,4.4,0,0,0,108,135a5,5,0,0,0,3.4,1.2,4.4,4.4,0,0,0,4.5-4.5V119.2h11.6a4.4,4.4,0,0,0,3.2-1.3,4.3,4.3,0,0,0,1.3-3,4.4,4.4,0,0,0-1.3-3.1,4.1,4.1,0,0,0-3.2-1.3H115.9v-8.2Z"/><path className="anim-elem2" d="M130.6,155H34.2a19.4,19.4,0,0,1-19.3-19.3V94.3A19.4,19.4,0,0,1,34.2,75h96.4a19.4,19.4,0,0,1,19.3,19.3v41.4A19.4,19.4,0,0,1,130.6,155Z"/></svg>);

    

        /* Navigation */

    const [ isBurgerActive, setIsBurgerActive ] = useState(false);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setIsBurgerActive(false);
        });
    }, []);



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

                <div className="nav-btn nav-pdf">
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
                    <h4 className="scroll-link" onClick={
                        () => scrollTo("search-bar")
                    }>Search</h4>
                    
                    <h4 className="scroll-link" onClick={
                        () => scrollTo("search-bar")
                    }>Nutrition Facts</h4>

                    <h4 className="scroll-link" onClick={
                        () => scrollTo("search-bar")
                    }>Charts</h4>

                    <h4 className="scroll-link" onClick={
                        () => scrollTo("search-bar")
                    }>Micronutrients</h4>

                    <h4 className="scroll-link" onClick={
                        () => scrollTo("search-bar")
                    }>Diet Labels</h4>
                </div>

            </div>

        </nav>
    );
}
 
export default Nav;