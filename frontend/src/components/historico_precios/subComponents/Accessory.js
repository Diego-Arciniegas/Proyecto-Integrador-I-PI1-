


function Accessory(props){

    const {id, accessory, user, old_price, new_price} = props;

    return(
        <tr >
            <td scope="row">{id}</td>
            <td scope="row">{accessory.id_accessory}</td>
            <td>
            {(accessory.name_accessory.length>25)?`${accessory.name_accessory.slice(0,25)}...`:accessory.name_accessory}
            </td>
            <td>{user.name_user}</td>
            <td className="stock-column">${old_price}</td>
            <td>${new_price}</td>
        </tr>
    )
}

export default Accessory;
