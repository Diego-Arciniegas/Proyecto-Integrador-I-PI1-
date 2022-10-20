
//import './Accesory.css';


function Accesory(props){
    const {image_path, price, discount, description, accesory} = props;
    return(
        <div className={`col ${accesory ? accesory : ''}`}>
            <img src={`./img/${image_path}.jpg`} alt=""/>
            <div className="price">
                <h4>${price}</h4>
                <h4><span className="discount">{(discount!=0) ? `-${discount}%` : ''}</span></h4>
            </div>
            <p className="description">{description}</p>
            <div className="flex-row">
                <button className='btn'><i class="bi bi-cart2 h6" style={{'fontSize': '25px'}}></i></button>
                <button className='btn'><i class="bi bi-heart h6" style={{'fontSize': '25px'}}></i></button>
                
            </div>
        </div>
    )
}

export default Accesory;
