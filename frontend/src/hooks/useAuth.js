import {useState, useEffect} from 'react';
import axios from 'axios';

const base_url = process.env.REACT_APP_BASE_URL;

function useAuth(){
    const url_auth = `${base_url}/auth`;
    const [user, setUser] = useState(null);

    useEffect(()=>{
        return ()=>{
            getAuth();
        }
    }, []);

    const getAuth = async()=>{
        try{
            var token = localStorage.getItem('user_token');
            var {data} = await axios.post(url_auth,{},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            var {data} = await axios.get(`${base_url}/users/${data.decoded.id_user}`);
            setUser(data);
        }catch(error){
            setUser(null);
        }
    }

    return user;
}

export default useAuth;

