import { useEffect, useState } from "react"
import { getAllCharacters } from "../servicios/rymService";
import { Modal, Box, Typography } from '@mui/material';
import './estilo.css'




export default function RickAndMorty(){

    
    //let totalPagina=1;
    const [data, setData]=useState([]);
    const [actual, setActual] =useState(1);
    const [paginacion, setPaginacion] =useState([1]);
    const [selectedCharacter, setSelectedCharacter]=useState([null]);
    const apiUrl="https://rickandmortyapi.com/api"

useEffect(()=>{
    
    async function fetchData() {
        const url = apiUrl + `/character/?page=${actual}`;
        let response=await getAllCharacters(url);
        console.log(response);
        setData(response.results);//results es una propiedad del objeto
        setPaginacion(response.info.pages);
        
    }
    fetchData();



},[actual]);


const handleOpenModal = (character) => {
    setSelectedCharacter(character);
};

const handleCloseMOdal =()=>{
    setSelectedCharacter(null);
}


const BoxModal=({character, open, onClose})=>{
    if(!character) return null;
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 3,
      };

      return(
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <button className="btnCerrar" onClick={()=>handleCloseMOdal()}>X</button>
            <Typography variant="h4" component="h2" style={{textAlign:'center'}}>
    {character.name}
    </Typography>
    <Typography sx= {{mt: 2}}>
    <strong>Status:</strong> {character.status}
    </Typography>
    <Typography sx= {{mt: 1}}>
    <strong>Especie:</strong> {character.species}
    </Typography>
    <Typography sx= {{mt: 1}}>
    <strong>Genero:</strong> {character.gender}
    </Typography>
    <img src={character.image} style={{textAlign: 'center', height:'60%', width: '60%', marginTop: '2rem', marginLeft: '2.5rem'}}/>
    
            </Box>
        </Modal>
      )

}



return(
    <div className="container">
        <h1>Lista de Personajes</h1>
        <div className="personaje-grid">
            
        <ul>
        {
                data.map((element)=>(
                    
                    <li key={element.id}>
                        
                        <h3>{element.id}</h3>
                        <img src={element.image} style={{cursor:'pointer'}} onClick={()=>handleOpenModal(element)}/>
                        <h2>{element.name}</h2>
                        <p><strong>Status</strong>: {element.status}</p>
                        <p><strong>Especie</strong>: {element.species}</p>
                        <p><strong>Tipo</strong>: {element.type}</p>
                        <p><strong>Genero</strong>: {element.gender}</p>
                        <p><strong>Origen</strong>: {element.origin.name}</p>
                        <button className="btnDetalle" onClick={()=>handleOpenModal(element)}>Detalle</button>
                        </li>
                
                    
                ))
            }
            </ul>
            
            </div>
            <BoxModal
        character={selectedCharacter}
        open={!!selectedCharacter}
        /* onClose={handleCloseMOdal} */
        />
        <div className="paginacion">
            <button onClick={()=>setActual(1)} disabled={actual===1}>Primera página</button>
            <button onClick={()=>setActual(actual-1)} disabled={actual===1}>Anterior</button>
            <button onClick={()=>setActual(actual+1)} disabled={actual===paginacion}>Siguiente página</button>
            <button onClick={()=>setActual(paginacion)} disabled={actual===paginacion}>Ultima página</button>
            <p>Pagina: {actual}</p>
        </div>
    </div>
    
)
}