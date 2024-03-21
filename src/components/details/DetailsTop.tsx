


import { getApiVal } from '../functions/getApiVal';
import { useSelector } from 'react-redux';

import '../../assets/css/details-top.css';
import imgPlaceholder from '../../assets/img/img-placeholder.svg';

const DetailsTop = () => {

    // Fetched API Data
    const { searchedData } = useSelector(
        ( state:{search:{searchedData:any}} ) => state.search
    );

    // Data Value Check
    const apiVal = (val: string) => {
        return getApiVal(searchedData, val);
    }

    return (
        <div className="details-top">
            <h1 className="details-heading ph">{ apiVal("food_name") }</h1>

            <div className="details-image glass">
                { apiVal("photo.highres") &&
                    <img src={ apiVal("photo.highres") }
                        alt={ apiVal("food_name") + " photo" } />
                }
                { !apiVal("photo.highres") &&
                    <img src={ imgPlaceholder } alt="Placeholder Image" />
                }
            </div>
        </div>
    );
}
 
export default DetailsTop;