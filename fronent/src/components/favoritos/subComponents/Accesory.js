
import axios from 'axios';

const base_url = process.env.REACT_APP_BASE_URL;


function Accesory(props){

    const {id_user, id_accessory, image_path, price, name} = props;

    const handleRemoveFromFavs = async()=>{
        
    }

    const handleAddToShoppingCart = async()=>{
        if(id_user){
            try{
                await axios.post(`${base_url}/users/${id_user}/shopping_cart`);
                var {data} = await axios.get(`${base_url}/users/${id_user}/shopping_cart/accessories/${id_accessory}`);
                if(data.accesory == null){
                    await axios.post(`${base_url}/users/${id_user}/shopping_cart/accessories/${id_accessory}`);
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
            <div className="guardados flex-row">
                <img src={`./img/${image_path}.png`} alt=""/>
            </div>
            <div className="description-carrito">
                <div>
                    <p className="name-description">{name} </p>
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