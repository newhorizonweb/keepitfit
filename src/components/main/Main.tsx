


import '../../assets/css/main.css';
import PageTransition from '../app/PageTransition';
import Logo from '../../assets/img/keep-it-fit-logo.svg';
import SearchBar from '../app/SearchBar';

const Main = () => {
    return (
        <section className="main-page wrapper">

            <div className="main-content">

                <img className="logo" src={ Logo }
                    alt="Keep It Fit Logo"
                />

                <SearchBar
                    page="main"
                />

            </div>

        </section>
    );
}
 
export default PageTransition(Main);