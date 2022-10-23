
//import './Accesories.css';
import Accesory from './Accesory.js';

import {useEffect, useState} from 'react';
import axios from 'axios';

const base_url = process.env.REACT_APP_BASE_URL;

function Accesories(props){

    const url_get_accessories = `${base_url}/accessories`;
    const [accesories, setAccesories] = useState([]);

    useEffect(()=>{
        handleGetAccesories();
    }, [props.id_user]);

    var handleGetAccesories = async ()=>{
        var url_id_user = (props.id_user ? `id_user=${props.id_user}` : '');
        var {data} = await axios.get(`${url_get_accessories}?${url_id_user}`);
        setAccesories(data.slice(0,50));
    }

    return(
        <div className="table-accesories">
            {(accesories.length == 0)
                ? 'Loading ... ' :
                accesories.map((accesory)=>(
                    <Accesory
                        className="accesory"
                        key={accesory.id_accessory}
                        id_user={props.id_user}
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
    )
}

export default Accesories;
