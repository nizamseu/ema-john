import React, { createContext } from 'react';
import './App.css';
import Header from './componants/Header/Header';
import Shop from './componants/Shop/Shop';
import Order from './componants/Order/Order';
import Review from './componants/Review/Review';
import Nomatch from './componants/NoMatch/Nomatch';
import ProductDetails from './componants/ProductDetails/ProductDetails';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Login from './componants/Login/Login';
import { AuthContestProvider, PrivateRoute } from './componants/Login/useAuth';
import Shipment from './componants/Shipment/Shipment';




function App() {
  return (
    <div>
    <AuthContestProvider>
    <Header></Header>
        <Router>
            <Switch>
                <Route path="/shop">
                <Shop></Shop>
                </Route>

                <Route path="/order">
                  <Order></Order>
                </Route>
                
                <Route path="/review">
                  <Review></Review>
                </Route>
                <Route path="/login">
                  <Login></Login>
                </Route>

              <PrivateRoute path="/shipment">
                <Shipment></Shipment>
              </PrivateRoute>

                <Route exact path="/">
                <Shop></Shop>
                </Route>
                
                <Route path="/product/:productKey">
                  <ProductDetails></ProductDetails>
                </Route>

                <Route path="*">
                  <Nomatch></Nomatch>
                </Route>

            </Switch>
        </Router>
     
        </AuthContestProvider>
     
    </div>
  );
}

export default App;
