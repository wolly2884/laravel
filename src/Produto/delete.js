import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Update() {
 
    const [status,setStatus] = useState('');
    const { id } = useParams();
    const [produto,setProduto] = useState({});
    const navigate = useNavigate();

    // Código colocado no UseEffect é execucato após montagem deste componente
    useEffect( ()=>{

        async function consultar(){
            console.log(id)
            // Consulta a API
            const resposta = await axios.get(`http://localhost:8000/api/produto/${id}`)
            // Armazena resposta no useState
            setProduto(resposta.data)
            console.log(resposta)
        }

        consultar();

    } , []  )

    return(
        <div>
            <dl>
                <dt>Descrição</dt>
                <dd>{produto.descricao}</dd>
                <dt>Preço</dt>
                <dd>{produto.preco}</dd>
            </dl>
            <button onClick={()=>{excluir()}}>Confirma</button>
            <p>{status}</p>
            <Link to='/Produto'>Voltar</Link>
        </div>
    )

    // Chamada a função da API
    async function excluir(){
        try{
            // Chama função da API enviando o json com os dados do novo objeto
            const resposta = await axios.delete(`http://localhost:8000/api/produto/${id}`);
            setStatus("Exclusão realizada");
            console.log(resposta); // pressione F12 e no console veja o que veio da API no backend
            navigate("/produto")
        } catch(erro) {
            setStatus(`Falha: ${erro}`);
        }
    }

}
export default Update