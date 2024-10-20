import logo from './logo.svg';
import './App.css';

import React from 'react';
import ClienteList from './components/listaClientes'; // Ajuste o caminho conforme necessário

function App() {
    return (
        <div>
            <ClienteList /> {/* Renderiza o componente de lista de clientes */}
        </div>
    );
}

export default App;

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
