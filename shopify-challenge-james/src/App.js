import React, { Component } from 'react';

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
    if (prevSearch !== searchState) {
      // this.setState({loading:true})
      const movies = await axios.get(`https://www.omdbapi.com/?t=${searchState}&apikey=b261581a`)

      this.setState({ ...this.state, movies: [movies.data], prevSearchState: this.state.searchField, loading: false })
    }
    if (this.state.searchField === '') {
      this.setState({ ...this.state, searchField: 'goonies' })
    }
  }


  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  }

  nominate = () => {
    const nominated = this.state.nominated.slice(0);
    const movieNoms = this.state.movies;
    const combined = new Set(nominated.concat(movieNoms))
    const backToArray = [...combined]

    if(backToArray.length !== 6){
    this.setState({
      nominated: backToArray,
    })
  }
  }

  nomBanner = () => {
    let array = this.state.nominated;
    var count = array.length + 1
    if (count === 5) {
      this.setState({
        nomMax: true
      })
    }
  }

  clearNoms = () => {
    this.setState({
      nominated: [],
      nomMax: false
    })
  }
  clearThisNom = (Poster) => {
    let array = this.state.nominated;
    const newList = array.filter((item) => item.Poster !== Poster);
    this.setState({
      nominated: newList,
      nomMax: false
    })
  }



  render() {
    const { movies, loading, nomMax } = this.state;
    return (
      <div className='App'>
        <div className="nominated">
              <h1>Your Nominations</h1>
              <div className="clearNomDiv">
              <button className="clearNomButton" onClick={() => {this.clearNoms()}}>Clear Nominations</button>
              </div>
              {this.state.nominated.map((nom, index) => (
                <div className="nom-item-container" key={index}>
                  <img className="nom-avatar" alt="poster" src={nom.Poster} />
                  <h4>{nom.Title}</h4>
                  <button className="clear-this-nom" onClick={() => this.clearThisNom(nom.Poster)}>x</button>
                </div>
              ))}
            </div>
        
        <SearchBox
          placeholder={'search..'}
          handleChange={this.handleChange}
        />
        {((loading === true) ?
          <LoadingSpinner />
          :
          
          <div>
            {((nomMax === true) ?
          <div className="banner-complete">Nominations Complete!</div>
          :
          <div></div>
        )}
            <button className="movie-button" onClick={() => {
              this.nominate();
              this.nomBanner()
            }}>
              <MovieList movies={movies} />
            </button>
            
          </div>
        )}
        
      </div>
    );
  }
}

export default App;
