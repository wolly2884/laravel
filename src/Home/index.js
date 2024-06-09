import { Link } from 'react-router-dom';
import classes from './style.css';
import Menu from '../Menu/index';
import Logo from './logo.png'; // Importe o caminho da sua imagem de logo

function Home() {
    return (
        <div className={classes.container}>
            <Menu />
            <img src={Logo} alt="Logo" className='logos'/>

            <div className='div'>
                <div className='div'>
                    <h1 style={{ padding: '10px', borderRadius: '10px', width: '40vh' }}>
                        Modelo para a TP
                    </h1>
                    <p style={{ marginLeft: '-10vh', padding: '10px', border: '1px solid black', borderRadius: '10px', width: '50vh' }}>
                        Construir Aplicação React / Laravel para manutenção de um cadastro de sua escolha com no mínimo 7 atributos (campos de dados). 
                        Dentre os atributos deve haver ao menos datas, números e strings. Anexo modelos de projetos que podem ser utilizados como base. 
                        Grupo de no máximo 3 alunos. Apresentação para o professor será em aula de reposição a ser agendada após a P2.
                    </p>
                </div>
                <div style={{ padding: '20px', borderRadius: '10px'}}> 
                    <Link to="/SignIn" className='button'>SignIn</Link>
                    <Link to="/" className='button'>Home</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
