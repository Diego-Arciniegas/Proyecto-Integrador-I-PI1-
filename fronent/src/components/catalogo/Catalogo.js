
import './Catalogo.css';

import Accesory from './subComponents/Accesory/Accesory.js';

import Contenedor from './subComponents/Contenedor/Contenedor.js';
import LoginModal from './subComponents/LoginModal/LoginModal.js';
import Categorias from './subComponents/Categorias/Categorias.js';
import Accesories from './subComponents/Accesories/Accesories.js';
import TFooter from '../templates/Footer/TFooter.js';

function Catalogo(){
    return(
        <div>
            <header className="primary">
                <img id="logo" src="./img/30.PNG" alt=""/>
                <h2>CarParts & Accesories</h2>
            </header>
            <Contenedor></Contenedor>
            <LoginModal></LoginModal>
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
                    <div class="row mega-ofertas">
                        <div class="megaofertas-title">
                            <h4>Mega</h4>
                            <h4 class="ofertas-title">Ofertas</h4>
                        </div>
                        <div class="row col-offers">
                            <div className='col carrusel'>
                                <Accesory image_path='24' price='85800' discount='15'
                                description='Funda elegante de peluche vinotinto' />
                                <Accesory image_path='25' price='85800' discount='15'
                                description='Funda elegante de peluche vinotinto' />
                                <Accesory image_path='26' price='85800' discount='15'
                                description='Funda elegante de peluche vinotinto' />
                                <Accesory image_path='27' price='85800' discount='15'
                                description='Funda elegante de peluche vinotinto' />
                                <Accesory image_path='23' price='85800' discount='15'
                                description='Funda elegante de peluche vinotinto' />
                            </div>
                        </div>
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
                
                <Accesories></Accesories>
                <TFooter></TFooter>
            </div>
        </div>
    )
}

export default Catalogo;

