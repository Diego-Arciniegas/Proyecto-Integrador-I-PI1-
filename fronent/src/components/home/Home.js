import './Home.css';

function Home(){

    return(
        <div>
            <header className="primary">
                <div className="col-5">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle hamburger" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="./img/menu.png" alt=""/>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a className="dropdown-item">Action</a></li>
                        <li><a className="dropdown-item">Another action</a></li>
                        <li><a className="dropdown-item">Something else here</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-2 text-center">
                    <img id="logo" src="./img/30.png" alt=""/>
                </div>
                <div className="col-5 d-flex">
                    <div className="input-group d-flex justify-content-end ">
                        <input  type="text" className="form-control rounded-pill" aria-label="Dollar amount (with dot and two decimal places)"/>
                        <button id="buscar" className="input-group-text border-0">
                            <img src="./img/lupa.png" alt=""/>
                        </button>
                    </div>
                    <button id="profile" className="border-0">
                        <img  src="./img/usuario.png" alt=""/>
                    </button>
                </div>
        </header>

        <div className="contenedor">
            <img src="./img/28.jpeg" />
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
                    <a className="m-0">Atencion al cliente</a>
                </div>
            </div>

            <div className="contenedor-dos">
                <img src="./img/29.jpeg" />
                <div className="letras-portada-dos text-end">
                    <h1>DISEÑO</h1>
                    <h1>FIABILIDAD</h1>
                    <h1>INSTALACIONES</h1>
                </div>
            </div>

            <footer>
                <div className="row footer">
                    <div className="col-8">
                        <div className="row footer">
                            <div className="col-6 ">
                                <h5 className="footer-title">Terminos y condiciones</h5>
                            </div>
                            <div className="col-6 ">
                                <h5 className="footer-title">Ubicacion</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-4 icons">
                        <img src="./img/twitter.png" alt=""/>
                        <img src="./img/instagram.png" alt=""/>
                        <img src="./img/facebook.png" alt=""/>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home;
