

import LoginForm from "./subComponents/LoginForm.js";
import RegisterForm from "./subComponents/RegisterForm.js";

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
                            <LoginForm></LoginForm>
                            <RegisterForm></RegisterForm>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LoginModal;
