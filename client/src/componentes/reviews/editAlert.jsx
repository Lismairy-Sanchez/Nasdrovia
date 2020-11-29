import React from 'react'
import { useState, useEffect } from 'react'
import StarRatingComponent from 'react-star-rating-component';
import Axios from "axios";
import './style/editAler.css'
import anime from "animejs";

export default function EditAlert({setDisplayEdit, comentario, calificacion, reviewId, productoId, setReviews, setPromedio}){
    const[editedComment, setEditedComment]= useState(comentario);
    const[editedStars, setEditedStars]= useState(calificacion)
    useEffect(()=>{
        anime({
            targets:'.containerWindow-editAlert-css',
            opacity:1,
            duration:2800,
            delay:1,
        })
        return ()=>{
            anime({
                targets:'.containerWindow-editAlert-css',
                opacity:0,
            })
        }
    },[])
    const onStarClick = (nextValue, prevValue, name) => {
        setEditedStars(nextValue.toString())
    }

    const handleChange = (e) => {
        setEditedComment(e.target.value)
    }

    const submitFunction=()=>{
        let review = {
            commentary: editedComment,
            qualification: editedStars,
    }
    Axios.put(`http://localhost:3001/producto/${productoId}/review/${reviewId}`, review).then(res=>{
    setDisplayEdit(false)
    console.log(res)
    Axios.get(`http://localhost:3001/producto/${productoId}/review`).then((respuesta)=>{
        setReviews({res:respuesta.data, isLoaded:true})
    })
    Axios.get(`http://localhost:3001/producto/${productoId}/reviewprom`).then((respuesta) => {
        setPromedio({ res: respuesta.data, isLoaded: true })
    })

    })
}
    return (
        <div className="containerWindow-editAlert-css">
        <div className="closeWindow-css" onClick={()=>setDisplayEdit(false)}>
        <i className="fas fa-window-close" style={{color: '#3c3c3c',backgroundColor: '#fff',fontSize: '20px'}}></i>
        </div>
        <div onClick={()=>{
            setEditedStars(0)
            setEditedComment('')
            }}
            className="reset-button-css"
            >
            <p> reset</p>
            </div>
        <div className="star-container-css" style={{fontSize: 35}}>
        <StarRatingComponent 
                name="submit"
                onStarClick={onStarClick}
                value={editedStars}
                starColor={"#ff0000"}
            />
        </div>
        <textarea 
        className="textArea-css"
        type="text"
        onChange={handleChange}
        style={{width:"80vw", height:"12vh", size:200}}
        maxLength="1000"
        value={editedComment}>
        </textarea>
        <div className="button-review-css">
            <button className="submitbtn-css" onClick={submitFunction}>
                Editar comentario
            </button>
        </div>
        </div>
    )
}