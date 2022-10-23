
import './Header.css';
import {useNavigate} from 'react-router-dom';

function Header(){

    const navigate = useNavigate();

    return(
        <header className="primary">
                <img id="logo" src="./img/30.PNG" alt=""/>
                <div onClick={()=>{navigate('/catalogo')}}><h2>CarParts & Accesories</h2></div>
        </header>
    )
}

export default Header;