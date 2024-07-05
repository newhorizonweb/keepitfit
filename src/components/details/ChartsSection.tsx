


// React


// Locales
import { useTranslation } from 'react-i18next';

// Assets
import Chart from "./Chart";
import { nutriVal } from '../functions/nutriVal';
import '../../assets/css/charts.css';

const ChartsSection = ({ searchedData }: { searchedData: any }) => {

    // Translation
    const { t } = useTranslation(['nutri_table']);

    // Get the API data value
    const apiVal = (val: number) => {

        if (searchedData.foods && searchedData.foods.length > 0){

            const value = parseFloat(
                nutriVal(searchedData.foods[0], val) as string
            );

            // Rounded to 1 decimal place in the nutriVal function
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

        if (total){
            return Math.round((
                total - (fiber ? fiber : 0)
            ) * 10) / 10;
        } else {
            return 0;
        }
    };



        /* Charts */

    const chartWght = [
        {
            name: t("macro.total_fat"),
            elemClass: "pie-fat",
            val: apiVal(204)
        },
        {
            name: t("macro.net_carbs"),
            elemClass: "pie-carbs",
            val: netCarbs()
        },
        {
            name: t("macro.fiber"),
            elemClass: "pie-fiber",
            val: apiVal(291)
        },
        {
            name: t("macro.protein"),
            elemClass: "pie-protein",
            val: apiVal(203)
        },
        {
            name: t("water"),
            elemClass: "pie-water",
            val: apiVal(255)
        },

    ];

    const chartCalories = [
        {
            name: t("macro.total_fat"),
            elemClass: "pie-fat",
            val: Math.round(apiVal(204)! * 9 * 10) / 10
        },
        {
            name: t("macro.net_carbs"),
            elemClass: "pie-carbs",
            val: Math.round(netCarbs()! * 4 * 10) / 10
        },
        {
            name: t("macro.fiber"),
            elemClass: "pie-fiber",
            val: Math.round(apiVal(291)! * 2 * 10) / 10
        },
        {
            name: t("macro.protein"),
            elemClass: "pie-protein",
            val: Math.round(apiVal(203)! * 4 * 10) / 10
        },
    ]


    return (
        <div className="pie-charts section-detector" 
            id="nutri-charts" data-testid="charts-section"
            data-scroll="charts-scroll-btn">

            <Chart
                chartName="weight"
                chartLocalName={t("weight")}
                content={ chartWght }
                totalTarget={ 100 }
            />
            
            <Chart
                chartName="calories"
                chartLocalName={t("macro.calories")}
                content={ chartCalories }
                totalTarget={ apiVal(208) ?? 0 }
            />
            
        </div>
    );
    
}
 
export default ChartsSection;