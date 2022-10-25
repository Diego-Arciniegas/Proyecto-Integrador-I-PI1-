import axios from "axios";
import './Shopping_cart.css';

import {Fragment, useState, useEffect} from 'react';

import TBusqueda from '../templates/Busqueda/TBusqueda.js';
import useAuth from "../../hooks/useAuth.js";
import Accesory from "./subComponents/Accesory.js";
import { useNavigate } from "react-router-dom";

const base_url = process.env.REACT_APP_BASE_URL;

function Shopping_cart(){
    const url_get_accessories = `${base_url}/users`;

    const [accessories, setAccessories] = useState([]);
    const [total_price, setTotal_price] = useState(0);

    const navigate = useNavigate();
    const auth = useAuth();
    
    useEffect(()=>{
        handleGetShopping_cart();
    }, [auth]);

    const handleGetShopping_cart = async ()=>{
        if(auth){
            var {data} = await axios.get(`${url_get_accessories}/${auth.id_user}/shopping_cart`);
            setAccessories(data.accessories || []);
            setTotal_price(data.price || 0);
        }
    }

    return(
        <div className='carro'>
            <TBusqueda auth={auth}/>
            <div className="row guardados-container">
                <div className="col-9">
                    <div className="box mt-3 mb-3 ms-3">
                        <ul>
                            <li>
                                <h1>Carrito</h1>
                            </li>
                            {accessories.map(accesory=>(
                                <Fragment key={accesory.id_accessory}>
                                    <li>
                                        <hr className="dropdown-divider divisor"/>
                                    </li>
                                    <Accesory
                                        id_user={auth.id_user}
                                        id_accessory={accesory.id_accessory}
                                        image_path={accesory.id_accessory}
                                        price={accesory.price}
                                        name={accesory.name_accessory}
                                        quantity={accesory.quantity}
                                        total_price={accesory.total_price}
                                        getAccessories={handleGetShopping_cart}
                                    />
                                </Fragment>
                            ))}
                            
                            
                            <li className="d-flex justify-content-end">
                                <p className="bold-carrito m-0">${total_price}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-3">
                    <div className="box mt-3 mb-3 me-3 d-flex flex-column">
                        <p className="bold-carrito ">
                            Descripcion
                        </p>
                        <p className="mt-1 mb-1 clas info-compra">
                            <i className="bi bi-check-circle-fill"></i>
                            Su pedido, esta listo para proceder con la compra
                        </p>
                        <p className="name-description">
                            Subtotal(# Productos): <b>${total_price}</b>
                        </p>
                        <button onClick={()=>{navigate('/metodo_pago')}} className="btn" id="comprar" type="button">Proceder al pago</button>
                    </div>

                    <div className="box  mt-3 mb-3 me-3 d-flex flex-column">
                        <p><b>Metodos de Pago</b></p>
                        <div>
                            <i className="bi bi-paypal"></i>
                            <i className="bi bi-credit-card"></i>
                        </div>
                        <p className="mt-2"><b>Garantia</b></p>
                        <div className="d-flex">
                            <i className="bi bi-shield"/>
                            <p>
                                Recibe un reembolso de tu dinero si el artículo
                                no llega o es diferente al de la descripción
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shopping_cart;
