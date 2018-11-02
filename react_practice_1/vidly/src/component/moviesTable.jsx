import React from 'react';
import Like from './common/like';
const MoviesTable = (props) =>{
 
    // write object destructure for to understand the interface
    const {movies, onLike, onDelete, onSort} = props;
    return(
    <table className = 'table'>
            <thead>
              <tr>
                <th onClick ={()=>onSort('title')}>Title</th>
                <th onClick ={()=>onSort('genere.name')}>Genere</th>
                <th onClick ={()=>onSort('numberInStock')}>Stock</th>
                <th onClick ={()=>onSort('dailyRentalRate')}>Rate</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {movies.map(map =>
                  <tr key = {map._id}>
                    <td>{map.title}</td>
                    <td>{map.genere.name}</td>
                    <td>{map.numberInStock}</td>
                    <td>{map.dailyRentalRate}</td>
                    <td> <Like liked = {map.liked}
                        onClick = {() => onLike(map)}
                    />
                    </td>
                    <td><button onClick = {()=>onDelete(map)} className = 'btn-primary btn-danger btn-sm'>Delete</button></td>
                  </tr>
              )}
            </tbody>
          </table>
    );
}

export default MoviesTable;