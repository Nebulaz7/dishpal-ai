import React from "react";

import './ImageCard.css';

        
            const ImageCard = ({ source, title, about, timestamp  }) => {
if (!source) return null;

 return (
     <>
      <div className="card">
        <img src={source}  alt="recipe" />
        <div className="container">
         <h3>{title}</h3>
         <p>{about}</p>
         <p><i>{timestamp}</i></p>
         </div>
      </div>
     </>
 );
};

export default ImageCard;