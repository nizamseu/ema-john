import React from 'react';
import Auth from './useAuth';

const Login = () => {
    const auth=Auth();
    const handleSignIn = () =>{
        auth.signin()
        .then(res => {
           window.location.pathname = "/review";
            
        })
    }
 
    const handleSignOut = () => {
        auth.signout()
        .then(res => {
            window.location.pathname = "/shop";
        })
    }
  
   
    return (
        <div>
            <h1>This is Login Page</h1>
            {   auth.user ? <button onClick={handleSignOut}>Sign Out</button>:
                <button onClick={handleSignIn}>Sign In</button>}
        </div>
    );
};

export default Login;