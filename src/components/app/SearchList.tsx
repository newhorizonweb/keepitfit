


import { useEffect, useState } from 'react';
import '../../assets/css/searchList.css';

import imgPlaceholder from '../../assets/img/img-placeholder.svg';
import { nutriVal } from '../functions/nutriVal';

const SearchList = (props: any) => {

    const apiData = props.apiData;
    const apiError = props.apiError;

    // No Results
    const [isNoResults, setIsNoResults] = useState(false);

    // API placeholder image
    const photoCheck = "nix-apple-grey";

    // Search List on page resize
    const [listH, setListH] = useState(0);
    const [prevPos, setPrevPos] = useState(0);

    const handleResize = () => {
        const searchBar = document.querySelector(".main-content .search-bar");
        const windowH = window.innerHeight;
        const paddings = 16 * 2;

        if (searchBar){
            const searchBarRect = searchBar.getBoundingClientRect();
            const listPos = searchBarRect.top + searchBarRect.height;

            const listHeight = windowH - listPos - paddings - 32;
            setListH(listHeight);

            // If the position has changed, continue updating the height
            if (prevPos !== listPos) {
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

    useEffect(() => {
        if (apiData && apiData.common?.length === 0) {
            setIsNoResults(true);
        } else {
            setIsNoResults(false);
        }
    }, [apiData]);





    return (
        <div className="search-list glass">
            <div className="search-list-inner small-scroll"
                style={{ maxHeight: `${ listH }px` }}>

                { !apiError && apiData.common &&
                    apiData.common.map((item: any, index: number) => (

                    <div className="list-elem list-link" key={index}>
                        
                        <div className="list-img">
                            { !item.photo.thumb.includes(photoCheck) &&
                                <img src={item.photo.thumb} alt={`${item.food_name} photo`} />
                            }

                            { item.photo.thumb.includes(photoCheck) &&
                                <img src={imgPlaceholder} alt={`Placeholder Image`} />
                            }
                        </div>
                        
                        <p className="list-name">{item.food_name}</p>
                        <p className="list-kcal">{ nutriVal(item, 208) } kcal</p>
                        
                    </div>

                ))}

                { isNoResults &&
                    <div className="list-elem search-list-msg">
                        <p>No results</p>
                    </div>
                }

                { apiError &&
                    <div className="list-elem search-list-msg search-error">
                        <p>{ apiError }</p>
                    </div>
                }

            </div>
        </div>
    );
}
 
export default SearchList;