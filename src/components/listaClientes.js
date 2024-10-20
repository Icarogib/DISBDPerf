import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClienteList = () => {
    const [clientes, setClientes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get('http://localhost:3001/cliente');
                setClientes(response.data); // Atualiza o estado com os clientes
            } catch (err) {
                console.error('Erro ao listar clientes:', err);
                setError('Erro ao listar clientes. Tente novamente.'); // Atualiza o estado de erro
            }
        };

        fetchClientes(); // Chama a função ao montar o componente
    }, []); // O array vazio significa que o efeito roda apenas uma vez, quando o componente é montado

    return (
        <div>
            <h1>Lista de Clientes</h1>
            {error && <p>{error}</p>} {/* Exibe mensagem de erro, se houver */}
            <ul>
                {clientes.map(cliente => (
                    <li key={cliente.id}>
                        {cliente.nome} - {cliente.email} {/* Exibe nome e email do cliente */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClienteList;
