
function Accesory(props){

    const {id_user, id_accessory, image_path, price, name} = props;

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
                    <button type="button"  className="btn add-fav me-2">
                        Agregar al carrito
                    </button>
                    <button type="button"  className="btn quitar">
                        Eliminar de favoritos
                    </button>
                </div>
            </div>
            
        </li>
    )
}


export default Accesory;