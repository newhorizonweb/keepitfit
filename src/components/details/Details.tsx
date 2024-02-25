


import PageTransition from '../app/PageTransition';

import version from '../../../package.json';

const Details = () => {

    const searchVal = localStorage.getItem("current-search-val");

    const appVersion:string = version.version;

    return (
        <div className="details-page">


            <section className="content">

                <main>

                    <p>Details Page</p>
                    <h3>Searched: { searchVal }</h3>

                </main>

                <nav>



                </nav>

            </section>




            

            <footer>
                <p>v{ appVersion }</p>
            </footer>
        </div>
    );
}
 
export default PageTransition(Details);