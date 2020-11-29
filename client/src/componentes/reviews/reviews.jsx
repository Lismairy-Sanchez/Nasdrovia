import React, {useState} from 'react'
import Stars from "./stars/stars";
import Comentarios from "./comentario/comentario";
import Axios from "axios";
import EditAlert from "./editAlert";
import "./style/reviews.css"

export default function ({review, usuarioLoginId, productoId, setReviews, setPromedio}){
    const[displayEdit, setDisplayEdit]=useState(false);
    const handleDelete=()=>{
        ///:id/review/:idReview
        Axios.delete(`http://localhost:3001/producto/${productoId}/review/${review.id}`).then(()=>{
            Axios.get(`http://localhost:3001/producto/${productoId}/review`).then((respuesta)=>{
                setReviews({res:respuesta.data, isLoaded:true})
            })
            Axios.get(`http://localhost:3001/producto/${productoId}/reviewprom`).then((respuesta) => {
                setPromedio({ res: respuesta.data, isLoaded: true })
            })
        })
    }
    const handleEdit=(e)=>{
        setDisplayEdit(!displayEdit);
    }
    const {commentary, qualification, usuarioId}=review;
    return (
        <div className="Reviews-Component-css">
        <div className="calificacion-review-css">
        <Stars calificacion={qualification} size={35}/>
        </div>
        <div className="comentario-review-css">
        <Comentarios comentario={commentary}/>
        </div>
        {usuarioLoginId === usuarioId?
        <div>
        <div className="delete-review-css" onClick={handleDelete}>
        <i className="fas fa-trash" style={{color: '#3c3c3c',backgroundColor: '#fff',fontSize: '20px'}}></i>
        </div>
        <div className="edit-review-css" onClick={handleEdit}>
        <i className="fas fa-edit" style={{color: '#3c3c3c',backgroundColor: '#fff',fontSize: '20px'}}></i>
        </div>
        </div>
        :<></>}

        {
            displayEdit?
            <div className="editDisplay-css">
            <EditAlert 
            setDisplayEdit={setDisplayEdit}
            comentario={commentary}
            calificacion={qualification}
            reviewId={review.id}
            productoId={productoId}
            setReviews={setReviews}
            setPromedio={setPromedio}
            />
            </div>:
            <></>
            
        }
        </div>
    )
}