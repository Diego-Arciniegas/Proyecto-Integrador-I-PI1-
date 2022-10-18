import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from '../components/auth/login/Login.js';
import Register from '../components/auth/register/Register.js';

import Home from '../components/home/Home.js';

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
