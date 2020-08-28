import React, {Component} from 'react';

import { MovieList } from './components/card-list/movies-list.jsx'
import { SearchBox } from './components/search-box/search-box.component'
import LoadingSpinner from './components/loader/loading-spinner';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor() {
    super(); 

    this.state = {
      movies: null,
      nominated: [],
      searchField: 'hulk',
      prevSearchState: '',
      loading: true
    }
  }

 

  async componentDidUpdate() {
    let searchState = this.state.searchField
    let prevSearch = this.state.prevSearchState
    if(prevSearch !== searchState){
    // this.setState({loading:true})
    const movies = await axios.get(`http://www.omdbapi.com/?t=${searchState}&apikey=b261581a`)

    this.setState({...this.state, movies: [movies.data], prevSearchState: this.state.searchField, loading:false})
    }
  }


  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  }


  render() {
    const { movies, loading, searchField } = this.state; 

      
    // const filteredMovies = movies.filter(movie => 
    //     movie.body.toLowerCase().includes(searchField.toLowerCase())
    //   )

      console.log("Movies", movies)
      console.log("App js state", this.state.movies)
    return (
      <div className='App'>
      <div className="header-container">
         <img className="logo" alt="logo" src="https://unothegateway.com/wp-content/uploads/2016/03/movie-reel.png"/>
       </div>
        <SearchBox
          placeholder={ 'search..' }
          handleChange={ this.handleChange }
        />
       {((loading === true) ?
            <LoadingSpinner />
            :
        <MovieList movies={movies}/>
       )}
      </div>
    );
  }
}

export default App;
