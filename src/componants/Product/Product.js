import React from 'react';
import './product.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Product = (props) => {
    const {name,img,seller,price,stock,key}=props.productItem;
    // console.log(props.productItem);
    
    
    
    return (
        <div className="product">
            <div className="product-img">
                <img src={img}></img>
            </div>

            <div className="product-info">
            <h4> <Link to={"/product/"+key}>{name}</Link> </h4>
            <p> <small>by:{seller}</small></p>
            <p><small>${price}</small></p>
            <p><small>Only {stock} left inStock -Order sooon</small></p>
            
            {props.showAddToCard===true&& <button className="btn" onClick={()=>props.handleAddEvent(props.productItem)}>
            add to cart
            </button>}

            </div>

        </div>
    );
};

export default Product;