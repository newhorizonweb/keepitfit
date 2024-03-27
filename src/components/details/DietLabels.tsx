


// React & Redux
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateVisClaims } from "../redux/claims";

// Locales
import { useTranslation } from 'react-i18next';

// Assets
import '../../assets/css/diet-labels.css';
import allowClaims from '../functions/allowClaims';

// TS
type Claim = {
    api: string;
    name: string;
};

const DietLabels = (props: any) => {

    // Redux Dispatch
    const dispatch = useDispatch();

    // Translation
    const { t } = useTranslation(['claims']);

    // API Data
    const searchedData = props.searchedData;

    // API Data Claims
    let apiClaims: string[] = [];

    // Filtered claims
    const [filterClaims, setFilterClaims] = useState([] as Claim[]);

    // Check if there are any claims in the filtered array
    const [areClaimsVisible, setAreClaimsVisible] = useState(false);

    useEffect(() => {

        if (searchedData.foods && searchedData.foods.length > 0){

            // Claims from the API data
            apiClaims = searchedData.foods[0].claims;
            
            // Compare the API data with the "allowed claims"
            setFilterClaims(allowClaims(t).filter(
                obj => apiClaims.includes(obj.api)
            ));

        }
    }, [ searchedData, t ]);

    useEffect(() => {

        // Check if there are any claims in the filtered array
        const isVisible = filterClaims.length > 0;
        setAreClaimsVisible(isVisible);
        dispatch(updateVisClaims(isVisible));
        
    }, [ filterClaims ]);

    if (areClaimsVisible){

        return (
            <div className="diet-labels section-detector" 
                id="diet-labels" data-scroll="labels-scroll-btn">
    
                <h3>Diet Labels</h3>
                
                { filterClaims.map((claim:
                { api: string; name: string; }, index: number) => (
    
                    <p className="claim glass" key={ index }>
                        { claim.name }
                    </p>
    
                )) }
    
            </div>
        );

    } else {
        return (<></>);
    }
}
 
export default DietLabels;