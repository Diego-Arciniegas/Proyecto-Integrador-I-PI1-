
import './Footer.css';

function TFooter(){

    return(
        <footer>
            <div className="row footer">
                <div className="col-3">
                    <b><p>Comunicate con nosotros</p></b>
                    <p>Cel: 3144201857</p>
                    <p>Tel: 6849622</p>
                    <p>Email: carparts@gmail.com</p>
                </div>
                <div className="col">
                    <p>Quienes somos</p>
                    <p>Aviso Legal</p>
                    <p>Condiciones de compra</p>
                    <p>Formas de envio</p>
                </div>
                <div className="col">
                    <p>Promociones</p>
                    <p>Politicas de seguridad</p>
                    <p>Condiciones de uso</p>
                    <p>Ayuda</p>
                </div>
                <div className="col icons">
                    <div className="row">
                        <p>Siguenos</p>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <img src="./img/facebook.png" alt=""/>
                        </div>
                        <div className="col-4">
                            <img src="./img/instagram.png" alt=""/>
                        </div>
                        <div className="col-4">
                            <img src="./img/twitter.png" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default TFooter;
