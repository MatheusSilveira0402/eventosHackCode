/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import './recuperarSenha.css';
import Navbar from '../../components/navbar/';


import Firebase from '../../config/firebase';
import 'firebase/auth';


function recuperarSenha(){
    
    
    const [email, setEmail] = useState();
    const [msg, setMsg] = useState();

    function recuperar(){
        Firebase.auth().sendPasswordResetEmail(email).then( results  => {
            setMsg('Enviamos um link no seu email para você redefinir sua senha!');
        }).catch(err =>{
            setMsg('Verifique se o email está correto!');
        })
    }

    return(
        <>
            <Navbar />
            <div className="form-recuperar">
                <div className="d-flex align-content-center p-5">
                    <form className="text-center form-login mx-auto mt-5">
                    
                        <h3 className="mb-3 h3 font-weight-bold mt-5">Recuperar Senha</h3>
                        <input onChange={(e)=> setEmail(e.target.value)} type="email" className="form-control  input my-2" placeholder="Email"/>
                        <div className="msg my-4 text-center">
                            <span className="text-white">{msg}</span>
                        </div>

                        <button onClick={recuperar} type="button"className="btn btn-lg btn-block btn-enviar">Recuperar Senha</button>
                    
                    </form>
                </div>
            </div>

        </>
    )
    
}

export default recuperarSenha;