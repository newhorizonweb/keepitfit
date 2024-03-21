


interface Nutrient {
    value: number;
    attr_id: number;
}

interface Item {
    full_nutrients?: Nutrient[];
    serving_weight_grams?: number;
}

export function nutriVal(item: Item, attrId: number){
    
    if (item.full_nutrients && item.serving_weight_grams){

        const nutriVal = item.full_nutrients.find(nutrient => nutrient.attr_id === attrId)?.value;

        const servingWeight = item.serving_weight_grams;

        let nutriVal100 = "-";

        if (nutriVal && servingWeight){
            nutriVal100 =
            (Math.round((nutriVal / servingWeight) * 100 * 10) / 10).toString()
        }

        return(
            nutriVal100
        )

    }

}

export default nutriVal;