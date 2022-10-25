
import './Mainadmin.css';

import Header_admin from '../templates/Header_admin/Header_admin.js';
import useAuth from '../../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';

function Mainadmin(){

    const navigate = useNavigate();

    const auth = useAuth();

    return(
        <div>
            <Header_admin
                auth={auth}
                title={"Main"}
            />
            <div className="row mt-5 mb-0 ms-0 me-0 d-flex justify-content-center container-opt">
            <div className="container-opt">
                <div className="row">
                    <div className="col-4 container-btn">
                        <button onClick={()=>{navigate('/admin/historico_movimiento_productos')}} type="button" className="btn">
                            <i className="bi bi-newspaper"></i>
                            Movimientos productos
                        </button>
                    </div>
                    <div className="col-4 container-btn">
                        <button onClick={()=>{navigate('/admin/adminstrar_productos')}} type="button" className="btn">
                            <i className="bi bi-gear"></i>
                            Administrar productos
                        </button>
                    </div>
                    <div className="col-4 container-btn">
                        <button onClick={()=>{navigate('/admin/accessory/edit')}} type="button" className="btn">
                            <i className="bi bi-bag-plus"></i>
                            Agregar productos
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 container-btn">
                        <button onClick={()=>{navigate('/admin/facturas')}} type="button" className="btn">
                            <i className="bi bi-receipt"></i>
                            Facturas
                        </button>
                    </div>
                    <div className="col-4 container-btn">
                        <button onClick={()=>{navigate('/admin/historico_precios')}} type="button" className="btn">
                            <i className="bi bi-bag-plus"></i>
                            Historico de precios
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Mainadmin;

