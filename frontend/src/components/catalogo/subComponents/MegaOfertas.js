import Accesory from './Accesory.js';

import { useState, useEffect } from "react";
import axios from 'axios';

const base_url = process.env.REACT_APP_BASE_URL;

function MegaOfertas(props){

    const url_get_accessories = `${base_url}/accessories`;
    
    const [accesories, setAccesories] = useState([]);
    useEffect(()=>{
        handleGetAccesories();
    }, [props.auth]);

    var handleGetAccesories = async ()=>{
        var url_id_user = (props.auth) ? `id_user=${props.auth.id_user}&` : '';
        var {data} = await axios.get(`${url_get_accessories}?${url_id_user}order=discount,DESC`);
        setAccesories(data.slice(0,10));
    }

    return(
        <div className="row col-offers">
            <div className='col carrusel'>
                {
                    accesories.map(accesory=>(
                        <Accesory
                            className="col"
                            key={accesory.id_accessory}
                            user={props.auth}
                            id_accessory={accesory.id_accessory}
                            name={accesory.name_accessory}
                            price={accesory.price}
                            discount={accesory.discount}
                            _favorite={accesory.fav}
                            image_path={accesory.id_accessory}
                        />
                    ))
                }
            </div>
        </div>
    )

}

export default MegaOfertas;

