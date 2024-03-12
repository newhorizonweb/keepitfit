


// React
import { useState } from "react";

import BmiTable from './BmiTable';
import '../../assets/css/nav-user.css';

// Redux
import { useDispatch } from 'react-redux';
import {
    updateUserAMR,
    updateUserBMI,
} from "../redux/userData";

// TS
type inpChng = React.ChangeEvent<HTMLInputElement>;
type selChng = React.ChangeEvent<HTMLSelectElement>;

const NavUser = () => {

        /* Body Metrics */

    // Redux dispatch (update variables)
    const dispatch = useDispatch();

    // User Info Toggle
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    // User Data - localStorage
    const getLS = (name: string) => {
        return localStorage.getItem(name);
    };

    const setLS = (name: string, val: string) => {
        localStorage.setItem(name, val);
    };

    const valLS = (name: string, value: string) => {
        const lsVal = getLS(name);
        if (lsVal){
          return lsVal;
        } else {
            setLS(name, value);
            return value;
        }
    };

    // User Data Values
    const [userUnits, setUserUnits] = useState(
        valLS("user-units", "metric")
    );
    const [userSex, setUserSex] = useState(
        valLS("user-sex", "")
    );
    const [userAge, setUserAge] = useState(
        valLS("user-age", "")
    );

    const [userHeight, setUserHeight] = useState(
        valLS("user-height", "")
    );
    const [userHeightFt, setUserHeightFt] = useState(
        valLS("user-height-ft", "")
    );
    const [userHeightIn, setUserHeightIn] = useState(
        valLS("user-height-in", "")
    );
  
    const [userWeight, setUserWeight] = useState(
        valLS("user-weight", "")
    );
    const [userWeightLbs, setUserWeightLbs] = useState(
        valLS("user-weight-lbs", "")
    );

    const [userActiv, setUserActiv] = useState(
        valLS("user-activ", "1.2")
    );

    const [userAMR, setUserAMR] = useState(
        valLS("user-amr", "0")
    );
    const [userBMI, setUserBMI] = useState(
        valLS("user-bmi", "0")
    );



        /* Validation */
    
    const userValValid = () => {

        const isEmpty =
            userUnits === "" || userSex === "" || userActiv === "" ||
            !markEmptyNum("age", userAge) ||

            (!markEmptyNum("height", userHeight) &&
            !markEmptyNum("height-ft", userHeightFt) &&
            !markEmptyNum("height-in", userHeightIn)) ||

            (!markEmptyNum("weight", userWeight) &&
            !markEmptyNum("weight-lbs", userWeightLbs));
    
        if (isEmpty){
            // Add the "empty" class to the empty element's parent
            markEmptyStr("units", userUnits);
            markEmptyStr("sex", userSex);
            markEmptyStr("activ", userActiv);

            markEmptyNum("age", userAge);
            markEmptyNum("height", userHeight);
            markEmptyNum("height-ft", userHeightFt);
            markEmptyNum("height-in", userHeightIn);
            markEmptyNum("weight", userWeight);
            markEmptyNum("weight-lbs", userWeightLbs);
        }
    
        return !isEmpty;

    };

    const markEmptyNum = (name: string, value: string) => {

        const elem = document.getElementById(name);
        if (!elem) return false;
        
        const parentElem = elem.parentElement;

        if (parentElem && parseFloat(value) > 0 && value != ""){
            parentElem.classList.remove("empty");
            return true;
        } else if(parentElem){
            parentElem.classList.add("empty");
            return false;
        } else {
            return false;
        }

    };

    const markEmptyStr = (name: string, value: string) => {

        const elem = document.getElementById(name);
        if (!elem) return false;
        
        const parentElem = elem.parentElement;

        if (parentElem && value != ""){
            parentElem.classList.remove("empty");
            return true;
        } else if(parentElem){
            parentElem.classList.add("empty");
            return false;
        } else {
            return false;
        }

    };



        /* Calculations */

    // Convert inferior units to the superior ones
    const convertUnits = (userHeight: string, userWeight: string) => {

        let userMetricHeight = userHeight;
        let userMetricWeight = userWeight;

        if (userUnits === "imperial"){
            userMetricHeight =
                ((parseInt(userHeightFt) * 30.48) +
                (parseInt(userHeightIn) * 2.54)).toString();

            userMetricWeight = (parseInt(userWeightLbs) * 0.4536).toString();
        }

        return { userMetricHeight, userMetricWeight };

    }

    // Calculate calorie intake (BMR)
    const calcAMR = () => {

        // Active Metabolic Rate
        let AMR;

        // Check for any empty input values
        if (userValValid()){

            // User sex
            let sexVal;

            switch (userSex){
                case "male":
                    sexVal = 5;
                    break;
                case "female":
                    sexVal = -161;
                    break;
                default:
                    sexVal = 0;
            }

            // User height & weight
            const { userMetricHeight, userMetricWeight } = convertUnits(userHeight, userWeight);

            // Mifflin St Jeor BMR equation
            const BMR = 
                (parseInt(userMetricWeight) * 10) +
                (parseInt(userMetricHeight) * 6.25) -
                (parseInt(userAge) * 5) +
                sexVal;

            AMR = Math.round(BMR * parseFloat(userActiv)).toString();

        } else {
            AMR = "0";
        }

        setLS("user-amr", AMR);
        setUserAMR(AMR);
        dispatch(updateUserAMR(AMR));

    };

    // Calculate BMI
    const calcBMI = () => {

        // Body Mass Index
        let BMI;

        // Check for any empty input values
        if ((markEmptyNum("height", userHeight) ||
            markEmptyNum("height-ft", userHeightFt) ||
            markEmptyNum("height-in", userHeightIn)) &&

            (markEmptyNum("weight", userWeight) ||
            markEmptyNum("weight-lbs", userWeightLbs))){

            // User height & weight
            const { userMetricHeight, userMetricWeight } = convertUnits(userHeight, userWeight);

            const userMetricHeightMeter = parseInt(userMetricHeight) / 100;

            // Round up to 1 decimal point
            BMI = (Math.round(
                    parseInt(userMetricWeight) /
                    (userMetricHeightMeter * userMetricHeightMeter) * 10
                ) / 10).toString();
            
        } else {
            BMI = "0";
        }

        setLS("user-bmi", BMI);
        setUserBMI(BMI);
        dispatch(updateUserBMI(BMI));
        
    };

    // Calculate the values
    const calcUserValues = () => {
        calcAMR();
        calcBMI();
    }



    return (
        <div className="nav-user">
        
            <h4 className="nav-content-head">Body Metrics</h4>

            <div className={`nav-content-inner small-scroll-acc
                ${isInfoOpen ? 'user-info-open' : ''}`}>

                <button className="user-info-btn glass"
                    aria-label="Calculate AMR and BMI"
                    onClick={() => {setIsInfoOpen(!isInfoOpen)}}>
                    <span></span><span></span>
                </button>

                <div className={`user-info ${isInfoOpen ? 'user-info-open' : ''}`}>
                    <p className="user-info-txt">
                        Mifflin St Jeor - this equation gives you a personalized estimate of your Basal Metabolic Rate (BMR) - the daily calories your body burns just existing.
                    </p>
                    <p className="user-info-txt">
                        While not perfect, it can help you set goals for weight management and fine-tune your daily nutrient intake, including both macronutrients (carbs, protein, etc.) and micronutrients (vitamins, minerals).
                    </p>
                </div>

                <div className="user-elem">
                    <label htmlFor="units">Units</label>
                    
                    <div className="user-elem-input user-elem-select glass">
                        <select id="units" value={ userUnits }
                            onInput={(e: selChng) => {
                                setUserUnits(e.target.value);
                                setLS("user-units", e.target.value);
                            }}>

                            <option value="metric">Metric</option>
                            <option value="imperial">Imperial</option>

                        </select>
                        <span></span><span></span>
                    </div>
                </div>

                <div className="user-elem">
                    <label htmlFor="sex">Sex</label>

                    <div className="user-elem-input user-elem-select glass">
                        <select id="sex" value={ userSex }
                            onInput={(e: selChng) => {
                                setUserSex(e.target.value);
                                setLS("user-sex", e.target.value);
                            }}>
                            <option value="" hidden>Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <span></span><span></span>
                    </div>
                </div>

                <div className="user-elem">
                    <label htmlFor="age">Age</label>

                    <div className="user-elem-input glass">
                        <input type="number" id="age"
                            min="13" max="999" value={ userAge }
                            onInput={(e: inpChng) => {
                                setUserAge(e.target.value);
                                setLS("user-age", e.target.value);
                            }}/>
                        <span>yrs</span>
                    </div>
                </div>
                
                <div className="user-elem">
                    { userUnits === "metric" && <>
                        <label htmlFor="height">Height</label>

                        <div className="user-elem-input glass">
                            <input type="number" id="height"
                            min="50" max="999" value={ userHeight }
                            onInput={(e: inpChng) => {
                                setUserHeight(e.target.value);
                                setLS("user-height", e.target.value);
                            }}/>
                            <span>cm</span>
                        </div>
                    </>}

                    { userUnits === "imperial" && <>
                        <label htmlFor="height-ft">Height</label>

                        <div className="user-elem-input glass">
                            <input type="number" id="height-ft"
                            min="1" max="99" value={ userHeightFt }
                            onInput={(e: inpChng) => {
                                setUserHeightFt(e.target.value);
                                setLS("user-height-ft", e.target.value);
                            }}/>
                            <span>ft</span>
                        </div>
                        
                        <div className="user-elem-input glass">
                            <input type="number" id="height-in"
                            aria-label="height-in"
                            min="0" max="11" value={ userHeightIn }
                            onInput={(e: inpChng) => {
                                setUserHeightIn(e.target.value);
                                setLS("user-height-in", e.target.value);
                            }}/>
                            <span>in</span>
                        </div>
                    </>}
                </div>

                <div className="user-elem">
                    { userUnits === "metric" && <>
                        <label htmlFor="weight">Weight</label>

                        <div className="user-elem-input glass">
                            <input type="number" id="weight"
                            min="10" max="999" value={ userWeight }
                            onInput={(e: inpChng) => {
                                setUserWeight(e.target.value);
                                setLS("user-weight", e.target.value);
                            }}/>
                            <span>kg</span>
                        </div>
                    </>}

                    { userUnits === "imperial" && <>
                        <label htmlFor="weight-lbs">Weight</label>

                        <div className="user-elem-input glass">
                            <input type="number" id="weight-lbs"
                            min="10" max="999" value={ userWeightLbs }
                            onInput={(e: inpChng) => {
                                setUserWeightLbs(e.target.value);
                                setLS("user-weight-lbs", e.target.value);
                            }}/>
                            <span>lbs</span>
                        </div>
                    </>}
                </div>

                <div className="user-elem">
                    <label htmlFor="activ">Activity</label>

                    <div className="user-elem-input user-elem-select glass">
                        <select id="activ" value={ userActiv }
                            onInput={(e: selChng) => {
                                setUserActiv(e.target.value);
                                setLS("user-activ", e.target.value);
                            }}>

                            <option value="1">
                                Basal Metabolic Rate (BMR)
                            </option>
                            <option value="1.2">
                                Sedentary (low/no exercise)
                            </option>
                            <option value="1.375">
                                Lightly Active
                            </option>
                            <option value="1.55">
                                Moderately Active
                            </option>
                            <option value="1.725">
                                Very Active
                            </option>
                            <option value="1.9">
                                Extra Active
                            </option>

                        </select>
                        <span></span><span></span>
                    </div>
                </div>

                <div className="user-elem">
                    <button className="calc-btn"
                        onClick={ calcUserValues }>
                        Calculate
                    </button>
                </div>

                { userAMR !="" && userAMR !=="0" &&
                    userBMI !="" && userBMI !=="0" && <>

                    <div className="user-calories glass">
                        <span>Daily Calorie Intake</span>
                        <span>{ userAMR } kcal</span>
                    </div>

                    <BmiTable
                        userBMI={userBMI}
                    />

                </>}

            </div>

        </div>
    );
}
 
export default NavUser;