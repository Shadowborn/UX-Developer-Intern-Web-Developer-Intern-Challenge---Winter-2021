import React from 'react';
import { Movie } from '../card/movie-card';
import './card-list.styles.css';



export const MovieList = (props) => (
    <div className="card-list"> 
        {props.movies.map(movie => (
            <Movie key={movie.Title} movie={movie}/>
        ))}
    </div>
);