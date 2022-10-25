
import Header_admin from '../templates/Header_admin/Header_admin.js';
import useAuth from "../../hooks/useAuth.js";
import axios from 'axios';
import { useEffect, useState } from 'react';

import Accessory from './subComponents/Accessory.js';

const base_url = process.env.REACT_APP_BASE_URL;

function Historico_precios(){

    const auth = useAuth();

    const [price_history, setPrice_history] = useState([]);
    const [typeSearch, setTypeSearch] = useState(1);
    
    useEffect(()=>{
        getAccessoriesPriceHistory();
    }, []);

    const getAccessoriesPriceHistory = async ()=>{
        var {data} = await axios.get(`${base_url}/accessories/price_history`);
        setPrice_history(data.history);
    }

    const getAccessoriesPriceHistoryLike = async (termino)=>{
        if(typeSearch=="1") var column = "accessory.id_accessory";
        else if(typeSearch=="2") var column = "accessory.name_accessory";
        else var column = "user.name_user";
        var {data} = await axios.get(`${base_url}/accessories/price_history?like=${column},${termino}`);
        setPrice_history(data.history);
    }

    return(
        <div>
            <Header_admin
                auth={auth}
                title={"Historico de precios"}
            />
            <div className="row m-0">
                <div className="col-12 p-4  ">
                    <div className="p-4 table-products-container">
                        <div className="table-products p-4">
                            <div className="input-group mb-3 input-container-search2">
                                <select onChange={(e)=>{setTypeSearch(e.target.value)}} className="form-select" aria-label="Default select example">
                                    <option value={1}>id producto</option>
                                    <option value={2}>nombre producto</option>
                                    <option value={3}>usuario</option>
                                </select>
                                <input onChange={(e)=>{getAccessoriesPriceHistoryLike(e.target.value)}} type="text" className="form-control inp-buscador" placeholder="Search"/>
                                <span className="input-group-text buscador">
                                    <i className="bi bi-search"></i>
                                </span>
                            </div>
                            <table className="table table-dark table-borderless ">
                                <thead>
                                    <tr>
                                        <th>Codigo</th>
                                        <th>Id producto</th>
                                        <th>Nombre del producto</th>
                                        <th>Usuario que modifico</th>
                                        <th>Precio Anterior</th>
                                        <th>Precio nuevo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {price_history.map(data=>(
                                        <Accessory
                                            key={data.id_accessories_price_history}
                                            id={data.id_accessories_price_history}
                                            accessory={data.accessory}
                                            user={data.user}
                                            old_price={data.old_price}
                                            new_price={data.new_price}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Historico_precios;



