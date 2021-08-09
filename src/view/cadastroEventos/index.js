/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import './cadastroEventos.css';
//import { Link } from 'react-router-dom';
import Firebase from '../../config/firebase';
import Navbar from '../../components/navbar/';
import { useSelector } from 'react-redux';


function cadastroEventos(){
    
    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [titulo, setTitulo] = useState();
    const [tipo, setTipo] = useState();
    const [detalhes, setDetalhes] = useState();
    const [data, setData] = useState();
    const [hora, setHora] = useState();
    const [foto, setFoto] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    const storage = Firebase.storage();
    const db = Firebase.firestore();

    

    function cadastrarEvents(){
        setCarregando(1);
        
        storage.ref(`imagens/${foto.name }`).put(foto).then(() => {
            db.collection('eventos').add({
                titulo: titulo,
                tipo: tipo,
                detalhes: detalhes, 
                data: data,
                hora: hora,
                usuario: usuarioEmail,    
                visualizacoes: 0,
                foto: foto.name,
                publico: 1,
                criacao: new Date()

                }).then(() => {
                    setMsgTipo('sucesso');
                    setCarregando(0);
            }).catch(err =>{
                setMsgTipo('err');
                setCarregando(0);
            });
        });
    }

    return(
        <>
        <Navbar/>
        <div className="col-12 cssdiv ">
            <div className="row">
                <h3 className="mx-auto font-weight-bold mt-2">Novo Evento</h3>
            </div>
            <form>
                <div className="form-group">
                    <label>Titulo:</label>
                    <input onChange={(e) => setTitulo(e.target.value)}  type="text" className="form-control"/>
                </div>

                <div className="form-group">
                    <label>Tipo do Evento:</label>
                    <select defaultValue="--- Selecione um tipo ---" onChange={(e) => setTipo(e.target.value)} className="form-control">
                        <option disabled>--- Selecione um tipo ---</option>
                        <option>Shows</option>
                        <option>Hacking Ético</option>
                        <option>Desafios</option>
                        <option>Encontros online</option>
                        <option>Jogar Online</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Descrição:</label>
                    <textarea onChange={(e) => setDetalhes(e.target.value)} className="form-control" rows="3"/>
                </div>

                <div className="form-group row">
                    <div className="col-6">
                        <label>Data:</label>
                        <input onChange={(e) => setData(e.target.value)} type="date" className="form-control"/>
                    </div>

                    <div className="col-6">
                        <label>Hora:</label>
                        <input onChange={(e) => setHora(e.target.value)} type="time" className="form-control"/>
                    </div>
                </div>

                <div className="form-group">
                    <label>Upload do banner:</label>
                    <input onChange={(e) => setFoto(e.target.files[0])} type="file" className="form-control"/>
                </div>
                <div className="row">
                    {
                        carregando > 0 ? <div class="spinner-border text-danger mx-auto"></div>
                        : <button onClick={cadastrarEvents} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Publicar Evento</button>
                    }
                </div>
                <div className="msg-login text-white text-center mt-5">
                    {msgTipo === "sucesso" && <span><strong>WoW!</strong> Evento Publicado &#128541;</span>}
                    {msgTipo === "err" && <span><strong>Ops!</strong> Não foi possivél publicar o evento! &#128543;</span>}
                  
                </div>
            </form>
        </div>
        </>
    )
}

export default cadastroEventos;