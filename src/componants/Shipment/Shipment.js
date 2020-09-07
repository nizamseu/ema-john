import React from 'react';
import { useForm } from 'react-hook-form';
import "./shipment.css";
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';


const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const auth=useAuth();
    const onSubmit = data => { 
      console.log(data) 
    //TODO :Nizam move to this After payment
  console.log(auth.user.email);
  const saveCart= getDatabaseCart();
  const orderDetails={email:auth.user.email,cart:saveCart}
  fetch('http://localhost:4200/placeOrder',{
    method: 'POST', 
    headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify(orderDetails) 

})
.then(res =>res.json())
.then(data => {
  console.log('order Placed');
  alert('suceesfully placed,Order Id : '+ data._id);
  processOrder();

})

    }


   

    return (
      <form className="shipment-form" onSubmit={handleSubmit(onSubmit)}>

        <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Name" disabled />
        {
            errors.name && <span className="error">Name  is required</span>
        }
       
        <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Email" disabled/>
        {
            errors.email && <span className="error">email  is required</span>
        }

        <input name="AddressLine1" ref={register({ required: true })} placeholder="Address Line  1" />
        {errors.AddressLine1 && <span className="error">Address is required</span>}

        <input name="AddressLine2" ref={register}  placeholder="Address Line  2"/>
       

        <input name="city" ref={register({ required: true })} placeholder="City" />
        {errors.city && <span className="error">City  is required</span>}
        <input name="counrty" ref={register({ required: true })} placeholder="Country" />
        {errors.country && <span className="error">Country  is required</span>}

        <input name="zipcode" ref={register({ required: true })} placeholder="Zip Code" />
        {errors.zipcode && <span className="error">Zip code  is required</span>}
        <br/>
        <input type="submit" />
      </form>
    )
};

export default Shipment;