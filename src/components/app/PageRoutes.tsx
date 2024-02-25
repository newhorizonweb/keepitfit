


import { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { PageContext } from '../../App';

import Details from '../details/Details';
import Main from '../main/Main';

const PageRoutes = () => {

    const location = useLocation();

    // Page Context Variables
    const { urlPath } = useContext(PageContext);

    // mode="wait" - wait for the component to fade out before initializing the fade-in animation for the next one
    // initial={false} - don't initialize the animation when loading the website
    return (
        <AnimatePresence mode="wait" initial={false}>
            <Routes location={ location } key={ location.pathname }>
                        
                <Route index path={ urlPath } element={
                    <Main />
                } />

                <Route path={`${urlPath}/details`} element={
                    <Details />
                } />

            </Routes>
        </AnimatePresence>
    );
}
 
export default PageRoutes;