import React, { useRef, useEffect, useState } from 'react';
import logo from '../../images/logo.png';
import './header.css';
import {useAuth} from '../Login/useAuth';
import { Link } from 'react-router-dom';

const usePrevious=value =>{
    const prev=useRef();
    useEffect( () =>{
        prev.current=value;
    },[value])
    return prev.current;
}

const Header = () => {
    const auth= useAuth()
    // const [count,setCount]=useState(0);
    // const previous=usePrevious(count);
    // console.log(auth);
    
    return (
        <div className="header">
        <img src={logo} alt=""/>
        <nav>
            <a href="/shop">Shop</a>
            <a href="/order">Order</a>
            <a href="/review">Review</a>
                    {/* <span> Count:{count}  
                    <button onClick={() => setCount(count+1)}>+</button> 
                    <button onClick={() => setCount(count-1)}>-</button> 
                    Previous:{previous} 
                    </span> */}
                {
                    auth.user &&
                    <span> Welcom {auth.user.name }  </span>
                   
                }    
                {
                    auth.user ?  <a href="/login">Sign Out</a>
                    :  <a href="/login">Signin</a>
                }
        </nav>
        <section>
            <input placeholder="SEARCH"></input>
        </section>
        </div>
    );
};

export default Header;