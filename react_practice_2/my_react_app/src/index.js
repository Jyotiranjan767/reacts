import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Link} from 'react-router-dom';

const home = ()=>{
    return <h1>Welcome to HOME </h1>
};
const about = ()=>{
    return <h1>Welcome to about </h1>
};


ReactDOM.render(
    
    // <BrowserRouter>
    //     <div className = 'container'> 
    //         <ul>
    //             <li><Link to = "/">app</Link></li>
    //             <li><Link to = "/home">home</Link></li>
    //             <li><Link to = '/about'>about</Link></li>
    //         </ul>
    //         <Route exact path = '/' component = {App} />
    //         <Route path = '/home' component = {home} />
    //         <Route path = '/about' component = {about} />
    //         <h2 className  = 'text-center'>TODOs app</h2>
    //         <ul className = 'list-group p-4'>
    //             <li className = "list-group-item text-center">Buy some clothes</li>
    //             <li className = "list-group-item text-center">Write some code</li>
    //             <li className = "list-group-item text-center">Love react</li>
    //         </ul>

    //     </div>

    // </BrowserRouter>
    <App />, document.getElementById('root'));
registerServiceWorker();
