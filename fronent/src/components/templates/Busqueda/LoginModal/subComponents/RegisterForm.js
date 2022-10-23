import axios from 'axios';
import { useState } from 'react';

const base_url = process.env.REACT_APP_BASE_URL;

function RegisterForm(){

    const url_register = `${base_url}/register`;

    const [name_user, setName_user] = useState('');
    const [name, setName] = useState('');
    const [second_name, setSecond_name] = useState('');
    const [identification, setIdentification] = useState('');
    const [email, setEmail] = useState('');
    const [number_phone, setNumber_phone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordC, setPasswordC] = useState('');

    var handleRegister = async (e)=>{
        e.preventDefault();
        try{
            if(password!==passwordC){
                return alert('Contraseñas diferentes');
            }

            var response = await axios.post(url_register, {
                name_user, name, second_name, identification, email, number_phone,
                password, id_user_type: 1, id_user_status: 1
            });

            localStorage.setItem('user_token', response.data.token);
        }catch(error){
            if(error.response){
                alert(error.response.data.message);
            }else{
                console.log(error);
            }
        }
    }

    return(
        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
            <form onSubmit={handleRegister} className="column-form">
                <div className="inputs-groups">
                    <input onChange={(e)=>{setName(e.target.value)}} placeholder="Nombre" type="text" className="inputs"/>
                    <input onChange={(e)=>{setSecond_name(e.target.value)}} placeholder="Apellido" type="text" className="inputs"/>
                </div>
                <input onChange={(e)=>{setName_user(e.target.value)}} placeholder="Username" type="text" className="inputs input-small"/>
                <div className="inputs-groups">
                    <input onChange={(e)=>{setIdentification(e.target.value)}} placeholder="N° de identificacion" type="number" className="inputs"/>
                    <input onChange={(e)=>{setNumber_phone(e.target.value)}} placeholder="Telefono" type="number" className="inputs"/>
                </div>
                <input onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" type="email" className="inputs"/>
                <input onChange={(e)=>{setPassword(e.target.value)}} placeholder="Contraseña" type="password" className="inputs input-small"/>
                <input onChange={(e)=>{setPasswordC(e.target.value)}} placeholder="Confirmar contraseña" type="password" className="inputs input-small"/> 
                <div className="modal-footer margin-footer-modal">
                    <button type="submit" className="btn btn-modal">Registrarse</button>
                </div>       
            </form> 
        </div>
    )
}

export default RegisterForm;
