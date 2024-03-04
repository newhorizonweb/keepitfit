


import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import PageTransition from '../app/PageTransition';
import version from '../../../package.json';
import SearchBar from '../app/SearchBar';

const Details = () => {

    // Keep It Fit version
    const appVersion:string = version.version;

        /* Search Bar Fetch API */

    // Fetched API Data
    const { searchedData } = useSelector(
        ( state:{search:{searchedData:any}} ) => state.search
    );

    // Check if the json element value is not empty
    const apiVal = (propVal: any) => {
        return(
            searchedData?.foods?.[0]?.[propVal]
        );
    };



    return(

        <section className="details-page">

            <main>

                <h2>Food name - { apiVal("food_name") }</h2>
                <p>Nf calories - { apiVal("nf_calories") }</p>

                <p>Details Page</p>

                <SearchBar
                    page="details"
                />

            </main>

            <nav>



            </nav>

            <footer>
                <p>v{ appVersion }</p>
            </footer>

        </section>

    );
}
 
export default PageTransition(Details);