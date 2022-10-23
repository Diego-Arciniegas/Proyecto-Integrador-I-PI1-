import './Busqueda.css';

import {useNavigate} from 'react-router-dom';
import LoginModal from './LoginModal/LoginModal.js';

function Contenedor(){

    const navigate = useNavigate();

    const GoToPageFavorites = ()=>{
        navigate('/favoritos');
    }

    return(
        <div className="contenedor">
            <div className="barra-ayudas">
                <p>Guia del Comprador</p>
                <p>Ayuda</p>
                <p>|</p>

                    <button onClick={GoToPageFavorites} className="btn dropdown-toggle nav-dropdown" type="button" id="dropdownMenuButton1" data-bs-toggle="" aria-expanded="false">
                        <i className="bi bi-heart fav"></i>
                    <p>Mis Favoritos</p>
                    </button>

                <div className="dropdown">
                    <button className="btn dropdown-toggle nav-dropdown" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-person user"></i>
                        <p>Mi cuenta </p>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <div className="mi-cuenta-logs">
                            <button type="button" className="btn" id="login" data-bs-toggle="modal" data-bs-target="#login-modal">
                                Iniciar sesion
                            </button>
                            <button type="button" className="btn" id="register" data-bs-toggle="modal" data-bs-target="#login-modal">
                                Registrarse
                            </button>
                        </div>
                    <li><hr className="dropdown-divider divisor"/></li>
                    <li><a className="dropdown-item" href="#">Mis favoritos</a></li>
                    <li><a className="dropdown-item" href="#">Mis Pedidos</a></li>
                    <li><a className="dropdown-item" href="#">Metodos de pago</a></li>
                    <li><a className="dropdown-item" href="#">Garantias</a></li>
                    <li><a className="dropdown-item" href="#">Ofertas</a></li>
                    </ul>
                </div>
            </div>
            <div className="contenedor-buscador">
                <div className="input-group mb-3 input-container-search" >
                    <input type="text" className="form-control inp-buscador" placeholder="Search"/>
                    <span className="input-group-text buscador">
                        <i className="bi bi-search"></i>
                    </span>
                </div>
                <i className="bi bi-cart2 carrito"></i>
            </div>
            <LoginModal></LoginModal>
        </div>
    )
}

export default Contenedor;
