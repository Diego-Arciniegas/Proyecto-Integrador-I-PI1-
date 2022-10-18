import axios from 'axios';
import { useState } from 'react';

import './Register.css';

const base_url = process.env.REACT_APP_BASE_URL;

function Register(){

    const url_register = `${base_url}/register`;

    const [name_user, setName_user] = useState('');
    const [name, setName] = useState('');
    const [second_name, setSecond_name] = useState('');
    const [identification, setIdentification] = useState('');
    const [email, setEmail] = useState('');
    const [number_phone, setNumber_phone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordC, setPasswordC] = useState('');

    var hanldeRegister = async (e)=>{
        e.preventDefault();
        try{
            if(password!==passwordC){
                return alert('Contraseñas diferentes');
            }

            var response = await axios.post(url_register, {
                name_user, name, second_name, identification, email, number_phone,
                password, id_user_type: 1
            });

            console.log(response.data.token);
        }catch(error){
            if(error.response){
                alert(error.response.data.message);
            }else{
                console.log(error);
            }
        }
    }

    return(
        <div className="hero-image">
            <div className="hero-text">
            <form onSubmit={hanldeRegister}>
                <h1 className="title">Registrese</h1>
                <div className="row">
                    <div className="col-6 vertical">
                        <input placeholder="Nombre" type="text" className="inputs" onChange={(e)=>{setName(e.target.value)}}/>
                        <input placeholder="Cedula" type="number" className="inputs" onChange={(e)=>{setIdentification(e.target.value)}}/> 
                    </div> 
                    <div className="col-6 vertical">
                        <input placeholder="Apellido" type="text" className="inputs" onChange={(e)=>{setSecond_name(e.target.value)}}/>
                        <input placeholder="Telefono" type="number" className="inputs" onChange={(e)=>{setNumber_phone(e.target.value)}}/> 
                    </div> 
                </div>   
                <div className="row">
                    <div className="col-12">
                        <input placeholder="Username" type="text" className="inputs-lg" onChange={(e)=>{setName_user(e.target.value)}}/>
                        <input placeholder="Email" type="email" className="inputs-lg" onChange={(e)=>{setEmail(e.target.value)}}/>
                        <input placeholder="Contraseña" type="password" className="inputs-lg" onChange={(e)=>{setPassword(e.target.value)}}/>
                        <input placeholder="Confirmar contraseña" type="password" className="inputs-lg" onChange={(e)=>{setPasswordC(e.target.value)}}/>
                    </div>
                </div>   
                <input type="submit" value="Registrar" id="login"/>
            </form>
            </div>
        </div>
    )
}

export default Register;
