import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Movies from './component/movies';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';


// I will start from here delete everything from App component and will start from there.
ReactDOM.render(<Movies />, document.getElementById('root'));
registerServiceWorker();
