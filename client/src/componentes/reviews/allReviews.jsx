import React, { useEffect, useState } from 'react'
import Axios from "axios";
import Reviews from "./reviews";
import Stars from "./stars/stars";
import { useSelector } from "react-redux";
import PostReview from "./postReview";

import "./style/allReviews.css";


export default function AllReviews({ id }) {
    const [reviews, setReviews] = useState({ res: null, isLoaded: false })
    const [promedio, setPromedio] = useState({ res: null, isLoaded: false })
    const usuarioLogin = useSelector((state) => state.usuario);
    const [comentario, setComentario] = useState({ text: "" });
    const [rating, setRating] = useState({ number: "0" });
    const [checkedUsuario, setCheckedUsuario]=useState({res:null, isSet:false})


    useEffect(() => {
        Axios.get(`http://localhost:3001/producto/${id}/review`).then(revs=>{
            setReviews({res:revs.data, isLoaded:true})
        }) 
        Axios.get(`http://localhost:3001/producto/${id}/reviewprom`).then((respuesta) => {
            setPromedio({ res: respuesta.data, isLoaded: true })
        })
    

    }, [id])
    useEffect(()=>{
        if(reviews.isLoaded){
          
        const check=checkUsuarioPost()
        setCheckedUsuario({res:check, isSet:true})}
    },[reviews])
    const handleCick = () => {
        let review = {
            commentary: comentario.text,
            qualification: rating.number,
            usuarioId: usuarioLogin.id,
        }
        Axios.post(`http://localhost:3001/producto/${id}/review`, review).then(()=>{
            Axios.get(`http://localhost:3001/producto/${id}/review`).then((respuesta)=>{
                setReviews({res:respuesta.data, isLoaded:true})
            })
            Axios.get(`http://localhost:3001/producto/${id}/reviewprom`).then((respuesta) => {
                setPromedio({ res: respuesta.data, isLoaded: true })
            })
        }) 
        }
    const onStarClick = (nextValue, prevValue, name) => {
        setRating({ number: nextValue.toString() })
    }
    const checkUsuarioPost=()=>{
        let res;
        if (reviews.isLoaded){
            if(usuarioLogin.id===0){
                res=true
            }else {
        reviews.res.forEach((review)=>{
            if(review.usuarioId.toString() ===usuarioLogin.id.toString() ){
                res= true;
            }else{
                res= false;
            }
        })   }
        return !!res;
    }
    }
    if(reviews.isLoaded){
    if(usuarioLogin.id === 0 && reviews.res.length===0){
        return <></>
    }
}
    return (
        
        <div className="allReviews">
            {checkedUsuario.isSet && checkedUsuario.res? <></> :
                <PostReview
                    handleCick={handleCick}
                    setComentario={setComentario}
                    onStarClick={onStarClick}
                    rating={rating}
                />}
            <div className="promedio">
                {promedio.isLoaded && ~~promedio.res!==0?
                    <div>
                    
                        <h3>Opiniones sobre Este producto</h3>

                        <h1>{~promedio.res>=5?~promedio.res:Math.round(promedio.res)} estrellas</h1>

                        <Stars
                            calificacion={Math.round(promedio.res)}
                            size={35}
                        />
                    </div> :<></>
                }
                {reviews.isLoaded && ~~promedio.res!==0 ?
                    <p>Promedio entre {reviews.res.length} </p> : <></>
                }
            </div>
            {reviews.isLoaded ?
                <div>
                    {reviews.res.map((review, i) => {
                        return (
                            <Reviews
                                review={review}
                                key={i}
                                usuarioLoginId={usuarioLogin.id}
                                productoId={id}
                                setReviews={setReviews}
                                setPromedio={setPromedio}
                            />
                        )
                    })
                    }
                </div>
                : <></>}
        </div>
    )

}