
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const base_url = process.env.REACT_APP_BASE_URL;


function Accesory(props){

    const navigate = useNavigate(); 

    const {user, id_accessory, image_path, price, name, handleGetAccessories} = props;

    const handleRemoveFromFavs = async()=>{
        if(user){
            await axios.delete(`${base_url}/users/${user.id_user}/favorites/${id_accessory}`);
            handleGetAccessories();
        }
    }

    const handleAddToShoppingCart = async()=>{
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
        <li>
            <div onClick={()=>{navigate(`/accessory/${id_accessory}`)}} className="guardados flex-row">
                <img src={`/images/${image_path}.jpg`} alt=""/>
            </div>
            <div className="description-carrito">
                <div>
                    <p className="name-description">{(name.length>100)?`${name.slice(0,100)}...`:name} </p>
                    <p className="bold-carrito">${price}</p>
                </div>
                
                <div className="d-flex flex-row justify-content-end">
                    <button onClick={handleAddToShoppingCart} type="button"  className="btn add-fav me-2">
                        Agregar al carrito
                    </button>
                    <button onClick={handleRemoveFromFavs} type="button"  className="btn quitar">
                        Eliminar de favoritos
                    </button>
                </div>
            </div>
            
        </li>
    )
}


export default Accesory;