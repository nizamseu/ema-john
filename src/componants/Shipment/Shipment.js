import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import "./shipment.css";
import { useAuth } from '../Login/useAuth';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import { getDatabaseCart,clearLocalShoppingCart} from '../../utilities/databaseManager';
import CheckoutForm from '../CheckoutForm/CheckoutForm';


const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();
  const [shipInfo,setShipInfo]=useState(null);
  const [orderId,setOrderId]=useState(null);

  const auth = useAuth();
  const stripePromise = loadStripe('pk_test_51HOn6uDksjzqqFPWpU9KvM3jHsl0Cg4wpwvYlWybOzbCah2U3osWjzMiUXmHzwnOL2HZhZH4AovlXccRH3vHW6Nx003QpggDoB');
 
  const onSubmit = data => {
    setShipInfo(data);
    //TODO :Nizam move to this After payment
  
  }

  const handlePlaceOrder = (payment) => {
    console.log(auth.user.email);
    const saveCart = getDatabaseCart();
    const orderDetails = {
      email: auth.user.email,
      cart: saveCart,
      shipment: shipInfo,
      payment:payment
    }
    fetch('http://localhost:4200/placeOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)

    })
      .then(res => res.json())
      .then(order => {
        console.log('order Iddd',order._id);
        setOrderId(order._id);
        clearLocalShoppingCart();

      })

  }



  return (

    <div className="container">
      <div className="row">
        <div style={{display: shipInfo && 'none'}} className="col-md-6">
          <form className="shipment-form" onSubmit={handleSubmit(onSubmit)}>

            <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Name" disabled />
            {
              errors.name && <span className="error">Name  is required</span>
            }

            <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Email" disabled />
            {
              errors.email && <span className="error">email  is required</span>
            }

            <input name="AddressLine1" ref={register({ required: true })} placeholder="Address Line  1" />
            {errors.AddressLine1 && <span className="error">Address is required</span>}

            <input name="AddressLine2" ref={register} placeholder="Address Line  2" />


            <input name="city" ref={register({ required: true })} placeholder="City" />
            {errors.city && <span className="error">City  is required</span>}
            <input name="counrty" ref={register({ required: true })} placeholder="Country" />
            {errors.country && <span className="error">Country  is required</span>}

            <input name="zipcode" ref={register({ required: true })} placeholder="Zip Code" />
            {errors.zipcode && <span className="error">Zip code  is required</span>}
            <br />
            <input type="submit" />
          </form>
        </div>

        <div 
         style={{ margintop:'200px', display: shipInfo ? 'block':'none'}} 
         className="col-md-6">
            <h3>Payment Information</h3>
            <Elements stripe={stripePromise}>
              <CheckoutForm handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
            </Elements>
            <br/>
            {
              orderId && <div>
                <h3>Thank You Withh sopping with us</h3>
                <p>Your orderid is :{orderId}</p>
              </div>
            }
        </div>
      </div>
    </div>

  )
};

export default Shipment;