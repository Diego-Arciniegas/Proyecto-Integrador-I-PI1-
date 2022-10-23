import './Busqueda.css';

import {useNavigate, useSearchParams} from 'react-router-dom';
import {useState} from 'react';
import LoginModal from './LoginModal/LoginModal.js';

function Contenedor(props){
    
    const [searchParams] = useSearchParams();
    const [name_accessory, setName_accessory] = useState('');

    const navigate = useNavigate();

    const handleSearch = async (e)=>{
        e.preventDefault();
        navigate(`/accessories?accessory=${name_accessory}`);
        window.location.reload();
    }
    
    return(
        <div className="contenedor">
            <div className="barra-ayudas">
                <p>Guia del Comprador</p>
                <p>Ayuda</p>
                <p>|</p>

                    <button onClick={()=>{navigate('/favoritos')}} className="btn dropdown-toggle nav-dropdown" type="button" id="dropdownMenuButton1" data-bs-toggle="" aria-expanded="false">
                        <i className="bi bi-heart fav"></i>
                    <p>Mis Favoritos</p>
                    </button>

                <div className="dropdown">
                    <button className="btn dropdown-toggle nav-dropdown" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-person user"></i>
                        <p>Mi cuenta </p>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {(props.auth!==null) 
                            ?
                            <div className="mi-cuenta-logs">
                                <i className="bi bi-person-circle"></i>
                                <p className="bold-carrito">Bienvenido {props.auth.name_user}</p>
                            </div>
                            :
                            <div className="mi-cuenta-logs">
                                <button type="button" className="btn" id="login" data-bs-toggle="modal" data-bs-target="#login-modal">
                                    Iniciar sesion
                                </button>
                                <button type="button" className="btn" id="register" data-bs-toggle="modal" data-bs-target="#login-modal">
                                    Registrarse
                                </button>
                            </div>
                        }
                        
                        <li><hr className="dropdown-divider divisor"/></li>
                        <li><a className="dropdown-item" href="#">Mis favoritos</a></li>
                        <li><a className="dropdown-item" href="#">Mis Pedidos</a></li>
                        <li><a className="dropdown-item" href="#">Metodos de pago</a></li>
                        <li><a className="dropdown-item" href="#">Garantias</a></li>
                        <li><a className="dropdown-item" href="#">Ofertas</a></li>
                    </ul>
                </div>
            </div>
            <form onSubmit={handleSearch}>
                <div className="contenedor-buscador">
                        <div className="input-group mb-3 input-container-search" >
                            <input onChange={(e)=>{setName_accessory(e.target.value)}} defaultValue={searchParams.get('accessory')} type="text" className="form-control inp-buscador" placeholder="Search"/>
                            <button type={'submit'} className="input-group-text buscador">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    <i onClick={()=>{navigate('/shopping_cart')}} className="bi bi-cart2 carrito"></i>
                </div>
            </form>
            <LoginModal></LoginModal>
        </div>
    )
}

export default Contenedor;
