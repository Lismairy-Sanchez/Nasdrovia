import React, {useState, useEffect} from 'react'
import Productos from "./Categoria"
import Axios from 'axios';

export default function Shop(){
    const [data, setData]= useState([]);
    const [productos, setProductos] = useState({res:null, isLoaded:false})
    const [cat, setCat] = useState({res:null, onLoad:false});
    useEffect(() => {
        Axios.get('http://localhost:3001/producto').then(data =>{
        setData({
            res:data.data,
            isLoaded:true,
        })
            }).catch(error => 
            console.log(error));
        Axios.get('http://localhost:3001/categorias').then(data=>{
            setCat({
            res:data.data.map(e=>{
                e.select=false;
                return e
            }),
            isLoaded:true,
            })
        })
    }, []);
    useEffect(()=>{
        if(data.isLoaded){
            setProductos(data);
        }
    },[data])
    return (
        <Productos
        productos={productos}
        cat={cat}
        setCat={setCat}
        setProductos={setProductos}
        data={data}/>
    )
}