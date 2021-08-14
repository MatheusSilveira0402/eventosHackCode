import React, {useEffect, useState} from 'react';
import './home.css';
import Firebase from '../../config/firebase'
import Navbar from '../../components/navbar';
import EventoCard from '../../components/eventoCard';

//key={item.id} 

function Home(){

    const [pesquisa, setPesquisa ] = useState('');
    const [eventos, setEventos] = useState([]);
    let listaeventos = [];

    useEffect(() => {
        Firebase.firestore().collection('eventos').get().then(async (result) => {
            
            await result.docs.forEach(doc =>{
                if(doc.data().titulo.indexOf(pesquisa) >= 0){
                    listaeventos.push({
                        id: doc.id,
                        ...doc.data()
                    });
                }
            });

            setEventos(listaeventos)
        });
    });

    return(
        <>
        <Navbar/>
        <div className="row p-5">
            <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="form-control" placeholder="Pesquisar evento pelo título..."/>

        </div>  
       
        
        <div className="row p-3 ">
          {eventos.map(item => <EventoCard id={item.id} img={item.foto} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes} />)}
        </div>
        </>
    )

}

export default Home;