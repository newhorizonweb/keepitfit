


export function
tableContents(content: any, userAMR: string, servWght: number){
    
    const name = content.name;
    const daily = content.daily;
    const nonVar = content.non_var ?? false;
    const unit = content.unit;
    const round = content.round;

    // Daily Intake
    const DI = (val: string, bdi: number) => {

        if (bdi == 0) return "";
        const multi = parseInt(userAMR) / 2000;

        // Value / daily USER intake * 100%
        let dailyPercent =
            Math.round(parseFloat(val) / (bdi * multi) * 100);

        if (nonVar){
            dailyPercent =
                Math.round(parseFloat(val) / bdi);
        }

        return dailyPercent.toString();

    };

    // Values
    const val = Math.round(
        content.val * Math.pow(10, round)
    ) / Math.pow(10, round);

    const val100 = isNaN(val) ? "" : val.toString();

    const valServ = isNaN(val) ? "" :
        (Math.round(
            val * (servWght ?? 0) / 100 * Math.pow(10, round)
        ) / Math.pow(10, round)).toString();

    // Daily Intake - Values
    const DI100 = DI(val100, daily);
    const DIserv = DI(valServ, daily);

    return{
        name, unit, val100, valServ, DI100, DIserv
    }

}

export default tableContents;