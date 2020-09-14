import React, { useState, useEffect } from 'react';
import './shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Shop = () => {
   // const data = fakeData.slice(0, 10)
    const [products, setProducts] = useState([]);
    const [cart,setCart]=useState([]);

    useEffect(()=>{
        fetch('https://intense-savannah-14597.herokuapp.com/products')
        .then(res=> res.json())
        .then(data=>{
            setProducts(data)
        })

    },[])

console.log(products);

    useEffect(()=>{
        const saveCart=getDatabaseCart();
        const productKeys=Object.keys(saveCart);
        if(products.length>0){
            const previousCart=productKeys.map(pdkey =>{
                const product=products.find(pd=>pd.key===pdkey);
                product.quantity=saveCart[pdkey];
                return product;
            })
            setCart(previousCart);
        }
    },[products])

    const handleAddEvent=(productt)=>{
        const toBeAddedKey=productt.key;
        const sameProduct=cart.find(pd=>pd.key===toBeAddedKey);
        let count=1;
        let newCart;
        if (sameProduct){
            const count=sameProduct.quantity+1;
            sameProduct.quantity=count;
            const others=cart.filter(pd=>pd.key!==toBeAddedKey);
            newCart=[...others,productt]

        }
        else{
            productt.quantity=1;
            newCart=[...cart,productt]
        }
        console.log("Added",productt)
        setCart(newCart);
       
        addToDatabaseCart(productt.key,count)
    }
    
    

    return (
        <div className="shop-container">
           
            <div className="product-container">
                
                 <h1> Product:{products.length } </h1>
       
                {products.length && products.map(productData => <Product 
                 key={productData.key}   
                 showAddToCard={true}
                 handleAddEvent={handleAddEvent} 
                 productItem={productData}>

                </Product>)}
            
                 
            </div>


            <div className="product-summary">
               <Cart cart={cart}>
               <Link to="/review">
                    <button className="btn">Review</button>
                </Link>
               </Cart>
            </div>
        </div>
    );
};

export default Shop;