
//import './LoginModal.css';

function LoginModal(){
    return(
        <div className="modal fade" id="login-modal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Iniciar Sesion</button>
                            <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Registrarse</button>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <form action="Post" className="column-form">
                                        <input placeholder="Email o Usuario" type="email" className="inputs"/>
                                        <input placeholder="Contraseña" type="password" className="inputs input-small"/>
                                </form> 
                                <div className="modal-footer margin-footer-modal">
                                    <button type="button" className="btn btn-modal">Iniciar Sesion</button>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <form action="Post" className="column-form">
                                    <div className="inputs-groups">
                                        <input placeholder="Nombre" type="text" className="inputs"/>
                                        <input placeholder="Apellido" type="text" className="inputs"/>
                                    </div>
                                    <input placeholder="Username" type="text" className="inputs input-small"/>
                                    <div className="inputs-groups">
                                        <input placeholder="N° de identificacion" type="number" className="inputs"/>
                                        <input placeholder="Telefono" type="number" className="inputs"/>
                                    </div>
                                    <input placeholder="Email" type="email" className="inputs"/>
                                    <input placeholder="Contraseña" type="password" className="inputs input-small"/>
                                    <input placeholder="Confirmar contraseña" type="password" className="inputs input-small"/>        
                            </form> 
                            <div className="modal-footer margin-footer-modal">
                                <button type="button" className="btn btn-modal">Registrarse</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LoginModal;
