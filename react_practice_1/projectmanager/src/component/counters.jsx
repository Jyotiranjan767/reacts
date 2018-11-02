import React, {Component} from 'react';
import Counter from './counter';
class Counters extends Component{

  render(){
    return(
         <div>
           <button
            onClick = {this.props.onReset}
             className  = "btn-primary btn-sm m-2">reset</button>
             {this.props.counters.map(track =>
               <Counter
                 key = {track.id}
                 // value = {track.value}
                 // selected = {true}
                 // id = {track.id}
                 counter = {track}
                 onIncrement = {this.props.onIncrement}
                 onDecrement = {this.props.onDecrement}
                 onDelete = {this.props.onDelete}
                 >
                    {/* <h4>Counter #{track.id}</h4> */}
               </Counter>)}

         </div>
    );
  };
}

export default Counters;
