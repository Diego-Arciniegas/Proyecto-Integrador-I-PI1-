
import './Catalogo.css';

import Categorias  from './subComponents/Categorias.js';
import Accesories  from './subComponents/Accesories.js';
import MegaOfertas from './subComponents/MegaOfertas.js';

import IBusqueda   from '../templates/Busqueda/TBusqueda.js';
import THeader     from '../templates/Header/THeader.js';
import TFooter     from '../templates/Footer/TFooter.js';

import useAuth     from '../../hooks/useAuth.js';

function Catalogo(){

    const auth = useAuth();

    return(
        <div>
            <THeader></THeader>
            <IBusqueda></IBusqueda>
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
                    <MegaOfertas id_user={auth}/>
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
                
                <Accesories id_user={auth}/>
                <TFooter></TFooter>
            </div>
        </div>
    )
}

export default Catalogo;

