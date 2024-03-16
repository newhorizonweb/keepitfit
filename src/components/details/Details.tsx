


import { useContext, useEffect } from "react";
import { useSelector } from 'react-redux';

import PageTransition from '../app/PageTransition';

import { PageContext } from '../../App';
import { Link } from 'react-router-dom';

import SearchBar from '../app/SearchBar';
import DetailsTop from './DetailsTop';
import Nav from './Nav';
import Footer from './Footer';

import '../../assets/css/details.css';
import '../../assets/css/print-pdf.css';
import Logo from '../../assets/img/keep-it-fit-logo.svg';

const Details = () => {

    // Page Context Variables
    const { urlPath } = useContext(PageContext);

    // Fetched API Data
    const { searchedData } = useSelector(
        ( state:{search:{searchedData: any}} ) => state.search
    );

    const { userAMR } = useSelector(
        ( state:{userData:{userAMR: string}} ) => state.userData
    );
    const { userBMI } = useSelector(
        ( state:{userData:{userBMI: string}} ) => state.userData
    );

    useEffect(() => {
        console.log(userAMR)
        console.log(userBMI)
    }, [userAMR, userAMR]);


    return(

        <section className={
            "details-page wrapper " +
            `${ !searchedData.foods ? 'details-placeholder' : ''}`
        }>

            <header id="header">
                <Link to={ urlPath }>
                    <img className="logo" src={ Logo }
                        alt="Keep It Fit Logo"
                    />
                </Link>
            </header>

            <section className="details-body">

                <main>

                    <SearchBar
                        page="details"
                    />

                    <DetailsTop />

                </main>

                <Nav />
                
            </section>

            <Footer />

        </section>

    );
}
 
export default PageTransition(Details);