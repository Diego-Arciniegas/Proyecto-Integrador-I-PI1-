import {BrowserRouter, Route, Routes, HashRouter, Link} from 'react-router-dom';

import Login from '../components/login/Login.js';
import Register from '../components/register/Register.js';

import Home from '../components/home/Home.js';

import Catalogo from '../components/catalogo/Catalogo.js';

import Favoritos from '../components/favoritos/Favoritos.js';
import Shopping_cart from '../components/shopping_cart/Shopping_cart.js';

import Busqueda from '../components/busqueda/Busqueda.js';

import Accesorio from '../components/accesorio/Accesorio.js';

import Mainadmin from '../components/mainadmin/Mainadmin.js';
import Administrar_productos from '../components/adminstrar_productos/Administrar_productos.js';
import Editar_producto from '../components/editar_producto/Editar_producto.js';

import Facturas from '../components/facturas/Facturas.js';
import Historico_precios from '../components/historico_precios/Historico_precios.js';

import Historico_mp from '../components/historico_movimiento_productos/Historico_mp.js';

import THeader from '../components/templates/Header/THeader.js';
import TFooter from '../components/templates/Footer/TFooter.js';

function Router(){
    return(
        <HashRouter>
            <THeader/>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/catalogo' element={<Catalogo/>}/>
                <Route path='/favoritos' element={<Favoritos/>}/>
                <Route path='/shopping_cart' element={<Shopping_cart/>}/>
                <Route path='/accessories' element={<Busqueda/>}/>
                <Route path='/accessory/:id_accessory' element={<Accesorio/>}/>
                <Route path='/admin/main' element={<Mainadmin/>}/>
                <Route path='/admin/adminstrar_productos' element={<Administrar_productos/>}/>
                <Route path='/admin/accessory/edit' element={<Editar_producto/>}/>
                <Route path='/admin/facturas' element={<Facturas/>}/>
                <Route path='/admin/historico_precios' element={<Historico_precios/>}/>
                <Route path='/admin/historico_movimiento_productos' element={<Historico_mp/>}/>
            </Routes>
            <TFooter/>
        </HashRouter>
    )
}

export default Router;
