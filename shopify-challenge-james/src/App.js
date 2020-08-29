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
      movies: [],
      nominated: [],
      searchField: 'goonies',
      prevSearchState: '',
      loading: true,
      nomMax: false,
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
    if(this.state.searchField === ''){
      this.setState({...this.state, searchField: 'goonies'})
    }
  }


  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  }

  nominate = () => {
    const nominated = this.state.nominated.slice(0);
    const movieNoms = this.state.movies;

    //Is push causing the mapping issue? Does .push return the length of the array and not the array itself?
    // nominated.push({
    //   movieNoms
    // })

    const combined = nominated.concat(movieNoms)

    this.setState({
      nominated: combined,
    })
    console.log("Nominated function 2", nominated)
  }

  nomBanner = () => {
    let array = this.state.nominated;
    var count = array.length + 1
    if (count === 5){
      this.setState({
        nomMax: true
      })
      console.log("Max met")
      console.log(this.state.nomMax)
    }
  }


  render() {
    const { movies, loading, nomMax, searchField } = this.state; 
      // console.log("Movies", movies)
      // console.log("App js state", this.state.movies)
      console.log("Nominated state", this.state.nominated)
    return (
      <div className='App'>
      <div className="header-container">
         {/* <img className="logo" alt="logo" src="https://unothegateway.com/wp-content/uploads/2016/03/movie-reel.png"/> */}
       </div>

        {/* <button onClick={ this.nominate }>Nominate</button> */}
        <SearchBox
          placeholder={ 'search..' }
          handleChange={ this.handleChange }
        />
       {((loading === true) ?
            <LoadingSpinner />
            :
        <div>
        <button className="movie-button" onClick={() => {
           this.nominate();
           this.nomBanner() }}>
        <MovieList movies={movies} />
        </button>
        <div className="nominated">
         <h1>Your Nominations</h1>
         {this.state.nominated.map((nom, index) => (
            <div className="nom-item-container" key={index}>
              <img className="nom-avatar" alt="poster" src={nom.Poster}/>
              <h4>{nom.Title}</h4>
            </div>
        ))}
       </div>
        </div>
       )}
       {((nomMax === true) ?
            <div className="banner-complete">Nominations Complete!</div>
            :
            <div></div>
       )}
      </div>
    );
  }
}

export default App;
