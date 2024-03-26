


// React
import { createContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// CSS
import './assets/css/general.css';
import './assets/css/app.css';

// Page Switch
import PageRoutes from './components/app/PageRoutes';

// Github Repo Name
const urlPath:string = "/keepitfit";

// API ID & Key
// Yee, don't bother. It's restricted :)
const apiId:string = "49b43105";
const apiKey:string = "3baf03621c0fcf1bf1de2cab55a09c44";

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
                <PageContext.Provider value={ ContextContent }>
                    <PageRoutes />
                </PageContext.Provider>
            </div>
        </Router>
    );

}

export { PageContext };
export default App;