


// React & Redux
import { useContext } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { PageContext } from '../../App';
import PageTransition from '../app/PageTransition';

// Components
import Nav from './Nav';
import SearchBar from '../app/SearchBar';
import DetailsTop from './DetailsTop';
import NutriTable from "./NutriTable";
import ChartsSection from "./ChartsSection";
import DietLabels from "./DietLabels";
import Footer from './Footer';

// Assets
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

                    <NutriTable
                        tableName="macro"
                    />

                    <ChartsSection
                        searchedData={ searchedData }
                    />

                    <NutriTable
                        tableName="micro"
                    />

                    <DietLabels
                        searchedData={ searchedData }
                    />

                </main>

                <Nav />
                
            </section>

            <Footer />

        </section>

    );
}
 
export default PageTransition(Details);