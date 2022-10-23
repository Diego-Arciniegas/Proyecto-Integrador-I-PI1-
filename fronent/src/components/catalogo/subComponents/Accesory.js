
import { useEffect, useState } from "react";
import axios from "axios";

const base_url = process.env.REACT_APP_BASE_URL;

function Accesory(props){

    const {user, id_accessory, image_path, price, discount, name, _favorite, className} = props;
    const [favorite, setFavorite] = useState(0);

    useEffect(()=>{
        setFavorite(_favorite);
    }, [props._favorite]);

    var handleSetFavorite = async ()=>{
        if(user){
            if(favorite){
                await axios.delete(`${base_url}/users/${user.id_user}/favorites/${id_accessory}`);
            }else{
                await axios.post(`${base_url}/users/${user.id_user}/favorites/${id_accessory}`);
            }
            setFavorite(!favorite);
        }
    }

    var handleAddToShopping = async ()=>{
        if(user){
            try{
                await axios.post(`${base_url}/users/${user.id_user}/shopping_cart`);
                var {data} = await axios.get(`${base_url}/users/${user.id_user}/shopping_cart/accessories/${id_accessory}`);
                if(data.accesory == null){
                    await axios.post(`${base_url}/users/${user.id_user}/shopping_cart/accessories/${id_accessory}`);
                    alert('Producto agregado al carrito de compra');
                }else{
                    alert('Producto ya agregado al carrito de compra');
                }
            }catch(error){
                console.log(error);
            }
        }
    }

    return(
        <div className={(className) ? className : ''}>
            <img src={`./img/${image_path}.png`} alt=""/>
            <div className="price">
                <h4>${price}</h4>
                <h4><span className="discount">{(discount!=0) ? `-${discount}%` : ''}</span></h4>
            </div>
            <p className="description">{name}</p>
            <div className="flex-row">
                <button onClick={handleAddToShopping} className='btn'><i className="bi bi-cart2 h6" style={{'fontSize': '25px'}}></i></button>
                <button onClick={handleSetFavorite} className='btn'><i className={`bi ${(favorite) ? 'bi-heart-fill' : 'bi-heart'} h6`} style={{'fontSize': '25px'}}></i></button>
            </div>
        </div>
    )
}

export default Accesory;
