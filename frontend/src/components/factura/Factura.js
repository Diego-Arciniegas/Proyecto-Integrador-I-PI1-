import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Factura.css'

const base_url = process.env.REACT_APP_BASE_URL;

function Factura(){

    const [factura, setFactura] = useState({});
    const [accessories, setAccessories] = useState([]);
    const [user, setUser] = useState({});

    var {id_order} = useParams();

    useEffect(()=>{
        handleGetFactura();
    }, []);

    const handleGetFactura = async ()=>{
        var {data} = await axios.get(`${base_url}/orders/${id_order}`);
        setFactura(data);
        setAccessories(data.accessories);
        setUser(data.user);
    }

    return(
        <div className="p-4 background-factura">
            <h4 className="text-center">Registro de Compra</h4>
            <p><b>Numero de factura:</b> {factura.id_order}</p>
            <p><b>Fecha de la factura:</b> {factura.date_creation}</p>
            <p><b>Subtotal:</b> ${factura.price}</p>
            <p><b>Impuestos:</b>{factura.tax}</p>
            <p><b>Total:</b> ${factura.total_price}</p>
            <table className="table table-bordered">
                <thead>
                    <tr className="text-center"><th>Detalles de la compra</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className="d-flex justify-content-between">
                                <p><b>Productos comprados</b></p>
                                <p><b>Cantidad:</b></p>
                                <p><b>Precio:</b></p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <ul className="description">
                                    {accessories.map(accessory=>(
                                        <li key={accessory.id_accessory} className="description">
                                            <div className="d-flex justify-content-between description">
                                                <p>{(accessory.name_accessory.length>40)?`${accessory.name_accessory.slice(0,40)}...`:accessory.name_accessory}</p>
                                                <p style={{"marginLeft": "200px"}}>{accessory.order_accessories.quantity}</p>
                                                <p style={{"marginLeft": "300px"}}>${accessory.order_accessories.quantity*accessory.price}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table className="table table-bordered ">
                <thead>
                    <tr className="text-center"><th>Detalles del envio</th></tr>
                </thead>
                <tbody>
                    <tr>
                       <td>
                            <div className="detalles-envio">
                                <p><b>Direccion de envio:</b></p>
                                <p>{user.name} {user.second_name}</p>
                                <p>{factura.address}</p>
                            </div>
                        </td> 
                    </tr> 
                </tbody>
            </table>
            <table className="table table-bordered ">
                <thead>
                    <tr className="text-center"><th>Detalles del envio</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className="row">
                                <div className="col-8">
                                    <div className="detalles-envio">
                                        <div className="espaciado">
                                            <b>Metodo de pago:</b>
                                            <p>{(factura.payment_method)?factura.payment_method.name_payment:''}</p>
                                        </div>
                                        <p>{user.name} {user.second_name}</p>
                                        <p>{factura.address}</p>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="d-flex flex-column max-height">
                                        <div className="detalles-envio">
                                            <div className="max-height">
                                                <div className="espaciado">
                                                    <b>Precio:</b>
                                                </div>
                                                <div className="espaciado">
                                                    <p>Precio neto:${factura.price}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p><b>Precio Total:${factura.total_price}</b></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Factura;

