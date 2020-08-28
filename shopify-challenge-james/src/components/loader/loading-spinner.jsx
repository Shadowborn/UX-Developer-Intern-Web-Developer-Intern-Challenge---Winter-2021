import React from 'react';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import "./loader.css"

const LoadingSpinner = () => (
    <div className='loader-div'>
        <Loader type="Puff" height={80} width={80} color='cyan' />
        <h3 className='loading-message'>Loading Stocktwits...</h3>
    </div>
)

export default LoadingSpinner;