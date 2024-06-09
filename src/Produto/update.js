import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';

function Update() {
 
    const [status,setStatus] = useState('');
    const { id } = useParams();
    const [produto,setProduto] = useState({});

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
            <form onSubmit={gravar} className='formulario'>
                <div>
                    Descrição: <input value={produto.descricao} type="text" required onChange={ (e)=>setProduto({...produto,descricao:e.target.value}) }/>
                </div>
                <div>
                    Preço: <input value={produto.preco} type="text" required onChange={ (e)=>setProduto({...produto,preco:e.target.value}) }/>
                </div>
                <div>
                    <button type='submit'>Enviar</button>
                </div>
            </form>
            <p>{status}</p>
            <Link to='/Produto'>Voltar</Link>
        </div>
    )

    // Chamada a função da API
    async function gravar(e){
        e.preventDefault(); // cancela o submit
        try{
            // Chama função da API enviando o json com os dados do novo objeto
            const resposta = await axios.put(`http://localhost:8000/api/produto/${id}`,produto);
            setStatus("Alteração realizada");
            console.log(resposta); // pressione F12 e no console veja o que veio da API no backend
        } catch(erro) {
            setStatus(`Falha: ${erro}`);
        }
    }

}
export default Update