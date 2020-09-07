import React from 'react';
import { useParams } from 'react-router-dom'
import Product from '../Product/Product';
import { useState } from 'react';
import { useEffect } from 'react';

const ProductDetails = () => {
   const {productKey}= useParams();
   const [product,setProduct]=useState(null);
    
   useEffect(()=>{
       fetch('http://localhost:4200/product/'+ productKey)
       .then(resb=>resb.json())
       .then(data => {
           setProduct(data);
       })
   },[productKey]);
    
    return (
        <div>
            <h1>{productKey} Comming sooooooon</h1>
            {
              product &&  <Product showAddToCard={false} productItem={product}></Product>}
        </div>
    );
};

export default ProductDetails;