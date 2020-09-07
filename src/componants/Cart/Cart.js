import React from 'react';
// import { UserContest } from '../../App';


const Cart = (props) => {
    const cart=props.cart;
    // const user=useContext(UserContest);
    // console.log(auth.user);
    
// const total=cart.reduce((total,prdPrice)=>total+prdPrice.price,0);
let total=0;
for( let i=0;i<cart.length;i++)
{
    const product=cart[i];
    total=total + product.price* product.quantity;
    
}
    const taxt=total*.15.toFixed(2);
    let shipping=0;
    if(total>15){
        shipping=12.99
    }
    else if(total>35)
    {
        shipping=0
    }
    else if(shipping>0)
    {
        shipping=15.99;
    }

    const grandTotal=Number((total+shipping+taxt).toFixed(2))

    return (
        <div>
            <h1>Cart Area</h1>
            <h1>Summary Area</h1>
                <h5>Summary Count: {cart.length}</h5>
                <p>Product Price: {total.toFixed(2)}</p>
                <p>Shipping Cost: {shipping}</p>
                <p>Text + VAT: {taxt.toFixed(2)}</p>
                <p>Total Price: {grandTotal}</p>
                <br/>
               {
                   props.children
               }
                
                
        </div>
    );
};

export default Cart;