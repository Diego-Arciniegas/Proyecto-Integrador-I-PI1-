
import './Metodo_pago.css';
import axios from "axios";

import TBusqueda from '../templates/Busqueda/TBusqueda.js';
import useAuth from "../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from 'react';

const base_url = process.env.REACT_APP_BASE_URL;

function Metodo_pago(){
    const url_get_accessories = `${base_url}/users`;

    const navigate = useNavigate();
    const auth = useAuth();

    const [sc, setSc] = useState(null);
    console.log(sc)
    useEffect(()=>{
        handleGetShopping_cart();
    }, [auth]);

    const handleGetShopping_cart = async ()=>{
        if(auth){
            var {data} = await axios.get(`${url_get_accessories}/${auth.id_user}/shopping_cart`);
            setSc(data);
            var accessories = data.accessories || [];
            if(accessories.length==0){
            }
        }
    }

    const handleGenerateOrder = async (e)=>{
        e.preventDefault();
        try{
            console.log(auth.address);
            var {data} = await axios.post(`${base_url}/users/${auth.id_user}/shopping_cart/order`,{
                discount: 0,
                tax: 16,
                id_payment_method: 4,
                date_deliver: new Date(),
                address: auth.address
            });
            if(data.error == 1){
                return alert(data.message);
            }
            navigate(`/factura/${data.order.id_order}`);
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div>
            <div>
            <TBusqueda auth={auth}/>
            <div className="row guardados-container">
                <div className="col-9">
                    <form onSubmit={handleGenerateOrder}>
                        <div className="box mt-3 mb-3 ms-3">
                            <ul>
                                <li>
                                    <h1>Método de pago</h1>
                                </li>
                                <li>
                                    <hr className="dropdown-divider divisor"/>
                                </li>
                                <li className="mt-4">
                                    <label className="me-2">Numero de la tarjeta</label>
                                    <input required={true} type="number" className="input-form-pago" id="number-card"/>
                                </li>
                                <li className="mt-4">
                                    <label className="me-2">Código de seguridad</label>
                                    <input required={true} type="text" className="input-form-pago" id="name-card"/>
                                </li>
                                <li className="mt-4">
                                    <label className="me-2">Fecha vencimiento</label>
                                    <input required={true} title="fecha vencimiento" type='text' id="start" name="vencimiento"/>
                                </li>
                                <br></br>
                                <li>SubTotal: {(sc) ? sc.price : ''}</li>
                                <li><b>Total: {(sc) ? sc.price*1.16: ''}</b></li>
                                <li className="mt-4 d-flex justify-content-end">
                                    <button className="btn" id="comprar" type='submit'>Comprar</button>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
                <div className="col-3">
                    <div className="box mt-3 mb-3 me-3 d-flex flex-column">
                        <p className="bold-carrito ">
                            Descripción
                        </p>
                        <p className="mt-1 mb-1 clas info-compra">
                            <i className="bi bi-check-circle-fill"></i>
                            Su pedido, está listo para proceder con la compra
                        </p>
                        <p className="name-description">
                            Subtotal: <b>$154.000</b>
                        </p>
                    </div>
                    <div className="box  mt-3 mb-3 me-3 d-flex flex-column">
                        <p><b>Métodos de Pago</b></p>
                        <div>
                            <i className="bi bi-paypal"></i>
                            <i className="bi bi-credit-card"></i>
                        </div>
                        <p className="mt-2"><b>Garantía</b></p>
                        <div className="d-flex">
                            <i className="bi bi-shield"></i>
                            <p>
                                Recibe un reembolso de tu dinero si el artículo
                                no llega o es diferente al de la descripción
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )

}

export default Metodo_pago;



