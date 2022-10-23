import {useState, useEffect} from 'react';
import axios from 'axios';

const base_url = process.env.REACT_APP_BASE_URL;

function useAuth(){
    const url_auth = `${base_url}/auth`;
    const [idUser, setIdUser] = useState(false);

    useEffect(()=>{
        return ()=>{
            getAuth();
        }
    });

    const getAuth = async()=>{
        try{
            var token = localStorage.getItem('user_token');
            var {data} = await axios.post(url_auth,{},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setIdUser(data.decoded.id_user);
        }catch(error){
            setIdUser(false);
        }
    }

    return idUser;
}

export default useAuth;

