import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


function Accessory(props){

    const {accessories, id_accessory, name_accessory, stock, modifiedAccessories, setModifiedAccessories} = props;

    const [modified, setModified] = useState(0);
    const inputStock = useRef();
    const navigate = useNavigate();

    useEffect(()=>{
        if(modifiedAccessories[id_accessory]!==undefined){
            if(modifiedAccessories[id_accessory]<stock){
                setModified(1);
            }else{
                setModified(2);
            }
        }else{
            setModified(0);
        }
    }, [accessories]);

    const set_data = (cant)=>{
        let data = modifiedAccessories;
        data[id_accessory] = cant;
        setModifiedAccessories({...data});
    }

    const handleVeriyModified = (cant)=>{
        if(inputStock.current.value<0){
            set_data(0);
            inputStock.current.value=0;
            cant=0;
        }
        if(cant!=stock){
            set_data(cant);
            if(cant<stock) setModified(1);
            else setModified(2);
        }else{
            setModified(0);
            let data = modifiedAccessories;
            delete data[id_accessory];
            setModifiedAccessories({...data});
        }
    }

    const changeStock = (cant)=>{
        inputStock.current.value = parseInt(inputStock.current.value) + cant;
        handleVeriyModified(inputStock.current.value);
    }

    return(
        <tr >
            <th scope="row">{id_accessory}</th>
            <td style={{"textAlign": "left"}}>{(name_accessory.length>150)?`${name_accessory.slice(0,150)}...`:name_accessory}</td>
            <td className="stock-column">
                <div className="row stock-cant-c">
                    <div className="stock-cant">
                        <button onClick={()=>{changeStock(-1)}} className="stock">-</button>
                    </div>
                    <div className="stock-cant">
                        <input ref={inputStock} onInput={(e)=>{handleVeriyModified(e.target.value)}} title="stock" className={`stock ${(modified==1)?'color-menos':(modified==2)?'color-mas':''}`} defaultValue={stock} type="number"/>
                    </div>
                    <div className="stock-cant">
                        <button onClick={()=>{changeStock(1)}} className="stock">+</button>
                    </div>
                </div>
            </td>
            <td>
                <button onClick={()=>{navigate(`/admin/accessory/edit?id_accessory=${id_accessory}`)}} className="btn btn-edit" type="button">Edit</button>
            </td>
        </tr>
    )
}

export default Accessory;

