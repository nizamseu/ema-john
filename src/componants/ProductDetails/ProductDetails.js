import React from 'react';
import { useParams } from 'react-router-dom'
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
   const {productKey}= useParams();
    const product3= fakeData.find(pd=>pd.key===productKey)
    // console.log(product3);
    
    return (
        <div>
            <h1>{productKey} Comming sooooooon</h1>
            <Product showAddToCard={false} productItem={product3}></Product>
        </div>
    );
};

export default ProductDetails;