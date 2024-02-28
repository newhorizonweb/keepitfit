

import { createContext } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

// CSS
import './assets/css/general.css';
import './assets/css/app.css';

import PageRoutes from './components/app/PageRoutes';

// Github Repo Name
const urlPath:string = "/keepitfit";

// API ID & Key
// Yee, don't bother. It's restricted :)
const apiId:string = "1b78231c";
const apiKey:string = "1b1537980c65bdb36507f93d553ebb28";

// Magnifying glass icon
const magGlassIcon = (<svg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><defs><style>{".cls-1{fill:none;stroke:#1d1d1b;stroke-linecap:round;stroke-miterlimit:10;stroke-width:10px;}"}</style></defs><circle className='cls-1' cx='67.8' cy='67.9' r='62.8'/><path className='cls-1' d='M145.7,159,178,191.3c4.3,4.3,10.8,4.8,14.5,1.2h0c3.6-3.7,3.1-10.2-1.1-14.5L159,145.7c-22.1-22.1-43-37.1-46.7-33.4S123.6,136.9,145.7,159Z'/><path className='cls-1' d='M41.8,29.6a45.7,45.7,0,0,1,26-8,46.4,46.4,0,0,1,32.3,13'/></svg>);

// Context Content
const ContextContent = {
    urlPath,
    apiId,
    apiKey,
    magGlassIcon,
};

// Send the context hook to the children components
const PageContext = createContext(ContextContent);

function App() {

    return (
        <Router>
            <div className="App">
                {/* <nav>
                    <Link to={ urlPath }>Home</Link>
					<Link to={`${urlPath}/details`}>Details</Link>
                </nav> */}

                <PageContext.Provider value={ ContextContent }>
                    <PageRoutes />
                </PageContext.Provider>

            </div>
        </Router>
    );
}

export { PageContext };
export default App;