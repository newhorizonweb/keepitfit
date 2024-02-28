


export function searchValid(searchVal: string){

    // Validation regex
    const regex = /^[a-zA-Z0-9,.()\- \p{L}]+$/u;
    const regexNoMatch = /[^a-zA-Z0-9,.()\- \p{L}]/gu;
    const invalidCharMsg = "Invalid characters detected";

    // Too short
    const minCharSearch = 3;
    const tooShortMsg = `Use at least ${minCharSearch} characters`;

    // Too long
    const maxCharSearch = 128;
    const tooLongMsg = `Use max ${maxCharSearch} characters`;

    let isValid = false;
    let inpMsg = "";
    let displayMsg;

    switch (true){
        case searchVal.length < minCharSearch:
            inpMsg = tooShortMsg;
            break;

        case searchVal.length > maxCharSearch:
            inpMsg = tooLongMsg;
            break;

        case !regex.test(searchVal):
            const invalidChars = new Set(searchVal.match(regexNoMatch));
            const invalidCharList = Array.from(invalidChars).join("");
            inpMsg = `${invalidCharMsg}: 
                ${invalidCharList ? invalidCharList : invalidCharList}`;
            displayMsg = true;
            break;

        default:
            isValid = true;
            displayMsg = false;
            break;
    }

    return{
        isValid,
        inpMsg,
        displayMsg
    }

}