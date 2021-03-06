import React from 'react';
import './card.styles.css'

export const Movie = (props) => (
    <div className="card-container"> 
    <div className="select-header">Select to Nominate</div>
        <img className="avatar" alt="poster" src={props.movie.Poster}/>
    <div className="card-header">
        <h1 className="card-name">{ props.movie.Title }</h1>
        <h1 className="card-name">{ props.movie.Released }</h1>
    </div>
        <p>{ props.movie.Plot }</p>
    </div>
);
