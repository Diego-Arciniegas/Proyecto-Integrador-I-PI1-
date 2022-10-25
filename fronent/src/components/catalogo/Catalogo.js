
import './Catalogo.css';

import Categorias  from './subComponents/Categorias.js';
import Accesories  from './subComponents/Accesories.js';
import MegaOfertas from './subComponents/MegaOfertas.js';

import TBusqueda   from '../templates/Busqueda/TBusqueda.js';

import useAuth     from '../../hooks/useAuth.js';

function Catalogo(){

    const auth = useAuth();

    return(
        <div>
            <TBusqueda auth={auth}></TBusqueda>
            <div className="row ofertas-categorias">
                <Categorias></Categorias>
                <div className="col">
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
                    <div className="row mega-ofertas">
                        <div className="megaofertas-title">
                            <h4>Mega</h4>
                            <h4 className="ofertas-title">Ofertas</h4>
                        </div>
                        <MegaOfertas auth={auth}/>
                    </div>
                    <div className="row suggestions">
                        <div className="col line">
                        </div>
                        <div className="col">
                            <h5 className="barra-sugeridos">Seguro te gustaria</h5>
                        </div>
                        <div className="col line">
                        </div>
                    </div>
                </div>
                
                <Accesories auth={auth}/>
            </div>
        </div>
    )
}

export default Catalogo;

