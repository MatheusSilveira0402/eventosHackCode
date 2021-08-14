import React, {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import './eventoCard.css';
import Firebase from '../../config/firebase';




function EventoCard({id, img, titulo, detalhes, visualizacoes}){
    
    const [urlImage, setUrlImage] = useState();


    useEffect(()=>{
        Firebase.storage().ref(`imagens/${img}`).getDownloadURL().then(url => setUrlImage(url));
    });
    return(
        <div className="card text-white">
            
            <img src={urlImage} className="card-img-top img-cartao" alt="Imagem do Evento" />

            <div className="card-body">
                <h5>{titulo}</h5>
                <p className="card-text text-justify">{detalhes}</p>
                <div className="row rodape-card d-flex align-items-center">
                    <div  className="col-6">
                        <Link to={"/eventosdetalhes/" + id} className="btn btn-sm btn-detalhes">+ detalhes</Link>
                    </div>                
                    <div  className="col-6 text-right">
                        <span>{visualizacoes} </span><i className="fas fa-eye view"></i>
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}


export default EventoCard;



