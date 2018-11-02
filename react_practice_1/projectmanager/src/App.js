import React, { Component } from 'react';
import './App.css';
import Counters from './component/counters';
import NavBar from './component/navbar';

class App extends Component {

  state = {
       counters : [
         {id : 0, value : 4},
         {id : 1, value : 3},
         {id : 2, value : 2},
         {id : 3, value : 1},
         {id : 4, value : 0}
       ]
  };


    handleIncrement = counter =>{
       const counters  = [...this.state.counters];
       const index = counters.indexOf(counter);
       counters[index] = {...counter};
       counters[index].value++;
       this.setState({counters : counters});
       console.log(counters[index]);
    };
    handleDecrement = counter =>{
      const counters = [...this.state.counters];
      const index = counters.indexOf(counter);
      counters[index] = {...counter};
      counters[index].value--;
      this.setState({counters : counters});
      console.log("one instance of a counter is decremented. ");
    };
    handleDelete = (counterId)=>{
      // console.log("Event handler called!", counterId);
      const counter = this.state.counters.filter(counter => counter.id !== counterId);
      this.setState({counters: counter});
    };
    handleReset = (counterId) =>{
      const counters = this.state.counters.map(c=>{
          c.value = 0;
          return c;
      });
      this.setState({counters:counters});
    };
  render() {
    return (
      <React.Fragment>
        <NavBar
           totalCounters = {this.state.counters.filter(c=>c.value >0).length}
        />
        <main className = "container">
        </main>
        <Counters
          counters = {this.state.counters}
           onReset  = {this.handleReset}
           onIncrement = {this.handleIncrement}
           onDecrement = {this.handleDecrement}
           onDelete = {this.handleDelete}
        />
      </React.Fragment>
    );
  }
}

export default App;
