import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  
constructor(){
  super();
  this.state = {
      todos : [
      {id : 1, name : 'play tennis'},
      {id : 2, name : 'buy clothes'},
      {id : 3, name : "write some codes"},
      {id : 4, name : 'love react'}
  ],
  classN : 'list-group-item text-center'
  };
  // this.classN = 'list-group-item text-center';
  this.handleActive = active =>{
    console.log("luckie");
    let  {classN} = this.state;
    classN += (active.id == this.state.todos.id) ? " active" : '';
    console.log(classN , ' and ',active);
    // return s
    this.setState({classN});
  };
};
  render() {
    const {todos} = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <h2 className  = 'text-center p-4'>TODOs app</h2>
              <ul className = 'list-group'>
                  {this.state.todos.map(type=>
                    <li  onClick = {this.handleActive} className = {this.state.classN}>
                     {type.name} 
                    </li>
                  )
                }
                  
                  {
                    /* <li className = "list-group-item text-center">{this.state.todos[0].name}</li>
                  <li className = "list-group-item text-center">{this.state.todos[1].name}</li>
                  <li className = "list-group-item text-center">{this.state.todos[2].name}</li>
                  <li className = "list-group-item text-center">{this.state.todos['3'].name}</li> */
                  }
              </ul>
        </div>
        {/* <Route>

        </Route> */}
      </BrowserRouter>
    );
  }
}

export default App;
