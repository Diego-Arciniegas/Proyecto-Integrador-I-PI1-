
import { useNavigate } from 'react-router-dom';
import LoginModal from './subComponents/LoginModal.js';

function Header_admin(props){

    const navigate = useNavigate();

    const handleLogout = ()=>{
        localStorage.removeItem('user_token');
        navigate('/');
        window.location.reload();
    }

    return(
        <div>
            <div className="contenedor">
                <div className="barra-ayudas">
                    <div className="dropdown">
                        <button className="btn dropdown-toggle nav-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                        <li><hr className="dropdown-divider divisor"/></li>
                        {(props.auth)?<li><button onClick={()=>{navigate('/admin/main')}} className="dropdown-item">Menu admin</button></li>:<></>}
                        {(props.auth)?<li><button onClick={handleLogout} className="dropdown-item">Cerrar Sesión</button></li>:''}
                        </ul>
                    </div>
                    
                    
                </div>
                <div className="contenedor-buscador pb-4 justify-content-start">
                    <h1 className="ps-4">{props.title}</h1>
                </div>
            </div>
            <LoginModal/>
        </div>
    )
}

export default Header_admin;

