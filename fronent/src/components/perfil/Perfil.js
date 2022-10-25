import './Perfil.css';

import TBusqueda from '../templates/Busqueda/TBusqueda.js';
import useAuth from '../../hooks/useAuth.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const base_url = process.env.REACT_APP_BASE_URL;

function Perfil(){
    
    const navigate = useNavigate();
    const auth = useAuth();

    const [name, setName] = useState('');
    const [second_name, setSecond_name] = useState('');
    const [name_user, setName_user] = useState('');
    const [number_phone, setNumber_phone] = useState('');
    const [address, setAddress] = useState('');
    const [correo, setCorreo] = useState('');
    const [c1, setC1] = useState('');
    const [c2, setC2] = useState('');
    const [c3, setC3] = useState('');


    useEffect(()=>{
        if(auth){
            setName(auth.name);
            setSecond_name(auth.second_name);
            setName_user(auth.name_user);
            setNumber_phone(auth.number_phone);
            setAddress(auth.address);
            setCorreo(auth.email);
        }
    }, [auth]);

    const handleUpdateUser = async (e)=>{
        e.preventDefault();
        try{
            await axios.post(`${base_url}/login`,{
                email: correo,
                password: c3
            });
            
            if(c1!="" && c1!=c2){
                return alert("Contaseñas diferentes");
            }

            if(c1!=""){
                await axios.put(`${base_url}/users/${auth.id_user}`,{
                    name, second_name, name_user, number_phone, address, email: correo, password: c1
                });
            }else{
                await axios.put(`${base_url}/users/${auth.id_user}`,{
                    name, second_name, name_user, number_phone, address, email: correo
                });
            }
            window.location.reload();
        }catch(error){
            if(error.response.data.error==1){
                alert("Contraseña incorrecta");
            }
        }
        
    }

    return(
        <div>
            <TBusqueda
                auth={auth}
            />
            <div className="row ofertas-categorias">
                <div className="col-4">
                    <div className="row">
                        <div className="col-12 user-box ">
                            
                            <i className="bi bi-person"></i>
                            <p className="name-label">{(auth)?`${auth.name || ''} ${auth.second_name || ''}`:''}</p>
                            <p className="email-label">{correo}</p>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12 user-box">
                            <button onClick={()=>{navigate('/facturas')}} type="button" className="btn opt-user">
                                <i className="bi bi-credit-card"></i>
                                <p>Tus Facturas</p>
                            </button>
                            <button type="button" className="btn opt-user">
                                <i className="bi bi-headset"></i>
                                <p>Servicio al cliente</p>
                            </button>
                            <button onClick={()=>{navigate('/catalogo')}} type="button" className="btn opt-user">
                                <i className="bi bi-percent"></i>
                                <p>Super ofertas</p>
                            </button>
                            <button onClick={()=>{navigate('/favoritos')}} type="button" className="btn opt-user">
                                <i className="bi bi-heart-fill"></i>
                                <p>Mis favoritos</p>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="col">
                    <div className="user-box pt-4 pb-4">
                        <p className="title-admin-profile">Administra tu perfil</p>
                        <form onSubmit={handleUpdateUser} className="modify-profile">
                            <input onChange={(e)=>{setName(e.target.value)}} placeholder="Nombre" value={name || "n"} type="text"/>
                            <input onChange={(e)=>{setSecond_name(e.target.value)}} placeholder="Apellidos" value={second_name || "n"} type="text"/>
                            <input onChange={(e)=>{setName_user(e.target.value)}} placeholder="Usuario" value={name_user} type="text"/>
                            <input onChange={(e)=>{setNumber_phone(e.target.value)}} placeholder="Telefono" value={number_phone} type="text"/>
                            <input onChange={(e)=>{setAddress(e.target.value)}} placeholder="Direccion" value={address} type="text"/>
                            <input onChange={(e)=>{setC1(e.target.value)}} placeholder="Contraseña nueva" type="password"/>
                            <input onChange={(e)=>{setC2(e.target.value)}} placeholder="Confirmar Contraseña nueva" type="password"/>
                            <input required={true} onChange={(e)=>{setC3(e.target.value)}} placeholder="Confirmar actual" type="password"/>
                            <div className="save-container">
                                <button className="btn" type="submit">Guardar cambios</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Perfil;


