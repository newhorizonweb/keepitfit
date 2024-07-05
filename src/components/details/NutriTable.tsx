


// React
import { FormEvent, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateServWght } from "../redux/apiData";

// Locales
import { useTranslation } from 'react-i18next';

// Assets
import useTableData from '../hooks/useTableData';
import { tableContents } from '../functions/tableContents';
import '../../assets/css/nutri-table.css';

// TS
interface PropTypes{
    tableName: string;
}

const NutriTable = (props: PropTypes) => {

    // Redux dispatch (update variables)
    const dispatch = useDispatch();
    
    // Translation
    const { t } = useTranslation(['nutri_table']);



        /* Tables */

    const tableName = props.tableName;
    const { tableInfo: tInfo, macroTable, microTable }:
        { tableInfo: any; macroTable: any, microTable: any }
        = useTableData();

    let tContents: any;

    // User AMR (Active Metabolic Rate)
    const { userAMR } = useSelector(
        ( state:{userData:{userAMR: string}} ) => state.userData
    );

    // Table Info
    let tName = "";
    const nutriFacts = tInfo.nutri_facts;
    const per = tInfo.per_val;
    const daily = tInfo.percent_daily;
    const servSize = tInfo.serving_size;
    
    if (tableName === "macro"){
        tName = tInfo.macro_name;
        tContents = macroTable;
    } else if (tableName === "micro"){
        tName = tInfo.micro_name;
        tContents = microTable;
    }



        /* Serving Weight */

    const { servWght } = useSelector(
        ( state:{apiData:{servWght: number | null}} ) => state.apiData ?? 0
    );


    // NaN check + max value
    const servWghtChange = (e: FormEvent<HTMLInputElement>) => {

        const val = parseInt(e.currentTarget.value);

        if (val < 1000 || isNaN(val)){
            dispatch(updateServWght(isNaN(val) ? null : val));
        } else {
            dispatch(updateServWght(999));
        }
        
    };

    // Set the weight val to 0
    // If the input was empty when removing focus
    const setZeroWght = () => {
        dispatch(updateServWght(servWght ? servWght : 0));
    };

    // Change the value when the search data changes
    useEffect(() => {
        const val = parseInt(tInfo.serving_wght);
        dispatch(updateServWght(isNaN(val) ? 0 : val));
    }, [ tInfo, userAMR ]);



    return (
        <div className={`table-div section-detector 
            ${tableName === "macro" ? 'table-macro' : ''}
            ${tableName === "micro" ? 'table-micro acc-select' : ''}`}
            id={`table-${tableName}`}
            data-scroll={`${tableName}-scroll-btn`}
            data-testid={`${tableName}-table`}>

            <div className="table-shadow glass"></div>

            <div className="table-top">

                <h3>{ tName }</h3>

                { tableName === "macro" &&
                <div className="serving-adj no-print">

                    <p>{ servSize }</p>

                    <div className="serv-inp">
                        <input type="number" autoComplete="off" id="serv-size"
                            aria-label="Serving Size - enter weight in grams"
                            value={ servWght === null ? '' : servWght }
                            onChange={(e) => servWghtChange(e)}
                            onBlur={ setZeroWght }
                        />
                    </div>

                </div>}

            </div>

<div className={`table-inner small-scroll
    ${tableName === "macro" ? 'small-scroll' : ''}
    ${tableName === "micro" ? 'small-scroll-acc' : ''}`}>

    <table className="nutri-table">

    <thead>
        <tr>
            <th>{ nutriFacts }</th>

            <th className="t-span"></th>

            <th>{ per } 100g</th>
            <th className="s-cell amr-cell-info amr-cell-info1">
                { daily }
                <div className="glass">
                    <p>{ t("amr_info.amr_info1") }</p>
                    <p>{ t("amr_info.amr_info2") }</p>
                </div>
            </th>

            <th className="t-span"></th>
            
            <th>{ per } { servWght ? servWght : 0 }g</th>
            <th className="s-cell amr-cell-info amr-cell-info2">
                { daily }
                <div className="glass">
                    <p>{ t("amr_info.amr_info1") }</p>
                    <p>{ t("amr_info.amr_info2") }</p>
                </div>
            </th>
        </tr>
    </thead>

    { tableName === "macro" &&
    Object.keys(tContents).map((groupKey) => (
        <tbody key={groupKey}>

        { Object.keys(tContents[groupKey]).map((elemKey) => {

            const content = tContents[groupKey][elemKey];
            const { name, unit, val100, valServ, DI100, DIserv } = tableContents(content, userAMR, servWght ?? 0);

            return (
                <tr key={elemKey}>
                    <td>
                        <p>{ name }</p>
                    </td>
                    
                    <td className="t-span"></td>

                    <td className="ph">
                        <p>{ val100 + unit }</p>
                    </td>
                    <td className="s-cell ph">
                        <p>{ DI100 ? DI100 + "%" : "" }</p>
                    </td>

                    <td className="t-span"></td>

                    <td className="ph">
                        <p>{ valServ + unit }</p>
                    </td>
                    <td className="s-cell ph">
                        <p>{ DIserv ? DIserv + "%" : "" }</p>
                    </td>
                </tr>
            );
        }) }

        </tbody>
    )) }

    { tableName === "micro" && (
        <tbody>

        {Object.keys(tContents).map((elemKey) => {

            const content = tContents[elemKey];
            const { name, unit, val100, valServ, DI100, DIserv } = tableContents(content, userAMR, servWght ?? 0);

            return (
                <tr key={elemKey}>
                    <td>
                        <p>{ name }</p>
                    </td>
                    
                    <td className="t-span"></td>

                    <td className="ph">
                        <p>{ val100 + unit }</p>
                    </td>
                    <td className="s-cell ph">
                        <p>{ DI100 ? DI100 + "%" : "" }</p>
                    </td>

                    <td className="t-span"></td>

                    <td className="ph">
                        <p>{ valServ + unit }</p>
                    </td>
                    <td className="s-cell ph">
                        <p>{ DIserv ? DIserv + "%" : "" }</p>
                    </td>
                </tr>
            );
        })}
        
        </tbody>
    )}

    </table>

</div>

        </div>
    );
}
 
export default NutriTable;