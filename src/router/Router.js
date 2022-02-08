import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import Error404Page from "../pages/Error404Page/Error404Page";
import Shop from "../pages/Shop/Shop";
import ShopDetail from "../pages/ShopDetail/ShopDetail";
import Blog from "../pages/Blog/Blog";
import Contact from "../pages/Contact/Contact";
import LoginPgae from "../pages/Auth/LoginPgae";
import LogoutPage from "../pages/Auth/LogoutPage";
import Register from "../pages/Auth/Register";
import ProfilePage from "../pages/User/ProfilePage";
import Order from "../pages/User/Order";
import Voucher from "../pages/User/Voucher";
import ThankyouPage from "../pages/CheckoutPage/components/ThankyouPage";
import Blog_Detail from "../pages/Blog/Blog-detail";
import { OrderRoutesPath } from "../pages/User/Order.routes";
import FormData from "../pages/CheckoutPage/components/FormData";
import StatusPayment from "../pages/CheckoutPage/components/statusPayment";
import CancelOrderPage from "../pages/User/cancelOrderPage";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/shop" exact>
          <Shop />
        </Route>
        <Route path="/detail/:id" exact>
          <ShopDetail />
        </Route>
        <Route path="/blog" exact>
          <Blog />
        </Route>
        <Route path="/blog-detail/:id" exact>
          <Blog_Detail />
        </Route>
        <Route path="/contact" exact>
          <Contact />
        </Route>
        <Route path="/cart" exact>
          <ShoppingCart />
        </Route>
        <Route path="/checkout" exact>
          <CheckoutPage />
        </Route>
        <Route path="/order">
          <FormData />
        </Route>
        <Route path="/result">
          <StatusPayment />
        </Route>
        <Route path="/thankyou/:user/:id" exact>
          <ThankyouPage />
        </Route>
        <Route path="/login" exact>
          <LoginPgae />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/logout" exact>
          <LogoutPage />
        </Route>
        <Route path="/profile" exact>
          <ProfilePage />
        </Route>
        <Route path={OrderRoutesPath.root}>
          <Order />
        </Route>
        <Route path="/profile/voucher" exact>
          <Voucher />
        </Route>
        <Route path="/error404" exact>
          <Error404Page />
        </Route>
        <Route path="/cancel/:id" exact>
          <CancelOrderPage />
        </Route>
        <Redirect from="*" to="/error404" />
      </Switch>
    </Router>
  );
}

export default Routes;
