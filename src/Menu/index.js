import { Link } from "react-router-dom";
import './style.css';

function Menu() {
    return(
        <div className="menu">
            <Link to="/" className='Link'>Home</Link>
            <Link to="/Produto">Produto</Link>
            <Link to="/Produto">Produto</Link>
            <Link to="/Produto">Produto</Link>
            <Link to="/Produto">Produto</Link>
            <Link to="/Produto">Produto</Link>
        </div>
    )
}
export default Menu