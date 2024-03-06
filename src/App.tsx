

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

// Context Content
const ContextContent = {
    urlPath,
    apiId,
    apiKey
};

// Send the context hook to the children components
const PageContext = createContext(ContextContent);

function App(){

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