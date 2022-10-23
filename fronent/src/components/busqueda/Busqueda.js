
import './Busqueda.css';

import Categorias from './subComponents/Categorias.js';
import Accesories from '../catalogo/subComponents/Accesories.js';
import useAuth from '../../hooks/useAuth.js';

import THeader from '../templates/Header/THeader.js';
import TBusqueda from '../templates/Busqueda/TBusqueda.js';
import TFooter from '../templates/Footer/TFooter.js';

function Busqueda(){

    const auth = useAuth();

    return(
        <div className='Busqueda'>
            <THeader/>
            <TBusqueda/>
            <div className="row ofertas-categorias">
                <div className="col-auto">
                    <div className="row">
                        <Categorias/>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12 category">
                            <div className="category-title">
                                <i className="bi bi-list"></i>
                                <h5>Categorias</h5>
                            </div>
                            <ul>
                                <li>
                                    <input type="range"/>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="col">
                    <div className="all-products">
                        <div className="row servicios">
                            <div className="col-4">
                                <i className="bi bi-check-circle-fill"></i>
                                <p>Pagos Seguros & Fiables</p>
                            </div>
                            <div className="col-4">
                                <i className="bi bi-coin"></i>
                                <p>Garantias</p>
                            </div>
                            <div className="col-4">
                                <i className="bi bi-clock-fill"></i>
                                <p>Servicio 24/7</p>
                            </div>
                        </div>
                        
                        <Accesories id_user={auth.id_user}/>
                    </div>
                </div>
            </div>
            <TFooter/>
        </div>
    )
}

export default Busqueda;


