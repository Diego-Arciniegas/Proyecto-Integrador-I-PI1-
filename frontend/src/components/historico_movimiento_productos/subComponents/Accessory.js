


function Accessory(props){

    const {id, accessory, quantity, user, since, towards} = props;
    
    return(
        <tr>
            <td scope="row">{id}</td>
            <td scope="row">{accessory.id_accessory}</td>
            <td>{user.name_user}</td>
            <td>{quantity}</td>
            <td>{since}</td>
            <td>{towards}</td>
            <td>
                <button type="button" className="btn btn-edit">factura</button>
            </td>
        </tr>
    )
}

export default Accessory;
