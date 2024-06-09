import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import './style.css'

function Produto() {
 
    const [json,setJson] = useState([])

    // Código colocado no UseEffect é execucato após montagem deste componente
    useEffect( ()=>{

        async function consultar(){
            // Consulta a API
            const resposta = await axios.get("http://localhost:8000/api/produto")
            // Armazena resposta no useState
            setJson(resposta.data)
            console.log(resposta.data) // pressione F12 e no console veja o que veio da API no backend
        }

        consultar();

    } , []  )

    return(
        <div className='corpo'>
            <Link to='/ProdutoCreate'>Novo Produto</Link>
            <table>
                <thead><tr><th>Texto</th></tr></thead>
                <tbody>
                    {json.map( 
                        (x) => <tr key={x.id}>
                                <td>{x.descricao}</td>
                                <td>{x.preco}</td>
                                <td>
                                    <Link to={"/ProdutoUpdate/" + x.id}>Alterar</Link>
                                    &nbsp;
                                    <Link to={"/ProdutoDelete/" + x.id}>Excluir</Link>
                                </td>
                            </tr> )
                    }
                </tbody>
            </table>
            <Link to="/">Voltar</Link>
        </div>
    )
}
export default Produto