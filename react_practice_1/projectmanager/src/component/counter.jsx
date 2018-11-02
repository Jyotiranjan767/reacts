import React, {Component} from 'react';

class Counter extends Component{

	// constructor(){
	// 	super();
	// 	this.handleIncrement = this.handleIncrement.bind(this);
	// }
	// state = {
	// 	value : this.props.counter.value,
	//   imageUrl : "https://picsum.photos/200",
	// 	tags : []
	//  };
	styles = {
	  fontSize : 10,
	  fontWeight : 'bold'
	 };

	render(){
		let classes = this.newMethod();
		// console.log('props', this.props);
		return(
		    <div className = 'row'>
					<div className = 'col-1'>
						{/* {this.props.counter.id} */}
						{/* <h4>{this.props.children}</h4> */}
						{/* <img src = {this.state.imageUrl} alt = '' /> */}
						<span style = {this.styles} className ={classes} >{this.formatCount()} </span>
					</div>
					<div className = 'col'>
               <button onClick = {()=>this.props.onIncrement(this.props.counter)}
						     className = 'btn btn-secondary btn-sm m-2'>+</button>
					     <button onClick = {()=>this.props.onDecrement(this.props.counter)}
					 	     className = 'btn btn-secondary btn-sm'
								 disabled = {this.props.counter.value == 0 ? 'disabled' : ''}>-</button>
               <button onClick = {()=>this.props.onDelete(this.props.counter.id)}
						     className = 'btn btn-danger btn-sm m-2'>Delete</button>
					       {/* <button onClick = {()=>this.resetButton} className = "btn-primary btn-sm m-2" >reset</button> */}
					       {/* {this.state.tags.length === 0 && "create a new tag please "} */}
					       {/* {this.renderTags()} */}
				  </div>
				</div>
      );
	}


// deleted as local state is deleted, for single-truth
	// handleIncrement = (e)=>{
  //     // console.log("one is incremented at a time!", this);
	// 		// this.state.count ++; // no effect as you have to let know react that you update the change explicitly
  //     console.log(e);
	// 		this.setState({value : this.state.value +1});
	// 		// return this.state.count;
	// }
	// doHandle = ()=>{
	// 	this.handleIncrement({id : 1});
	// }
	// renderTags(){
  //    return this.state.tags.length === 0 ? <p>There are no tags </p> : <ul>{this.state.tags.map(tag =><li key = {tag}>{tag}</li>)}</ul>;
	// }
	newMethod(){
		let classes = "badge m-2 badge-"
		classes += (this.props.counter.value === 0) ? 'warning' : 'primary';
		return classes;
	}
	formatCount(){
		const {value} = this.props.counter;
		return value === 0 ?'zero' : value;
	}
}
export default Counter;
