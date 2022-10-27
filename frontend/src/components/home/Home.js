import './Home.css';
import useAuth from '../../hooks/useAuth.js'
import TBusqueda from '../templates/Busqueda/TBusqueda.js';

function Home(){
    const auth = useAuth();
    return(
        <div>
            <TBusqueda auth={auth}/>
            <div className="contenedor">
                <img src="/images/28.jpeg" />
                <div className="letras-portada text-start">
                    <h1>SERVICIOS</h1>
                    <h1>AUTOPARTES</h1>
                    <h1>SOPORTE TECNICO</h1>
                </div>
            </div>

            <div className="row barra">
                <div className="col-4 text-white menu-medio-start">
                    <a className="m-0">Sobre Nosotros</a> 
                </div>
                
                <div className="col-4 text-white menu-medio-centro">
                    <a className="m-0">Cliente</a>
                </div>
                
                <div className="col-4 text-white menu-medio-end">
                    <a className="m-0">Atención al cliente</a>
                </div>
            </div>

            <div className="contenedor-dos">
                <img src="/images/29.jpeg" />
                <div className="letras-portada-dos text-end">
                    <h1>DISEÑO</h1>
                    <h1>FIABILIDAD</h1>
                    <h1>INSTALACIONES</h1>
                </div>
            </div>
            
        </div>
    )
}

export default Home;
