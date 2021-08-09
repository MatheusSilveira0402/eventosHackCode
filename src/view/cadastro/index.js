/* eslint-disable default-case */
import React, { useState } from 'react';
import Firebase  from '../../config/firebase';
import 'firebase/auth';
import './cadastro.css';
import Navbar from '../../components/navbar/';


function  UserNew(){

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();


    function cadastrar(){
        setCarregando(1);
        setMsgTipo(null);

        if(!email || !senha){
            setMsgTipo('err');
            setMsg('Você precisa informar o email e senha para fazer cadastro!')
            setCarregando(0);
            return;
        }

        Firebase.auth().createUserWithEmailAndPassword(email,senha).then(resultado => {
            setCarregando(0);
            setMsgTipo('sucesso');
        }).catch(err => {
            setCarregando(0);
            setMsgTipo('err');

            console.log(err.message)
            switch(err.message){

                case 'Password should be at least 6 characters':
                    setMsg('A senha deve ter pelo menos 6 caracteres!');
                    break;
                
                case 'The email address is already in use by another account.':
                    setMsg('Este email ja está sendo utilizado por outro usuário!');
                    break;
                
                case 'The email address is badly formatted.':
                    setMsg('O formato do seu email é inválido!');
                    break;  
                default:
                    setMsg('Não foi possivel cadastrar. Tente novamente mais tarde!')
                    break;

                
            }
            
        })

    }

    return(
        <>
        <Navbar/>
            <div className="login-content d-flex align-items-center">
                <form className="form-signin mx-auto form-cadastro">
                    <h1 className="h3 mb-3 front-weigth-bold hoveh1">Cadastro</h1>
                    
                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control input-cadastro my-2" placeholder="Email" />
                    <br/>
                    <input onChange={(e) => setSenha(e.target.value)} type="password" className="form-control input-cadastro my-2" placeholder="Senha" />
                    <br/>
                    {
                        
                        carregando ? <div class="spinner-border text-danger"></div>
                        : <button onClick={cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Cadastrar</button>
                                        
                    }

                    <div className="msg-login text-white text-center mt-5">
                        {msgTipo === "sucesso" && <span><strong>WoW!</strong> Usuário cadastrado com sucesso! &#128541;</span>}
                        {msgTipo === "err" && <span><strong>Ops!</strong> {msg} &#128543;</span>}
                    
                    </div>
                </form>
            </div>
        </>
    )
}

export default UserNew;