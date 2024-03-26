


// React
import { useRef, useEffect, useState } from "react";

// TS
interface PropTypes {
    chartName: string;

    content: {
        name: string;
        elemClass: string;
        val: number | null;
    }[];

    totalTarget: number;
}

const Chart = (props: PropTypes) => {



        /* Props */

    // Chart name
    const chartName = props.chartName;

    // Content (remove objects with a value of 0)
    const content = props.content.filter(obj => obj.val !== 0);

    // Info Content
    const infoContent = props.content;

    // Total Value Target (total weight or calories)
    const totalTarget = props.totalTarget;



        /* Chart Settings */

    // Set the svg width in % (whole element)
    const chartWidth = 100;

    // Set the ring stroke width (% of the whole width)
    const ringWidth = 50;

    // Start point (where the elements start from) - in x/360deg
    const startPoint = 0;

    // Chart gap (x/360)
    const chartGap = 1.5;

    // Chart Border (in % of the radius)
    const chartBorder = 1;

    // Flip the chart (false = clockwise, true = counter clockwise)
    const chartFlip = false;



        /* Chart Calculations */

    // SVG center
    const ringCenter = chartWidth / 2;

    // Ring radius
    const ringRad = (chartWidth - ringWidth) / 2;
    const ringRadBorder = (chartWidth - ringWidth - chartBorder) / 2;

    // Ring circumference (excluding the border)
    const ringCircum = ringRadBorder * Math.PI * 2;

    // Start Point in degrees
    const startPointDeg = startPoint * ringCircum / 360;

    // Ring gap in degrees
    const chartGapDeg = chartGap * ringCircum / 360;
    const [ ringGap, setRingGap ] = useState(0);

    // Chart circumference without gaps
    const elemsCircum = ringCircum - (ringGap * content.length);

    // Load ring circumference (including the border)
    const loadCircum = ((chartWidth - ringWidth) / 2 * Math.PI * 2);

    // Load ring starting point
    const loadRingStart = startPointDeg + (90 * loadCircum / 360) + (ringGap / 2);

    // Starting point defaulted to start from the top
    // And take the gap into account (split the gap in half)
    let currCoord = startPointDeg + (90 * ringCircum / 360) + (ringGap / 2);



        /* Total Nutrition Value - Weight & Calories */

    // Total nutrition value
    let totalNuts = 0;
    content.forEach((elem) => {
        if (elem.val !== null){
            totalNuts += elem.val;
        }
    });
    
    // What part of the API data calories is the total amount of calories based on the nutrition values
    const nutCalPerc = totalTarget / totalNuts;

    // Calculate the calorie percentage based on the API data calorie value
    // And not the total calorie value calculated from the nutrients
    const calcPart = (val: number | null) => {
        if (val === null || isNaN(val) || isNaN(nutCalPerc)) return 0;
        return Math.round((val * nutCalPerc / totalTarget * 100) * 10) / 10;
    };



        /* Charts Animation */

    const chartRef = useRef(null);

    // Loading Animation
    const [ loadDasharray, setLoadDasharray ] =
        useState(`${loadCircum} 0`); // remove 1 px gap

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting){
                setLoadDasharray(`0 ${loadCircum}`);
        
                setTimeout(() => {
                    setRingGap(chartGapDeg);
                }, 1700); // load-pie transition time 1500 + delay 200
            }
        },
        {
            root: null,
            rootMargin: '0px',
            threshold: 0.2,
        });
    
        if (chartRef.current){
            observer.observe(chartRef.current);
        }

        return () => {
            if (chartRef.current){
                observer.unobserve(chartRef.current);
            }
        };
    }, []);



    return (
        <div className="pie-chart-div"
            ref={ chartRef }>

            <h3 className="chart-name">{ chartName }</h3>

            <svg className="pie-chart glass"
                viewBox={`0 0 ${chartWidth} ${chartWidth}`}
                style={{transform:`scaleX(${ chartFlip ? 1 : -1 })`}}>

                <circle className="pie"
                    strokeWidth={ ringWidth }
                    cx={ ringCenter } cy={ ringCenter }
                    r={ ringRad }>
                </circle>

                { content.map((elem) => {

                    if (elem.val === null || isNaN(elem.val) || isNaN(calcPart(elem.val))) return;

                    // Percentage the element takes up
                    const elemRatio = calcPart(elem.val);
                    
                    // Ring ratio (colored part)
                    // Relative to the ring circumference (without gaps)
                    const currRingRatio = elemRatio * elemsCircum / 100;

                    // Update the offset position with the element's path length
                    currCoord += currRingRatio;
                    
                    // Ring offset (start point)
                    const ringOffset = currCoord;
                    
                    // Path (element) length
                    const dashArray =
                        `${currRingRatio} ${ringCircum - currRingRatio}`;

                    // Update the offset position with the gap length
                    currCoord += ringGap;

                    return (
                        <circle key={ elem.name }
                            className={`pie-elem ${elem.elemClass}`}
                            strokeWidth={ ringWidth - chartBorder }
                            cx={ ringCenter } cy={ ringCenter }
                            r={ ringRadBorder }
                            
                            strokeDashoffset={ ringOffset }
                            strokeDasharray={ dashArray }>
                        </circle>
                    );

                }) }

                <circle className="pie load-pie no-print"
                    strokeWidth={ ringWidth }
                    cx={ ringCenter } cy={ ringCenter }
                    r={ ringRad }
                    
                    strokeDashoffset={ loadRingStart }
                    strokeDasharray={ loadDasharray }>
                </circle>

            </svg>

            <div className="pie-chart-info">
                <div className="pie-chart-info-inner">

                    { chartName === "weight" &&
                    infoContent.map((elem) => (

                        <div className="chart-info-elem"
                            key={ elem.name }>

                            <div className={`color-tile glass ${elem.elemClass}`}></div>

                            <div className="info-txt">
                                <p>{ elem.name }</p>
                                <p>{`${elem.val ?? 0}g`}</p>
                            </div>

                        </div>

                    )) }

                    { chartName === "calories" &&
                    infoContent.map((elem) => (

                        <div className="chart-info-elem"
                            key={ elem.name }>

                            <div className={`color-tile glass ${elem.elemClass}`}></div>

                            <div className="info-txt">
                                <p>{ elem.name }</p>
                                <p>{`${elem.val} kcal (${calcPart(elem.val)}%)`}</p>
                            </div>

                        </div>

                    )) }

                </div>
            </div>

        </div>
        
    );
}
 
export default Chart;