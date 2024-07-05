


// Locales
import { useTranslation } from 'react-i18next';

// TS
interface PropTypes{
    userBMI: string;
}

const BmiTable = (props: PropTypes) => {

    // Translation
    const { t } = useTranslation(['nav']);

    const userBMI = props.userBMI;
    const numBMI = parseFloat(userBMI);

    return (
        <div className="bmi-table">

            <div className="bmi-row">
                <p>{ t("user.your_bmi") }</p>
                <p data-testid="user-bmi">{userBMI}</p>
            </div>

            <div className={`bmi-row
            ${ numBMI < 16 ? 'curr-bmi-warn' : '' }`}>
                <p>{ t("user.bmi_lvl1") }</p>
                <p>&lt; 16.0</p>
            </div>

            <div className={`bmi-row
            ${ numBMI >= 16 && numBMI <= 16.9 ? 'curr-bmi-att' : '' }`}>
                <p>{ t("user.bmi_lvl2") }</p>
                <p>16.0-16.9</p>
            </div>

            <div className={`bmi-row
            ${ numBMI >= 17 && numBMI <= 18.4 ? 'curr-bmi' : '' }`}>
                <p>{ t("user.bmi_lvl3") }</p>
                <p>17.0 - 18.4</p>
            </div>

            <div className={`bmi-row
            ${ numBMI >= 18.5 && numBMI <= 24.9 ? 'curr-bmi' : '' }`}>
                <p>{ t("user.bmi_lvl4") }</p>
                <p>18.5-24.9</p>
            </div>

            <div className={`bmi-row
            ${ numBMI >= 25 && numBMI <= 29.9 ? 'curr-bmi' : '' }`}>
                <p>{ t("user.bmi_lvl5") }</p>
                <p>25.0-29.9</p>
            </div>

            <div className={`bmi-row
            ${ numBMI >= 30 && numBMI <= 34.9 ? 'curr-bmi-att' : '' }`}>
                <p>{ t("user.bmi_lvl6") }</p>
                <p>30.0-34.9</p>
            </div>

            <div className={`bmi-row
            ${ numBMI >= 35 && numBMI <= 39.9 ? 'curr-bmi-warn' : '' }`}>
                <p>{ t("user.bmi_lvl7") }</p>
                <p>35.0-39.9</p>
            </div>

            <div className={`bmi-row
            ${ numBMI >= 40 ? 'curr-bmi-warn' : '' }`}>
                <p>{ t("user.bmi_lvl8") }</p>
                <p>≥ 40.0</p>
            </div>

            <div className="table-shadow glass"></div>

        </div>
    );
}
 
export default BmiTable;