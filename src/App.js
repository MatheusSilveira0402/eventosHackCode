import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import store from '../src/store/';
import { Provider } from 'react-redux';

/* Paginas*/
import login from './view/login';
import Home from "./view/home";
import cadastro from './view/cadastro';
import recuperarSenha from "./view/recuperarSenha";
import cadastroEventos from "./view/cadastroEventos";


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/' component={Home} />
        <Route exact path='/cadastrar' component={cadastro} />
        <Route exact path='/login' component={login} />
        <Route exact path='/recuperar' component={recuperarSenha} />
        <Route exact path='/cadastrarEventos' component={cadastroEventos} />
      </Router>
    </Provider>  
  );
}

export default App;
