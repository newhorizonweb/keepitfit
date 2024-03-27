


type Claim = {
    api: string;
    name: string;
};

export function allowClaims(t: (key: string) => string): Claim[]{

    // The list of "allowed" claims (so there's no trash labels)
    const allowClaims: Claim[] = [
        {
            api:    "Calorie Free",
            name:   t("kcal_free")
        },
        {
            api:    "Low Calorie",
            name:   t("low_kcal")
        },
        {
            api:    "Fat Free",
            name:   t("fat_free")
        },
        {
            api:    "Low Fat",
            name:   t("low_fat")
        },
        {
            api:    "Saturated Fat Free",
            name:   t("satur_fat_free")
        },
        {
            api:    "Low Saturated Fat",
            name:   t("low_satur_fat")
        },
        {
            api:    "Low Carb",
            name:   t("low_carb")
        },
        {
            api:    "Sugar Free",
            name:   t("sugar_free")
        },
        {
            api:    "High Fiber",
            name:   t("high_fiber")
        },
        {
            api:    "Good Source Of Fiber",
            name:   t("good_fiber")
        },
        {
            api:    "Excellent Source of Fiber - FDA Shelf Tag",
            name:   t("excellent_fiber")
        },
        {
            api:    "Lifestyle - Protein",
            name:   t("high_protein")
        },
        {
            api:    "Cholesterol Free",
            name:   t("cholesterol_free")
        },
        {
            api:    "Low Cholesterol",
            name:   t("low_cholesterol")
        },
        {
            api:    "Low Sodium",
            name:   t("low_sodium")
        },





        {
            api:    "No Wheat Ingredients",
            name:   t("no_wheat")
        },
        {
            api:    "No Milk Ingredients",
            name:   t("no_milk")
        },
        {
            api:    "No Soy Ingredients",
            name:   t("no_soy")
        },
        {
            api:    "No Fish Ingredients",
            name:   t("no_fish")
        },
        {
            api:    "No Crustacean Shellfish Ingredients",
            name:   t("no_crust_shellfish")
        },
        {
            api:    "No Molluscan Shellfish Ingredients",
            name:   t("no_molluscan_shellfish")
        },
        {
            api:    "No Tree Nut Ingredients",
            name:   t("no_tree_nuts")
        },
        {
            api:    "No Peanut Ingredients",
            name:   t("no_peanuts")
        },
        {
            api:    "No Egg Ingredients",
            name:   t("no_eggs")
        },





        {
            api:    "No Added Sugars",
            name:   t("no_added_sugar")
        },
        {
            api:    "No High Fructose Corn Syrup",
            name:   t("no_corn_syrup")
        },
        {
            api:    "No Gluten Ingredients",
            name:   t("no_gluten")
        },
        {
            api:    "No Added Salt",
            name:   t("no_added_salt")
        },
        {
            api:    "No Refined Grains",
            name:   t("no_refined_grains")
        },
        {
            api:    "No Artificial Sweeteners",
            name:   t("no_art_sweeteners")
        },
        {
            api:    "No Artificial Colors",
            name:   t("no_art_colors")
        },
        {
            api:    "No Artificial Flavors",
            name:   t("no_art_flavors")
        },
        {
            api:    "No Artificial Preservatives",
            name:   t("no_art_preservatives")
        },
        {
            api:    "No Artificial Ingredients",
            name:   t("no_art_ingredients")
        },





        {
            api:    "Vegan",
            name:   t("vegan")
        },
        {
            api:    "Vegetarian",
            name:   t("vege")
        },
        {
            api:    "Pescatarian",
            name:   t("pescatarian")
        },
        {
            api:    "Paleo (Strict)",
            name:   t("paleo_strict")
        },
        {
            api:    "Paleo (Friendly)",
            name:   t("paleo_friendly")
        },
        {
            api:    "Mediterranean Diet",
            name:   t("mediterranean")
        },
        {
            api:    "Ketogenic Diet",
            name:   t("keto")
        },
        {
            api:    "Atkins Friendly",
            name:   t("atkins_friendly")
        },
        {
            api:    "DASH Diet",
            name:   t("dash")
        },





        {
            api:    "Whole Food",
            name:   t("whole_food")
        },
        {
            api:    "Contains Shrimp",
            name:   t("shrimp")
        },
        {
            api:    "Contains Coconut",
            name:   t("coconut")
        },
        {
            api:    "Omega 3 (Custom)",
            name:   t("omega_3")
        },
        {
            api:    "Contains Trans Fat",
            name:   t("trans_fat")
        },
        {
            api:    "Contains Healthy Fats",
            name:   t("healthy_fats")
        }
    ];

    return (
        allowClaims
    );

}

export default allowClaims;