import React, { useEffect, useState} from 'react';
import { getDatabaseCart, removeFromDatabaseCart} from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useAuth } from '../Login/useAuth';



const Review = () => {
    
    const [cart,setCart]=useState([]);
    // const [orderPlaced,setOrderPlaced]=useState(false);
    const auth=useAuth()
    // const handlePalceOrder=()=>{
    //     setCart([]);
    //     setOrderPlaced(true)
    //     processOrder()
        
    // }

    const removeProduct=(productKey)=>{
        console.log("Remove Clicked",productKey);
        const newCart=cart.filter(pd=>pd.key !==productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey)

    }


    useEffect(()=>{

        const saveCart=getDatabaseCart();
        const productKeys=Object.keys(saveCart);
        console.log(productKeys);
        fetch('http://localhost:4200/getProductByKey',{
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
        },
       
        body: JSON.stringify(productKeys) 

        })
        .then(res => res.json())
        .then (data => {
            
            
            const cartProducts=productKeys.map(key => {
            const product=data.find(pd => pd.key===key);
            product.quantity=saveCart[key];
            return product;
           });
           setCart(cartProducts);
            
        })
             
    },[])

    // let thankYou;
    // if(orderPlaced){
    //     thankYou=<img src={happyImage} alt=""/>
    // }
    return (
        <div className="shop-container">
           <div className="product-container">
           {
                cart.map(pd => <ReviewItem 
                key={pd.key}
                removeProduct={removeProduct}
                product={pd}></ReviewItem>)
                
            }
          
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