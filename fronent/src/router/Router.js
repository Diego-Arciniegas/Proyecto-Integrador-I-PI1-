import {BrowserRouter, Route, Routes, HashRouter, Link} from 'react-router-dom';

import Login from '../components/auth/login/Login.js';
import Register from '../components/auth/register/Register.js';

import Home from '../components/home/Home.js';

import Catalogo from '../components/catalogo/Catalogo.js';

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/catalogo' element={<Catalogo/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
