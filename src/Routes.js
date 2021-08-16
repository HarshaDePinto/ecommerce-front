import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "./user/SignUp";
import SignIn from "./user/SignIn";
import Home from "./core/Home";
import Dashboard from "./user/UserDashboard";
import PrivateRoute from "./auth/PrivatRoute";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import Product from './core/Product';
import Cart from './core/Cart';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/sign-up" exact component={SignUp} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <Route path="/product/:productId" exact component={Product} />
        <Route path="/cart" exact component={Cart} />
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
