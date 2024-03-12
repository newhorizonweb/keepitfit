


// TS
interface PropTypes{
    userBMI: string;
}

const BmiTable = (props: PropTypes) => {

    const userBMI = props.userBMI;
    const numBMI = parseFloat(userBMI);

    return (
        <div className="bmi-table">

            <div className="bmi-row">
                <p>Your BMI</p>
                <p>{userBMI}</p>
            </div>

            <div className={`bmi-row
            ${ numBMI < 16 ? 'curr-bmi-warn' : '' }`}>
                <p>&lt; 16.0</p>
                <p>Severe thinness</p>
            </div>

            <div className={`bmi-row
            ${ numBMI >= 16 && numBMI <= 16.9 ? 'curr-bmi-att' : '' }`}>
                <p>16.0-16.9</p>
                <p>Moderate thinness</p>
            </div>

            <div className={`bmi-row
            ${ numBMI >= 17 && numBMI <= 18.4 ? 'curr-bmi' : '' }`}>
                <p>17.0 - 18.4</p>
                <p>Mild thinness</p>
            </div>

            <div className={`bmi-row
            ${ numBMI >= 18.5 && numBMI <= 24.9 ? 'curr-bmi' : '' }`}>
                <p>18.5-24.9</p>
                <p>Normal range</p>
            </div>

            <div className={`bmi-row
            ${ numBMI >= 25 && numBMI <= 29.9 ? 'curr-bmi' : '' }`}>
                <p>25.0-29.9</p>
                <p>Overweight</p>
            </div>

            <div className={`bmi-row
            ${ numBMI >= 30 && numBMI <= 34.9 ? 'curr-bmi-att' : '' }`}>
                <p>30.0-34.9</p>
                <p>Obese (Class I)</p>
            </div>

            <div className={`bmi-row
            ${ numBMI >= 35 && numBMI <= 39.9 ? 'curr-bmi-warn' : '' }`}>
                <p>35.0-39.9</p>
                <p>Obese (Class II)</p>
            </div>

            <div className={`bmi-row
            ${ numBMI >= 40 ? 'curr-bmi-warn' : '' }`}>
                <p>≥ 40.0</p>
                <p>Obese (Class III)</p>
            </div>

            <div className="table-shadow glass"></div>

        </div>
    );
}
 
export default BmiTable;