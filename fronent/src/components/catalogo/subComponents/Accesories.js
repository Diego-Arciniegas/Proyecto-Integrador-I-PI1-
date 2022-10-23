
//import './Accesories.css';
import Accesory from './Accesory.js';

import {useEffect, useState} from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const base_url = process.env.REACT_APP_BASE_URL;

function Accesories(props){
    const url_get_accessories = `${base_url}/accessories`;
    const [accesories, setAccesories] = useState([]);
    const [searchParams] = useSearchParams();

    useEffect(()=>{
        handleGetAccesories();
    }, [props.auth]);

    var handleGetAccesories = async ()=>{
        var id_user = (props.auth)?`id_user=${props.auth.id_user}`:null;
        var accesory_name = (searchParams.get('accessory'))?`like=name_accessory,${searchParams.get('accessory')}`:null;
        var order_query = searchParams.get('order') || 'id_accessory';
        order_query = order_query.split(',');
        var order = `order=${order_query[0]},${order_query[1] || 'ASC'}`;

        var query_url = `${order}${(id_user) ? `&${id_user}` : ''}${(accesory_name) ? `&${accesory_name}` : ''}`;

        var {data} = await axios.get(`${url_get_accessories}?${query_url}`);
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
    )
}

export default Accesories;
