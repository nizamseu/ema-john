import React, { useContext, useEffect } from 'react'
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState, createContext } from "react";
import { Route,Redirect } from "react-router-dom"


firebase.initializeApp(firebaseConfig);

const AuthContest=createContext();
export const AuthContestProvider= (props)=>{
    const auth=Auth();
    return <AuthContest.Provider value={auth}>{props.children}</AuthContest.Provider>

}

export const useAuth= ()=> useContext(AuthContest);


export function PrivateRoute({ children, ...rest }) {
  const auth=useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const getUser = user =>{
        const {displayName,email,photoURL}=user;
        return {name:displayName,email,photo:photoURL};
}

const Auth= ()=>{
  const [user,setUser]=useState(null)

    const signin= ()=>{
    const  provider = new firebase.auth.GoogleAuthProvider();
   return firebase.auth().signInWithPopup(provider)
    .then(res =>{
        const signedInUser= getUser(res.user)
        setUser(signedInUser);
        return res.user;
        
    })
    .catch(err =>{
        console.log(err);
        setUser(null)
        return err.mesage;
    })
  }

  const signout= () =>{
    return firebase.auth().signOut()
    .then(() => {
      setUser(null)
    }).catch(err =>{
      console.log(err);
      
    });
  }

  useEffect( () => {
    firebase.auth().onAuthStateChanged(function(usr){
      if (usr){
        const currUser = getUser(usr)
          setUser(currUser)
          
      }else{

      }
    })
  },[])

  return  {
    user,
    signin,
    signout,
  };
}




export default Auth;