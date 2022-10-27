import axios from "axios";
import { useEffect, useState, Fragment } from "react";

import './Favoritos.css';

import THeader from '../templates/Header/THeader.js';
import TBusqueda from '../templates/Busqueda/TBusqueda.js';
import TFooter from '../templates/Footer/TFooter.js';
import useAuth from "../../hooks/useAuth.js";

import Accesory from "./subComponents/Accesory.js";

const base_url = process.env.REACT_APP_BASE_URL;

function Favoritos(){

    const url_get_accessories = `${base_url}/users`;
    const auth = useAuth();

    const [accessories, setAccessories] = useState([]);

    useEffect(()=>{
        handleGetAccessories();
    }, [auth])

    const handleGetAccessories = async ()=>{
        if(auth){
            var {data} = await axios.get(`${url_get_accessories}/${auth.id_user}/favorites`);
            setAccessories(data);
        }
    }

    return(
        <div className='Favoritos'>
            <TBusqueda auth={auth}></TBusqueda>
            <div className="row guardados-container">
                <div className="col-10">
                    <div className="box mt-3 mb-3 ms-3">
                        <ul>
                            <li>
                                <h1>Favoritos</h1>
                            </li>
                            {(accessories.length==0)
                                ? 'No hay' :
                                accessories.map(accesory=>(
                                    <Fragment key={accesory.id_accessory}>
                                        <li><hr className="dropdown-divider divisor"/></li>
                                        <Accesory
                                            user={auth}
                                            id_accessory={accesory.id_accessory}
                                            image_path={accesory.id_accessory}
                                            price={accesory.price}
                                            name={accesory.name_accessory}
                                            handleGetAccessories={handleGetAccessories}
                                        />
                                    </Fragment>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Favoritos;
