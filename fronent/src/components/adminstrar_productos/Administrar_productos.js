
import axios from 'axios';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth.js';
import './Administrar_productos.css';

import Header_admin from '../templates/Header_admin/Header_admin.js';

import Accessory from './subComponents/Accessory.js';
import { useNavigate } from 'react-router-dom';

const base_url = process.env.REACT_APP_BASE_URL;

function Administrar_productos(){

    var auth = useAuth();

    const navigate = useNavigate();
    const [accessories, setAccessories] = useState([]);
    const [modifiedAccessories, setModifiedAccessories] = useState({});
    const [fetching, setFetching] = useState(false);

    useEffect(()=>{
        handleGetAccessories();
    }, []);
    
    const handleGetAccessories = async ()=>{
        var {data} = await axios.get(`${base_url}/accessories`);
        setAccessories(data);
    }

    const handleSearchAccessories = async (e)=>{
        var {data} = await axios.get(`${base_url}/accessories?like=name_accessory,${e.target.value}`);
        setAccessories(data);
    }

    const handleUpdateStock = async ()=>{
        if(auth){
            let data = modifiedAccessories;
            setModifiedAccessories({});
            setFetching(true);
            for(const id_accesory in data){
                await axios.put(`${base_url}/accessories/${id_accesory}`,{
                    stock: data[id_accesory],
                    id_user: auth.id_user
                });
            }
            setFetching(false);
            handleGetAccessories();
        }else{
            alert("No tienes permisos xd");
        }
    }

    return(
        <div>
            {(auth && auth.id_user_type!=2)?navigate('/catalogo'):''}
            <Header_admin title={"Administrar Productos"} auth={auth}/>
            <div className="row m-0">
                <div className="col-12 p-4  ">
                    <div className="p-4 table-products-container">
                        <div className="input-group mb-3 input-container-search2" >
                            <input onChange={handleSearchAccessories} type="text" className="form-control inp-buscador" placeholder="Search"/>
                            <span className="input-group-text buscador">
                                <i className="bi bi-search"></i>
                            </span>
                        </div>
                        <div className="table-products p-4">
                            
                            <table className="table table-dark table-hover">
                                <colgroup>
                                    <col span="1" style={{"width": "10%"}}/>
                                    <col span="1" style={{"width": "40%"}}/>
                                    <col span="1" style={{"width": "15%"}}/>
                                    <col span="1" style={{"width": "15%"}}/>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <td>
                                            Codigo
                                        </td>
                                        <td>
                                            Nombre del agregar productos
                                        </td>
                                        <td>
                                            Stock
                                        </td>
                                        <td>
                                            Edit
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accessories.map(accessory=>(
                                        <Accessory
                                            key={accessory.id_accessory}
                                            id_accessory={accessory.id_accessory}
                                            name_accessory={accessory.name_accessory}
                                            stock={accessory.stock}
                                            accessories={accessories}
                                            modifiedAccessories={modifiedAccessories}
                                            setModifiedAccessories={setModifiedAccessories}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button onClick={handleUpdateStock}>Guardar cambios</button>
                        {(fetching)?<p style={{'color':'white'}}>Guardando...</p>:''}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Administrar_productos;

