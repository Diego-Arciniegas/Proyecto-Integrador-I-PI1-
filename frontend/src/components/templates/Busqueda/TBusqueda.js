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
    
    const handleLogout = ()=>{
        localStorage.removeItem('user_token');
        navigate('/catalogo');
        window.location.reload();
    }

    return(
        <div className="contenedor">
            <div className="barra-ayudas">
                <p>Guía del Comprador</p>
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
                        {(props.auth) 
                            ?
                            <div className="mi-cuenta-logs">
                                <i className="bi bi-person-circle"></i>
                                <p className="bold-carrito">Bienvenido {props.auth.name_user}</p>
                            </div>
                            :
                            <div className="mi-cuenta-logs">
                                <button type="button" className="btn" id="login" data-bs-toggle="modal" data-bs-target="#login-modal">
                                Iniciar sesión
                                </button>
                                <button type="button" className="btn" id="register" data-bs-toggle="modal" data-bs-target="#login-modal">
                                Regístrate 
                                </button>
                            </div>
                        }
                        
                        <li><hr className="dropdown-divider divisora"/></li>
                        {(props.auth)?<li><button onClick={()=>{navigate('/perfil')}} className="dropdown-item">Mi cuenta</button></li>:<></>}
                        <li><button onClick={()=>{navigate('/favoritos')}} className="dropdown-item">Mis favoritos</button></li>
                        <li><button onClick={()=>{navigate('/favoritos')}} className="dropdown-item">Mis Pedidos</button></li>
                        <li><button className="dropdown-item">Garantias</button></li>
                        <li><button onClick={()=>{navigate('/accessories')}} className="dropdown-item">Ofertas</button></li>
                        {(props.auth)?<li><button onClick={handleLogout} className="dropdown-item">Cerrar Sesión</button></li>:''}
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
