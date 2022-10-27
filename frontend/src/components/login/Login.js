import { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const base_url = process.env.REACT_APP_BASE_URL;

function Login(){
    
    const navigate = useNavigate();
    const url_login = `${base_url}/login`;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    var handleLogin = async (e)=>{
        e.preventDefault();
        try{
            var {data} = await axios.post(url_login, {email, password});
            localStorage.setItem('user_token', data.token);
            if(data.user.id_user_type==1){
                navigate('/catalogo');
            }else{
                navigate('/admin/main');
            }
        }catch(error){
            alert(error.response.data.message);
        }
    }

    return(
        <div className="hero-image">
            <form onSubmit={handleLogin}>
                <div className="hero-text">
                    <h1 className="title">Iniciar sesión</h1>
                    <input placeholder="Email" type="email" className="inputs" onChange={(e)=>{setEmail(e.target.value)}}/>
                    <input placeholder="Contraseña" type="password" className="inputs" onChange={(e)=>{setPassword(e.target.value)}}/>        
                    <input type="submit" id="login" value="Log in"/>
                </div>
            </form>
        </div>
    )
}

export default Login;
