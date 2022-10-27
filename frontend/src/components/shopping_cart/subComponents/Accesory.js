import axios from "axios";
import { useEffect, useState } from "react";

const base_url = process.env.REACT_APP_BASE_URL;

function Accesory(props){

    const {id_user, id_accessory, image_path, price, name, quantity, total_price} = props; 

    const url_add_accessory = `${base_url}/users/${id_user}/shopping_cart/accessories/${id_accessory}`;

    const [cantidad, setCantidad] = useState(quantity);

    const handleSetCantidad = async (cant)=>{
        if(cantidad+cant<1) return;
        await axios.post(`${url_add_accessory}/?quantity=${cant}`);
        var {data} = await axios.get(`${base_url}/users/${id_user}/shopping_cart/accessories/${id_accessory}`);
        setCantidad(data.accesory.quantity);
        props.getAccessories();
    }

    const handleDeleteFromShoppingCart = async ()=>{
        await axios.delete(`${base_url}/users/${id_user}/shopping_cart/accessories/${id_accessory}`);
        props.getAccessories();
    }

    return(
        <li>
            <div className="guardados flex-row">
                <img src={`/images/${image_path}.jpg`} alt=""/>
            </div>
            <div className="description-carrito">
                <p className="name-description">{name}</p>
                <p className="bold-carrito">${price}</p>
                <div className="d-flex align-items-center">
                    <p className="bold-carrito">
                        Cant:
                    </p>
                    <button onClick={()=>{handleSetCantidad(-1)}} className="btn">-</button>
                    <input onChange={()=>{}} title="cantidad" type="number" className="cantidad" value={cantidad}/>
                    <button onClick={()=>{handleSetCantidad(1)}} className="btn">+</button>
                </div>
                <div className="d-flex flex-column">
                    <button onClick={handleDeleteFromShoppingCart} className="btn">Eliminar</button>
                </div>
                <div className="d-flex justify-content-end">
                    <p className="bold-carrito">${total_price}</p>
                </div>
            </div>
        </li>

    )
}

export default Accesory;