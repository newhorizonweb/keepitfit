


import { useState, useEffect, useContext } from "react";
import { PageContext } from '../../App';

const useSearchList = (searchVal: string, isValid: boolean, apiLang: string) => {

    const [apiData, setApiData] = useState<unknown>(null);
    const [apiError, setApiError] = useState("");
    const [isListLoading, setIsListLoading] = useState(false);

    // Page Context Variables
    const { apiId, apiKey } = useContext(PageContext);

    useEffect(() => {
        
        // Validation
        if (searchVal && isValid && apiLang){

            const dataUrl = `https://trackapi.nutritionix.com/v2/search/instant/?query=${searchVal}&locale=${apiLang}&branded=false&detailed=true`;

            setIsListLoading(true);

            // &locale=pl_PL

            fetch(dataUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-app-id': apiId,
                    'x-app-key': apiKey
                }
            })
            .then(response => {

                if (!response.ok){
                    setApiError(response.status.toString())
                }

                return response.json();

            })
            .then(data => {
                setApiData(data);
                setIsListLoading(false);
            })
            .catch(error => {
                setApiError(error.toString());
                setIsListLoading(false);
            });

        } else {
            setApiData(null);
            setApiError("");
        }

    }, [searchVal]);

    return{
        apiData,
        apiError,
        isListLoading
    }

}

export default useSearchList;