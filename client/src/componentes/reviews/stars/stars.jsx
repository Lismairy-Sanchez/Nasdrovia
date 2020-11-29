import React from 'react'
import StarRatingComponent from 'react-star-rating-component';

export default function Stars({calificacion, size}){

    return (
        <div className="stars" style={{fontSize: `${size}px`}}>
            <StarRatingComponent
                name={"Calificacion"}
                value={calificacion}
                editing={false}
                starColor={"#ff0000"}
            />
        </div>
    )
}