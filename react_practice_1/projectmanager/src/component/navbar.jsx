import React, {Component} from 'react';

// Stateless functional component
const NavBar = (props) =>{
// class NavBar extends Component{
  // render(){
    return (
      <nav className = "navbar navbar-light bg-light">
        <a className = "navbar-brand">Navbar
          <span className = 'badge badge-pill badge-secondary m-2'>
            {props.totalCounters}</span></a>
      </nav>
    );
  // };
}

export default NavBar;
