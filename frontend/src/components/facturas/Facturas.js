
import axios from "axios";
import { useEffect, useState } from "react";
import Accessory from "./subComponents/Accessory.js";

import Header_admin from '../templates/Header_admin/Header_admin.js';
import useAuth from "../../hooks/useAuth.js";

const base_url = process.env.REACT_APP_BASE_URL;

function Facturas(){

    const auth = useAuth();

    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        handleGetOrders();
    }, []);

    const handleGetOrders = async ()=>{
        var {data} = await axios.get(`${base_url}/orders`);
        setOrders(data);
    }

    return(
        <div>
            <Header_admin
                auth={auth}
                title={"Facturas"}
            />
            <div className="row m-0">
                <div className="col-12 p-4  ">
                    <div className="p-4 table-products-container">
                        <div className="table-products p-4">
                            <div className="input-group mb-3 input-container-search2" >
                                <input type="text" className="form-control inp-buscador" placeholder="Search"/>
                                <span className="input-group-text buscador">
                                    <i className="bi bi-search"></i>
                                </span>
                            </div>
                            <table className="table table-dark table-borderless ">
                                <thead>
                                    <tr>
                                        <th>id Factura</th>
                                        <th>Usuario</th>
                                        <th>Valor factura</th>
                                        <th>Unidades</th>
                                        <th>Fecha facturada</th>
                                        <th>Detalles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order=>(
                                        <Accessory
                                            key={order.id_order}
                                            id_order={order.id_order}
                                            user={order.user}
                                            total_price={order.total_price}
                                            quantity={order.quantity}
                                            date_creation={order.date_creation}
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

export default Facturas;

