import React from 'react'; // removed { Component } from here as in case it was
                            // unused being there

// interface input : liked  : Boolean
// output : onClick

// converting into a stateless functional component
// starts from here commenting the class above
// class Like extends Component{
//   state  = {
//
//   };
//   render(){
const Like = (props) =>{
    let classes  =  "fa fa-heart";
    if(!props.liked) classes += "-o";
    return(
          <i onClick = {props.onClick}
            style = {{ cursor : 'pointer'}}
            className={classes}></i>
    );
  };
export default Like;
