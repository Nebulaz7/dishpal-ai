import React from 'react';
import LoadingGifImage from './LoadingGif.gif';

const LoadingGif = () => {
  return (
    <p>
    <img src={LoadingGifImage} alt="Loading"/>
    </p>
  );
};

export default LoadingGif;