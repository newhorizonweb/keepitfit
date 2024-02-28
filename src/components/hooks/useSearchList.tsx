


import { useState, useEffect, useContext } from "react";
import { PageContext } from '../../App';

const useSearchList = (searchVal: string, isValid: boolean) => {

    const [apiData, setApiData] = useState<unknown>(null);
    const [apiError, setApiError] = useState<unknown>(null);

    // Page Context Variables
    const { apiId, apiKey } = useContext(PageContext);

    useEffect(() => {

        // Validation
        if (searchVal && isValid){

            const dataUrl = 'https://trackapi.nutritionix.com/v2/search/instant/?query=' + searchVal + '&branded=false&detailed=true';

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

                    let errorResp = "";

                    switch (response.status){
                        case 400:
                            errorResp = "Invalid input, please check your search query";
                            break;
                        case 401:
                            errorResp = "Unauthorized access";
                            break;
                        case 403:
                            errorResp = "Forbidden access";
                            break;
                        case 404:
                            errorResp = "Search not found";
                            break;
                        case 409:
                            errorResp = "Search conflict";
                            break;
                        case 500:
                            errorResp = "Server error, try again later";
                            break;
                        default:
                            errorResp = "Unknown error, try again later";
                    }

                    if (response.status){
                        setApiError(response.status.toString() + " - " + errorResp);
                    } else {
                        setApiError(errorResp);
                    }
                    
                }

                return response.json();

            })
            .then(data => {
                setApiData(data);
            })
            .catch(error => {
                setApiError(error.toString());
            });

        } else {
            setApiData(null);
            setApiError("");
        }

    }, [searchVal]);

    return{
        apiData,
        apiError,
    }

}

export default useSearchList;