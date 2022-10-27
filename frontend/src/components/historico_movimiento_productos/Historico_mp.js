import Header_admin from '../templates/Header_admin/Header_admin.js';
import useAuth from "../../hooks/useAuth.js";
import axios from 'axios';
import { useEffect, useState } from 'react';

import Accessory from './subComponents/Accessory.js';

const base_url = process.env.REACT_APP_BASE_URL;


function Historico_mp(){

    const auth = useAuth();

    const [movements, setMovements] = useState([]);
    const [typeSearch, setTypeSearch] = useState(1);
    
    useEffect(()=>{
        getAccessoriesHistoryMP();
    }, []);

    const getAccessoriesHistoryMP = async ()=>{
        var {data} = await axios.get(`${base_url}/accessories/movement_history`);
        setMovements(data.history);
    }

    const getAccessoriesPriceHistoryMPLike = async (termino)=>{
        if(typeSearch=="1") var column = "accessory.id_accessory";
        else var column = "user.name_user";
        var {data} = await axios.get(`${base_url}/accessories/movement_history?like=${column},${termino}`);
        setMovements(data.history);
    }

    return(
        <div>
            <Header_admin
                auth={auth}
                title={"Historial de movimientos"}
            />
            <div className="row m-0">
                <div className="col-12 p-4  ">
                    <div className="p-4 table-products-container">
                        <div className="table-products p-4">
                            <div className="input-group mb-3 input-container-search2" >
                                <select onChange={(e)=>{setTypeSearch(e.target.value)}} className="form-select" aria-label="Default select example">
                                    <option value={1}>id producto</option>
                                    <option value={3}>usuario</option>
                                </select>
                                <input onChange={(e)=>{getAccessoriesPriceHistoryMPLike(e.target.value)}} type="text" className="form-control inp-buscador" placeholder="Search"/>
                                <span className="input-group-text buscador">
                                    <i className="bi bi-search"></i>
                                </span>
                            </div>
                            <table className="table table-dark table-borderless ">
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Id producto</th>
                                        <th>Usuario responsable</th>
                                        <th>Cantidad</th>
                                        <th>Lugar de origen</th>
                                        <th>Destino</th>
                                        <th>factura</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(auth)?
                                    movements.map(movement=>(
                                        <Accessory
                                            key={movement.id_accessory_movement_history}
                                            id={movement.id_accessory_movement_history}
                                            accessory={movement.accessory}
                                            user={auth}
                                            quantity={movement.quantity}
                                            since={movement.since}
                                            towards={movement.towards}
                                        />
                                    )):<tr></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Historico_mp;

