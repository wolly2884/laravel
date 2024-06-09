import axios from 'axios';
import {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import './style.css';

function Store()
{
    // Para apresentar ao usuáro o resultado da operação
    const [status,setStatus] = useState('');
    // Para armazenar dados digitados pelo usuário
    const descricao = useRef("");
    const preco = useRef(0);
    // Formulário para coleta dos dados do novo objeto
    return(
        <div>
            <form onSubmit={ gravar } className='formulario'>
                <div>
                    Descrição: <input ref={descricao} type="text" maxLength="100" required />
                </div>
                <div>
                    Preço: <input ref={preco} type="number" min="0" required />
                </div>
                <div>
                    <button type='submit'>Enviar</button>
                </div>
            </form>
            <h3>{status}</h3>
            <Link to='/Produto'>Voltar</Link>
        </div>
    )

    // Chamada a função da API
    async function gravar(e){
        e.preventDefault(); // cancela o submit
        try{
            // monta json
            const json = {descricao: descricao.current.value, 
                          preco: preco.current.value 
                         }
            // Chama função da API enviando o json com os dados do novo objeto
            const resposta = await axios.post('http://localhost:8000/api/produto',json);
            setStatus(`Produto criado`)
            descricao.current.value = ""
            preco.current.value = 0
            console.log(resposta)
        } catch(erro) {
            setStatus(`Falha: ${erro}`)
        }
    }
}
export default Store