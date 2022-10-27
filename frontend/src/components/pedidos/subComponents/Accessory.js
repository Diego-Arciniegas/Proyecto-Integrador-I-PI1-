import { useNavigate } from "react-router-dom";


function Accessory(props){

    const navigate = useNavigate();

    const {id_order, user, total_price, quantity, date_creation} = props;

    return(
        <tr>
            <td scope="row">{id_order}</td>
            <td>{user.name_user}</td>
            <td>${total_price}</td>
            <td>{quantity}</td>
            <td>{date_creation.split('T')[0]}</td>
            <td>
                <button onClick={()=>{navigate(`/factura/${id_order}`)}} type="button" className="btn btn-edit">factura</button>
            </td>
        </tr>
    )
}

export default Accessory;


