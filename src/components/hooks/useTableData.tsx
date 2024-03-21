


import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { nutriVal } from '../functions/nutriVal';

// Locales
import { useTranslation } from 'react-i18next';

/*

Table Legend:

name - nutrient name (in different languages)
val - nutrient amount in grams / 100g of the food item
daily - daily recommended value for an average woman, 2000 kcal
non_var - daily value NOT based on the AMR / daily calorie intake (static recommended value), 
unit - idunno, take a guess,
round - round the weight value to this many decimals

*/

const useTableData = () => {

    // Fetched API Data
    const { searchedData } = useSelector(
        ( state:{search:{searchedData: any}} ) => state.search
    );

    // User Language
    const { userLang } = useSelector(
        ( state:{userLang:{userLang:string}} ) => state.userLang
    );

    // Translation
    const { t, i18n } = useTranslation(['nutri_table']);

    // Tables
    const [tableInfo, setTableInfo] = useState({});
    const [macroTable, setMacroTable] = useState({});
    const [microTable, setMicroTable] = useState({});

    // API Data Value Check
    const apiVal = (val: number) => {

        if (searchedData.foods && searchedData.foods.length > 0){

            const value = parseFloat(
                nutriVal(searchedData.foods[0], val) as string
            );

            const returnVal = isNaN(value) ? null : value;
            return returnVal;

        } else {
            return 0;
        }

    }

    // Net Carbs
    const netCarbs = () => {
        const total = apiVal(205);
        const fiber = apiVal(291);

        if (total && fiber){
            return total - fiber;
        } else {
            return 0;
        }
    }



        /* Table Values */

    useEffect(() => {

        console.log(userLang)

        // Table Info
        setTableInfo({
            macro_name: t("table.macro_name"),
            micro_name: t("table.micro_name"),
            nutri_facts: t("table.nutri_facts"),
            
            serving_size: t("table.serving_size"),
            serving_wght: searchedData?.foods?.[0]?.serving_weight_grams,
    
            per_val: t("table.per_val"),
            percent_daily: t("table.percent_daily"),
        }); 


        // Macro Table
        setMacroTable({

            calories:{
                calories:{
                    name: t("macro.calories"),
                    val: apiVal(208),
                    daily: 2000,
                    unit: " kcal",
                    round: 0
                }
            },
    
            fat:{
                total:{
                    name: t("macro.total_fat"),
                    val: apiVal(204),
                    daily: 72,
                    unit: "g",
                    round: 1
                },
                saturated:{
                    name: t("macro.satur_fat"),
                    val: apiVal(606),
                    daily: 20,
                    unit: "g",
                    round: 1
                },
                trans:{
                    name: t("macro.trans_fat"),
                    val: apiVal(605),
                    daily: 0,
                    unit: "g",
                    round: 1
                },
                mono:{
                    name: t("macro.mono_fat"),
                    val: apiVal(645),
                    daily: 0,
                    unit: "g",
                    round: 1
                },
                poly:{
                    name: t("macro.poly_fat"),
                    val: apiVal(646),
                    daily: 0,
                    unit: "g",
                    round: 1
                }
            },
    
            carbs:{
                total_carbs:{
                    name: t("macro.total_carbs"),
                    val: apiVal(205),
                    daily: 275,
                    unit: "g",
                    round: 1
                },
                net_carbs:{
                    name: t("macro.net_carbs"),
                    val: netCarbs(),
                    daily: 0,
                    unit: "g",
                    round: 1
                },
                fiber:{
                    name: t("macro.fiber"),
                    val: apiVal(291),
                    daily: 28,
                    unit: "g",
                    round: 1
                },
                sugars:{
                    name: t("macro.sugars"),
                    val: apiVal(269),
                    daily: 50,
                    unit: "g",
                    round: 1
                }
            },
    
            protein:{
                protein:{
                    name: t("macro.protein"),
                    val: apiVal(203),
                    daily: 50,
                    unit: "g",
                    round: 1
                }
            },

            cholesterol:{
                cholesterol:{
                    name: t("macro.cholesterol"),
                    val: apiVal(601),
                    daily: 300,
                    unit: "mg",
                    round: 0
                }
            },
    
            sodium:{
                sodium:{
                    name: t("macro.sodium"),
                    val: apiVal(307),
                    daily: 2300,
                    unit: "mg",
                    round: 0
                }
            },
    
            caffeine:{
                caffeine:{
                    name: t("macro.caffeine"),
                    val: apiVal(262),
                    daily: 0,
                    unit: "mg",
                    round: 1
                }
            }
    
        });



        // Micro Table
        setMicroTable({
            vit_A:{
                name: t("micro.vit_A"),
                val: apiVal(320),
                daily: 900,
                unit: "μg",
                round: 0
            },
            vit_C:{
                name: t("micro.vit_C"),
                val: apiVal(401),
                daily: 90,
                unit: "mg",
                round: 1
            },
            vit_D:{
                name: t("micro.vit_D"),
                val: apiVal(328),
                daily: 	20,
                unit: "μg",
                round: 2
            },
            vit_E:{
                name: t("micro.vit_E"),
                val: apiVal(323),
                daily: 15,
                unit: "mg",
                round: 2
            },
            vit_K:{
                name: t("micro.vit_K"),
                val: apiVal(430),
                daily: 120,
                unit: "μg",
                round: 1
            },
            vit_B1:{
                name: t("micro.vit_B1"),
                val: apiVal(404),
                daily: 1.2,
                unit: "mg",
                round: 2
            },
            vit_B2:{
                name: t("micro.vit_B2"),
                val: apiVal(405),
                daily: 1.3,
                unit: "mg",
                round: 2
            },
            vit_B3:{
                name: t("micro.vit_B3"),
                val: apiVal(406),
                daily: 16,
                unit: "mg",
                round: 2
            },
            vit_B5:{
                name: t("micro.vit_B5"),
                val: apiVal(410),
                daily: 5,
                unit: "mg",
                round: 2
            },
            vit_B6:{
                name: t("micro.vit_B6"),
                val: apiVal(415),
                daily: 1.7,
                unit: "mg",
                round: 2
            },
            vit_B9:{
                name: t("micro.vit_B9"),
                val: apiVal(431),
                daily: 400,
                unit: "μg",
                round: 1
            },
            vit_B12:{
                name: t("micro.vit_B12"),
                val: apiVal(418),
                daily: 2.4,
                unit: "μg",
                round: 2
            },
            choline:{
                name: t("micro.choline"),
                val: apiVal(421),
                daily: 550,
                unit: "mg",
                round: 1
            },

            calcium:{
                name: t("micro.calcium"),
                val: apiVal(301),
                daily: 1300,
                unit: "mg",
                round: 0
            },
            copper:{
                name: t("micro.copper"),
                val: apiVal(312),
                daily: 0.9,
                unit: "mg",
                round: 2
            },
            fluoride:{
                name: t("micro.fluoride"),
                val: apiVal(313),
                daily: 30,
                non_var: true, 
                unit: "μg",
                round: 0
            },
            folate:{
                name: t("micro.folate"),
                val: apiVal(417),
                daily: 4,
                non_var: true,
                unit: "μg",
                round: 1
            },
            iron:{
                name: t("micro.iron"),
                val: apiVal(303),
                daily: 18,
                unit: "mg",
                round: 1
            },
            magnesium:{
                name: t("micro.magnesium"),
                val: apiVal(304),
                daily: 420,
                unit: "mg",
                round: 1
            },
            manganese:{
                name: t("micro.manganese"),
                val: apiVal(315),
                daily: 2.3,
                unit: "mg",
                round: 2
            },
            phosphorus:{
                name: t("micro.phosphorus"),
                val: apiVal(305),
                daily: 1250,
                unit: "mg",
                round: 0
            },
            potassium:{
                name: t("micro.potassium"),
                val: apiVal(306),
                daily: 4700,
                unit: "mg",
                round: 0
            },
            selenium:{
                name: t("micro.selenium"),
                val: apiVal(317),
                daily: 55,
                unit: "μg",
                round: 1
            },
            zinc:{
                name: t("micro.zinc"),
                val: apiVal(309),
                daily: 11,
                unit: "mg",
                round: 1
            }
        });

    }, [searchedData, i18n.language]);

    useEffect(() => {
        i18n.changeLanguage(userLang);
    }, [userLang, i18n]);

    return{
        tableInfo,
        macroTable,
        microTable
    }

}

export default useTableData;