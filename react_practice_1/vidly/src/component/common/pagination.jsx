import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

// class Pagination extends Component{
const Pagination = ( props )=>{
    //  state  = {};
    const {itemCounts, pageSize, currentPage, onPageChange} = props;
    const pagesCount = itemCounts / pageSize;
    const pages  = _.range(1, pagesCount+1);
    // console.log(pagesCount)
    console.log(currentPage);
    if(Math.ceil(pagesCount) ===1) return null; 
    //  render(){
       return(
         <div>
         {/* <h1>consol</h1> */}
         <nav aria-label="Page navigation example">
            <ul className="pagination">
              {pages.map(page => <li key = {page} 
                  className = {page === currentPage ? 'page-item active' : 'page-item'}>
                <a className = 'page-link' onClick = {()=> onPageChange(page)}>{page}</a></li>)}
            </ul>
         </nav> </div>
       );
    //  };
}
Pagination.propTypes = {
  itemCounts : PropTypes.number.isRequired,
   pageSize : PropTypes.number.isRequired, 
   currentPage: PropTypes.number.isRequired, 
   onPageChange : PropTypes.func.isRequired

}
export default Pagination;
