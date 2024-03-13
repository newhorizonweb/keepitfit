


import version from '../../../package.json';
import '../../assets/css/footer.css';

import Logo from '../../assets/img/keep-it-fit-logo.svg';
import ApiLogo from '../../assets/img/nutritionix-logo-attribution.svg';

const Footer = () => {

    // Keep It Fit version
    const appVersion:string = version.version;

    return (
        <footer>

            <div className="footer-credits">

                <a href="#header">
                    <img src={ Logo } alt="Keep It Fit Logo" />
                </a>

                <a className="footer-api-logo"
                    href="https://www.nutritionix.com/" target="_blank">
                    <img src={ ApiLogo } alt="Nutritionix API Logo" />
                </a>

                <h5>Keep It Fit v{ appVersion }</h5>
                <h5>© Created by uverit 2024</h5>

            </div>

            <div className="footer-attrib">
                <a href="https://www.nutritionix.com/" target="_blank">
                    <img src={ ApiLogo } alt="Nutritionix API Logo" />
                </a>
            </div>

        </footer>
    );
}
 
export default Footer;