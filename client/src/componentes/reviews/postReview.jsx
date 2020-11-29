import React, {useState} from 'react'
import StarRatingComponent from 'react-star-rating-component';
import "./style/allReviews.css";


export default function PostReview({setComentario,handleCick, onStarClick, rating}){
    const handleChange = (e) => {
        setComentario({ text: e.target.value })
    }

    return (
        <div>
        <h3>¡tu opinión nos importa!</h3>
        <div className="star-container-css" style={{fontSize: 35}}>
        
            
        <StarRatingComponent 
                name="submit"
                onStarClick={onStarClick}
                value={parseInt(rating.number)}
                starColor={"#ff0000"}
            />
        </div>
        <form action="Submit-Review" >
            <textarea type="text" onChange={handleChange} style={{width:"80vw", height:"12vh", size:200}} maxLength="12000"/>
            
        </form>
        <button className="submitbtn-css" onClick={handleCick}>
            Recomendar
        </button>
        </div>
    )
}