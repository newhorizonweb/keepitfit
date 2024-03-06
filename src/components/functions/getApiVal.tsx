


export function getApiVal(data: any, propPath: string){

    // Split the propPath into an array of keys
    const keys = propPath.split('.');
    
    // Use reduce to traverse the nested properties
    return keys.reduce((value, key) => {
        if (!value || !(key in value)){
            return undefined;
        } else {
            return value[key];
        }
    }, data?.foods?.[0]);

}

export default getApiVal;