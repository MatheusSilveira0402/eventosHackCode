import React, { useState } from 'react';
import './login.css';
import { Link, Redirect } from 'react-router-dom';
import Firebase from '../../config/firebase';
import 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';


function Login(){
    
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();

    const dispatch = useDispatch();

    function Logar(){


        Firebase.auth().signInWithEmailAndPassword(email, senha).then(result => {
            setMsgTipo('sucesso');
            setTimeout(() =>{
                dispatch({type: 'LOG_IN', usuarioEmail: email});
            },2000);
            
        }).catch(err => {
            setMsgTipo('err') 
        });

    }


    return(
        <div className="login-content d-flex align-items-center">
            
            {useSelector(state => state.usuarioLogado) > 0 ? <Redirect to='/'/> : null}
            
            <form className="form-signin mx-auto">
                <i className="fab fa-linux col fa-5x" ></i>
                <br/>
                <br/>
                <h1 className="h3 mb-3 font-weight-normal text-login font-weight-bold">Login</h1>

                <div className="form-label-group">
                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="inputEmail" placeholder="Email" />
                </div>
                <br/>
                <div className="form-label-group">
                    <input onChange={(e) => setSenha(e.target.value)}  type="password" className="form-control" id="inputPassword" placeholder="Senha" />
                </div>
                <br/>
                <button onClick={Logar}className="btn btn-lg btn-block btn-login font-weight-bold" type="button">Logar</button>

                <div className="msg-login text-white text-center mt-5">
                    {msgTipo === "sucesso" && <span><strong>WoW!</strong> Você está conectado! &#128541;</span>}
                    {msgTipo === "err" && <span><strong>Ops!</strong> Verifique se a senha ou usuário estão corretos! &#128543;</span>}
                  
                </div>

                <div className="opcoes-login mt-5" >
                    <Link to='recuperar' className="mx-2">Recuperar Senha</Link>
                    <span>&#9760;</span>
                    <Link to='cadastrar' className="mx-2">Quero Cadastrar</Link>
                </div>
            </form>
        </div>  
    );

}

export default Login;

