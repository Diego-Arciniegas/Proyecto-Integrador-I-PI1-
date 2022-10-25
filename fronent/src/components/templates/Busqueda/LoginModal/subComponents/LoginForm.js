import { useState } from 'react';
import axios from 'axios';

const base_url = process.env.REACT_APP_BASE_URL;

function LoginForm(){

    const url_login = `${base_url}/login`;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    var handleLogin = async (e)=>{
        e.preventDefault();
        try{
            var response = await axios.post(url_login, {email, password});
            localStorage.setItem('user_token', response.data.token);
            window.location.reload();
        }catch(error){
            alert(error.response.data.message);
        }
    }

    return(
        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <form onSubmit={handleLogin} className="column-form">
                <input onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email o Usuario" type="email" className="inputs"/>
                <input onChange={(e)=>{setPassword(e.target.value)}} placeholder="Contraseña" type="password" className="inputs input-small"/>
                <div className="modal-footer margin-footer-modal">
                    <button type="submit" className="btn btn-modal">Iniciar Sesion</button>
                </div>
            </form> 
        </div>
    )
}

export default LoginForm;
