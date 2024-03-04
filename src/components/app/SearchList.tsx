


import { useEffect, useState } from 'react';

import imgPlaceholder from '../../assets/img/img-placeholder.svg';
import { nutriVal } from '../functions/nutriVal';

interface PropTypes{
    page: string;
    apiData: Partial<{ common: Array<Record<string, any>> }>;
    apiError: string;
    goToDetails: (searchVal: string) => void;
    changeInpVal: (inpVal: string) => void;
}

const SearchList = (props: PropTypes) => {

    // API Fetch data & error
    const apiData = props.apiData;
    const apiError = props.apiError;

    // Functions
    const goToDetails = props.goToDetails;
    const changeInpVal = props.changeInpVal;

    // No Results
    const [isNoResults, setIsNoResults] = useState(false);

    // API placeholder image
    const photoCheck = "nix-apple-grey";



        /* Page Resize */

    // Search List on page resize
    const [listH, setListH] = useState(0);
    const [prevPos, setPrevPos] = useState(0);

    const handleResize = () => {

        const searchBar = document.querySelector(".search-bar");
        const windowH = window.innerHeight;
        const paddings = 16 * 2;

        if (searchBar){
            const searchBarRect = searchBar.getBoundingClientRect();
            const listPos = searchBarRect.top + searchBarRect.height;

            const listHeight = windowH - listPos - paddings - 32;
            setListH(listHeight);

            // If the position has changed, continue updating the height
            if (prevPos !== listPos){
                setPrevPos(listPos);
                requestAnimationFrame(handleResize);
            }
        }
        
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



        /* Results */

    // Display "No Results" when there are no results (who would've thought)
    useEffect(() => {
        if (apiData && apiData.common?.length === 0){
            setIsNoResults(true);
        } else {
            setIsNoResults(false);
        }
    }, [apiData]);

    // Call it on mouseDown or the Search Bar will lose focus
    // Before the click is registered
    const displayResults = (e: React.MouseEvent<HTMLDivElement>) => {

        e.preventDefault();
        const target = (e.target as HTMLDivElement).closest('.list-elem');

        if (target){
            const searchData = (target as HTMLDivElement).dataset.search;
            if (searchData){
                localStorage.setItem("current-search-val", searchData);
                goToDetails(searchData as string);
                changeInpVal(searchData as string);
            }

            // Remove the search bar focus = close the search list
            const activeElement = document.activeElement as HTMLElement;
            if (activeElement){
                activeElement.blur();
            }

        }
        
    };
    

    
    return (
        <div className="search-list glass">
            <div className="search-list-inner small-scroll"
                style={{ maxHeight: `${ listH }px` }}>

                { !apiError && apiData.common &&
                    apiData.common.map((item: any, index: number) => (

                    <div className="list-elem list-link"
                        onMouseDown={ displayResults }
                        data-search={ item.food_name }
                        key={ index }>
                        
                        <div className="list-img">
                            { !item.photo.thumb.includes(photoCheck) &&
                                <img src={item.photo.thumb} alt={`${item.food_name} photo`} />
                            }

                            { item.photo.thumb.includes(photoCheck) &&
                                <img src={imgPlaceholder} alt={`Placeholder Image`} />
                            }
                        </div>
                        
                        <p className="list-name">{ item.food_name }</p>
                        <p className="list-kcal">{ nutriVal(item, 208) } kcal</p>
                        
                    </div>

                ))}

                { isNoResults && !apiError &&
                    <div className="list-elem search-list-msg">
                        <p>No results</p>
                    </div>
                }

            </div>
        </div>
    );
}
 
export default SearchList;