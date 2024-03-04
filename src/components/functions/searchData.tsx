


import { errorResponse } from './errorResponse';

export function searchData(searchVal: string, apiId: string, apiKey: string){
    return new Promise<
        { apiData: any, apiError: string }
    >((resolve, reject) => {

        let apiData = {};
        let apiError = "";

        if (!searchVal){
            resolve({ apiData, apiError });
            return;
        }

        const dataUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients/?query=' + searchVal;

        fetch(dataUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-app-id': apiId,
                'x-app-key': apiKey
            },
            body: JSON.stringify({
                "query": searchVal,
                'claims': true,
                'include_subrecipe': true,
                'ingredient_statement': true,
                'line_delimited': true,
                'taxonomy': true,
                'use_raw_foods': true
            })
        })
        .then(response => {

            if (!response.ok){
                apiError = errorResponse(response.status);
                reject(apiError);
            }

            return response.json();

        })
        .then(data => {
            apiData = data;
            resolve({ apiData, apiError });
        })
        .catch(error => {
            apiError = error.toString();
            reject(apiError);
        });
        
    });
}
