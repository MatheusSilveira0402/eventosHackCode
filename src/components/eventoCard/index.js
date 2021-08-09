import React, {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import './eventoCard.css';



function EventoCard(){
    return(
        <div className="col-md-3 col-sm-12 mt-5">
            <img id="banner-evento" src="https://via.placeholder.com/150" className="card-img-top img-cartao" alt="Imagem do Evento" />

            <div className="card-body">
                <h5>Titulo do Evento</h5>
                <p className="card-text text-justify">Detalhes do Evento </p>

                <div className="row rodape-card d-flex align-items-center">
                    
                    <div  className="col-6">
                        <Link to="/" className="btn btn-sm btn-detalhes">+ detalhes</Link>
                    </div>
                
                    <div  className="col-6 text-right">
                        <span>204 </span><i className="fas fa-eye"></i>
                    </div>
                </div>
            </div>



        </div>
    )
}


export default EventoCard;



