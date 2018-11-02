import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    count : 9  }
  render() {
    return (
      <div>
        <main role = 'main' className = "container">
          <h1> there are {this.state.count} number of movied in the database. </h1>
        </main>
        <div className = "col md-15">id name title rating</div>
      </div>
    );
  }
}

export default App;
