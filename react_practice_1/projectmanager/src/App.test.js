import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = ReactDOM.getElementById("root");
  ReactDOM.render(<App />, root);
  ReactDOM.unmountComponentAtNode(div);
});
