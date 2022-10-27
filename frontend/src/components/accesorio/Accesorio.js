
import './Accesorio.css';

import TBusqueda from '../templates/Busqueda/TBusqueda.js';

import MegaOfertas from '../catalogo/subComponents/MegaOfertas.js';
import useAuth from '../../hooks/useAuth.js';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';


const base_url = process.env.REACT_APP_BASE_URL;

function Accesorios(){

    const auth = useAuth();
    const {id_accessory} = useParams();

    const [accesory, setAccesory] = useState({});
    const [cant, setCant] = useState(1);
    const inputCant = useRef();

    useEffect(()=>{
        handleGetAccesory();
    }, []);

    const handleSetCantidad = (addCant)=>{
        if(inputCant.current.value===""){
            inputCant.current.value = "1";
            setCant(1);
        }
        if(cant+addCant<=0) return;
        inputCant.current.value=(parseInt(cant)+parseInt(addCant));
        setCant(parseInt(cant)+parseInt(addCant));
    }

    const handleSetCantidad2 = (e)=>{
        if(e.target.value=="") return;
        if(e.target.value<=0){
            e.target.value = 1;
            setCant(1);
        }else{
            setCant(parseInt(e.target.value));
        }
    }

    const handleGetAccesory = async ()=>{
        var {data} = await axios.get(`${base_url}/accessories/${id_accessory}`);
        setAccesory(data);
    }

    const handleAddToShoppingCart = async ()=>{
        if(auth){
            try{
                await axios.post(`${base_url}/users/${auth.id_user}/shopping_cart`);
                await axios.post(`${base_url}/users/${auth.id_user}/shopping_cart/accessories/${id_accessory}?quantity=${cant}`);
                alert('Agregado(s) al carrito');
                setCant(1);
            }catch(error){
                console.log(error);
            }
        }
    }
    
    return(
        <div className='accesorios'>
            <TBusqueda auth={auth}></TBusqueda>

            <div className="row guardados-container ">
                <div className="col-9 ">
                    <div className="box mt-3 mb-3 ms-3 principal ">
                            <div className="col-6 container-img-main pe-3">
                                <img className="main-img" src={`/images/${accesory.id_accessory}.jpg`} alt=""/>
                            </div>
                            <div className="col-6">
                                <p className="name-product">{accesory.name_accessory}</p>
                                <div className="d-flex flex-row align-items-center   mt-3">
                                    <p className="m-0 discount fw-bold">
                                        {`${(accesory.discount!=0)?`-${accesory.discount}%`:''}`}
                                    </p>
                                    <p className="name-product fw-bold" style={{'margin': '0px'}}>
                                        ${`${(accesory.discount!=0)?(accesory.price*(100-accesory.discount)/100):accesory.price}`}
                                    </p>
                                </div>
                                <p className="m-0 last-price">
                                    {`${(accesory.discount!=0)?`$${accesory.price}`:''}`}
                                </p>
                                <p>
                                    <b>DESCRIPCION</b><br/> 
                                    {accesory.description}
                                </p>
                            </div>
                            <div className="col-auto">
                                <i className="bi bi-heart-fill corazon "></i>
                            </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="box mt-3 mb-3 me-3 d-flex flex-column">
                        <p className="name-description mb-1">
                            <b>${(cant*accesory.price)*(100-accesory.discount)/100}</b>
                        </p>
                        <p className="bold-carrito ">
                            Disponible
                        </p>
                        <div className="d-flex align-items-center">
                            <button onClick={()=>{handleSetCantidad(-1)}} type="button" className="btn">-</button>
                            <input ref={inputCant} onInput={handleSetCantidad2} defaultValue={cant} title="cantidad" type="number" className="cantidad" />
                            <button onClick={()=>{handleSetCantidad(1)}} type="button"  className="btn"><b>+</b></button>
                        </div>

                        <button onClick={handleAddToShoppingCart} className="btn mt-3" id="comprar" type="button">Agregar al carrito</button>
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
        
            <div className="row m-0 pb-5">
                <div className="col-12">
                    <div className="box mega-ofertas d-flex flex-column me-3 ms-3">
                        <div className="megaofertas-title">
                            <h4 className="ofertas-title">Accesorios Relacionados</h4>
                        </div>
                        <MegaOfertas auth={auth}></MegaOfertas>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accesorios;

