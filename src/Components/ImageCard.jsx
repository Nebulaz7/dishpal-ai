import React from "react";

import './ImageCard.css';

const ImageCard = ({ source, title, about }) => {
if (!source) return null;

 return (
     <>
      <div className="card">
        <img src={source}  alt="recipe" />
        <div className="container">
         <h3>{title}</h3>
         <p>{about}</p>
         </div>
      </div>
     </>
 );
};

export default ImageCard;