import React, { useEffect, useState, useContext } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { auth } from 'firebase';
import { useAuth } from '../Login/useAuth';



const Review = () => {
    
    const [cart,setCart]=useState([]);
    const [orderPlaced,setOrderPlaced]=useState(false);
    const auth=useAuth()
    const handlePalceOrder=()=>{
        setCart([]);
        setOrderPlaced(true)
        processOrder()
        
    }

    const removeProduct=(productKey)=>{
        console.log("Remove Clicked",productKey);
        const newCart=cart.filter(pd=>pd.key !==productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey)

    }


    useEffect(()=>{

        const saveCart=getDatabaseCart();
        const productKeys=Object.keys(saveCart);
        const cartProducts=productKeys.map(key=>{
            const product=fakeData.find(pd=>pd.key===key);
            product.quantity=saveCart[key]
            return product;
       })
       
       setCart(cartProducts);
        
    },[])

    let thankYou;
    if(orderPlaced){
        thankYou=<img src={happyImage} alt=""/>
    }
    return (
        <div className="shop-container">
           <div className="product-container">
           {
                cart.map(pd=> <ReviewItem 
                key={pd.key}
                removeProduct={removeProduct}
                product={pd}></ReviewItem>)
                
            }
            { thankYou}
            {
                !cart.length && <h1 className="degign"> Your Cart Is empty <a href="/shop">Keep Shopping!</a></h1>
            }

           </div>

           <div className="product-summary">

                <Cart cart={cart}>
                    <Link to="shipment">
                    {
                        auth.user?
                        <button className="btn" >Proceed Shipment</button>
                        :
                        <button className="btn" >Log In Proceed </button>
                    }
                    </Link>
                </Cart>

           </div>
            
        </div>
    );
};

export default Review;