


export function errorResponse(status: number){

    let apiError = "";
    let errorResp = "";

    switch (status){
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

    if (status){
        apiError = status.toString() + " - " + errorResp;
    } else {
        apiError = errorResp;
    }

    return(
        apiError
    )

}