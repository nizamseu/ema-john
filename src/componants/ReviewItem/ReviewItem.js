import React from 'react';
import './reviewitem.css'

const ReviewItem = (props) => {
    const {name,key,price,quantity}=props.product;
    
 
    return (
        <div className="reviewItem">
            <h4 className="product-name">{name}</h4>
            <p>Quantity:{quantity}</p>
            <p><small>Price : ${price}</small></p>
            <br/>
            <button className="btn" onClick={()=>props.removeProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;