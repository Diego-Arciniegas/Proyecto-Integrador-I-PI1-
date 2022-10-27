import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";

import Header_admin from '../templates/Header_admin/Header_admin.js';
import './Editar_producto.css';

const base_url = process.env.REACT_APP_BASE_URL;

function Editar_producto(){

    const auth = useAuth();

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [name_accessory, setName_accessory] = useState("");
    const [description, setDescription] = useState("");
    const [discount, setDiscount] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [available, setAvailable] = useState(true);

    useEffect(()=>{
        handleGetAccesory();
    }, []);

    const handleGetAccesory = async ()=>{
        let id_accessory = searchParams.get("id_accessory");
        if(id_accessory){
            var {data} = await axios(`${base_url}/accessories/${id_accessory}`);
            setName_accessory(data.name_accessory);
            setDescription(data.description);
            setDiscount(data.discount);
            setPrice(data.price);
            setStock(data.stock);
            setAvailable(data.available);
        }
    }
 
    const handleSaveAccessory = async (e)=>{
        e.preventDefault();
        let id_accessory = searchParams.get("id_accessory");
        if(id_accessory){
            await axios.put(`${base_url}/accessories/${id_accessory}`,{
                id_user: auth.id_user,
                name_accessory, description, discount, price, stock, available
            });
        }else{
            var {data} = await axios.post(`${base_url}/accessories`,{
                name_accessory, description, discount, price, stock, available, image_accesory_path: 0
            });
            await axios.put(`${base_url}/accessories/${data.id_accessory}`,{
                image_accesory_path: data.id_accessory
            });
            navigate("/admin/adminstrar_productos");
        }
    }

    return(
        <div>
            <Header_admin
                title={'Editar o añadir producto'}
                auth={auth}
            />
            <div className="row m-0">
                <div className="col-12 p-4  ">
                    <div className="p-4 table-products-container">
                        <div className="row">
                            <div className="col-3 img-column">
                                <div className="img-container">
                                    <img src="./img/14.jfif" alt=""/>
                                </div>
                                <button type="button" className="btn btn-editar-producto">
                                    Cargar imagen
                                </button>
                            </div>
                            <div className="col-9 ">
                                <form onSubmit={handleSaveAccessory} className="formulario-editar">
                                    <input required={true} onChange={(e)=>{setName_accessory(e.target.value)}} value={name_accessory} type="text" placeholder="Nombre del producto"/>
                                    <input required={true} onChange={(e)=>{setDescription(e.target.value)}} value={description} type="text" placeholder="Descripcion del producto"/>
                                    <input required={true} onChange={(e)=>{setPrice(e.target.value)}} value={price} type="number" min="0" placeholder="Precio"/>
                                    <input required={true} onChange={(e)=>{setStock(e.target.value)}} value={stock} type="number" min="1" placeholder="stock"/>
                                    <input required={true} onChange={(e)=>{setDiscount(e.target.value)}} value={discount} type="number" placeholder="descuento" min="0" max="100"/>
                                    <select onChange={(e)=>{setAvailable(e.target.value)}} value={available} className="form-select mt-3" aria-label="Default select example">
                                        <option value={true}>Disponible</option>
                                        <option value={false}>No disponible</option>
                                    </select>
                                    <div className="d-flex justify-content-end">
                                        <button type="submit" className="btn btn btn-editar-producto">Guardar cambios</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Editar_producto;



