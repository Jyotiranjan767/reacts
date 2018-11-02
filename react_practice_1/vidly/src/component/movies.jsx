import React, {Component} from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import {paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGeneres } from '../services/fakeGenereService';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component{
  state ={
       movies : [],
       generes : [], // Empty arrays because during backend fetch it would take some time, meantime it should not say 'movies' and 'generes' are undefined.
       currentPage : 1,
       pageSize : 3,
      //  selectedGenere : []
      sortColumn : {path : 'title', order : 'asc'}
  };
  componentDidMount(){
    // here _id is '' beacause to avoid the unique key error in console
    // as we added a new list(name : "All Generes") to list group so we had to add _id to avoid such error)
    const generes = [{_id : "", name : "All Generes"}, ...getGeneres()];
    this.setState({movies : getMovies(), generes : getGeneres(), generes })
  }
  handleDelete = movie =>{
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies}); // this setState overrides the property of state object
  };
  handleLike = (movie) =>{
      // console.log("this movie gets one like from a user!", movie);
      const movies = [...this.state.movies];
      const index  = movies.indexOf(movie);
      movies[index] = {...movies[index]};
      movies[index].liked = !movies[index].liked;
      this.setState({ movies });
  };
  handlePageChange = page =>{
      this.setState({currentPage : page});
  };
  handleGenereSelect = genere =>{
    // const genArray = this.generes.filter(g => g===genere);
    // this.setState({generes : genArray});
    
    this.setState({selectedGenere : genere, currentPage : 1});
    // console.log(genere);
  };
  handleSort = path =>{
    const sortColumn = {...this.state.sortColumn};
    if(sortColumn.path === path)
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    else{
      sortColumn.path = path;
      sortColumn.order  = 'asc';
    }
    this.setState({sortColumn }); // : {path: path, order : 'asc'}});
  };
  render(){
    
    const {length : count} = this.state.movies;
    const {pageSize, 
      currentPage, 
      selectedGenere, 
      // generes, 
      movies:allMovies,
      sortColumn
    }  = this.state;
    if(count=== 0) return <p> There are no movies in databases</p>;
    // else return <p>{this.state.pageSize}</p>
    console.log(selectedGenere, "jyoti genere")
    
    const filtered = selectedGenere && selectedGenere._id
        ? allMovies.filter(m => m.genere.name === selectedGenere.name):
        allMovies;
    // console.log(filtered);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return(
      <div className = "row">
        <div className="col-3">
          <ListGroup 
            items = {this.state.generes} 
            onItemSelect = {this.handleGenereSelect}
            selectedItem = {this.state.selectedGenere}
          />
        </div>
        <div className="col">
          <p> Showing {filtered.length} movies in the database.</p>
          <MoviesTable 
            movies = {movies}
            onDelete = {this.handleDelete}
            onLike  = {this.handleLike}
            onSort = {this.handleSort}
          />
          <Pagination itemCounts = {filtered.length} pageSize  = {pageSize}
            onPageChange = {this.handlePageChange}
            currentPage = {currentPage}/>
    </div> 
    </div>
    );
  }
}

export default Movies;
