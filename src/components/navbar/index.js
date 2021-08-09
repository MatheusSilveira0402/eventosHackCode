import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import image from './console.png';
import { useSelector, useDispatch } from 'react-redux';



function Navbar(){

    const dispatch = useDispatch();

    return(
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <img className="logo" src={image} alt="" />
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars text-white"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link ml-2" aria-current="page" to="/">Home</Link></li>
                        {
                            useSelector(state => state.usuarioLogado) > 0 ? 
                        <>
                            <li className="nav-item"><Link className="nav-link" aria-current="page" to="cadastrarEventos">Publicar Eventos</Link></li>
                            <li className="nav-item"><Link className="nav-link" aria-current="page" to="">Meus Eventos</Link></li>
                            <li className="nav-item"><Link className="nav-link" aria-current="page" onClick={() => dispatch({type: 'LOG_OUT'}) }>Sair</Link></li>
                        </>
                        :
                        <>
                            <li className="nav-item"><Link className="nav-link" aria-current="page" to="cadastrar">Cadastrar</Link></li>
                            <li className="nav-item"><Link className="nav-link" aria-current="page" to="login">Login</Link></li>
                        </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;