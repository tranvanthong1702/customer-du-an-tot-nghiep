import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import productReducer from "./features/slice/productSlice"
import cartReducer from "./features/slice/cartSlice"
import authReducer from "./features/slice/authSlice"
import {productsAPI} from "./features/api/productAPI";

const store = configureStore({
    reducer: {
        products: productReducer,
        auth: authReducer,
        cart:cartReducer,
        [productsAPI.reducerPath]:productsAPI.reducer,
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsAPI.middleware),

})
// store.dispatch(productsFetch())
// store.dispatch(getTotals())

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
