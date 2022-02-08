import React, { useEffect } from "react";
import MasterLayout from "../../layout/MasterLayout";
import { Link } from "react-router-dom";
import BGC from "../../assets/images/banner-pages.png"
import { useDispatch, useSelector } from "react-redux";
import { clearCart, decreaseCart, getTotals, increaseCart, removeItemFromCart } from "../../features/slice/cartSlice";
import { Button, notification } from 'antd';

function ShoppingCart() {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    useEffect(() => {
        dispatch(getTotals())
    }, [cart, dispatch])
    const handleDec = (cartItem) => {
        dispatch(decreaseCart(cartItem))
    }
    const handleInc = (cartItem) => {
        dispatch(increaseCart(cartItem))
    }
    const openNotificationWithIcon = (type, cartItem) => {
        dispatch(removeItemFromCart(cartItem))
        notification[type]({
            message: 'Đã xóa',
            description:
                `Sản phẩm : ${cartItem.name}`,
        });
    };
    const clear = () => {
        dispatch(clearCart())
    }
    return (
        <MasterLayout>
            <section
                className="breadcrumb-section set-bg"
                style={{ backgroundImage: `url(${BGC})` }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Shopping Cart</h2>
                                <div className="breadcrumb__option">
                                    <Link to="/">Home</Link>
                                    <span>Shopping Cart</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="shoping-cart spad">
                <div className="container">
                    {cart.cartItems.length === 0
                        ? (<div className="cart-empty">
                            <div className="row back-link">
                                <Link to="/"><i className="fa fa-arrow-left" aria-hidden="true" />Continue shopping cart</Link>
                            </div>
                            <div className="row back-link">
                                <span>Your Cart Empty</span>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 image-empty">
                                    <img src={require('../../assets/images/empty-cart.png').default} alt="" />
                                </div>
                            </div>
                        </div>)
                        : (
                            <div className="row">
                                <div className="col-lg-9">
                                    <div className="shoping__cart__table">
                                        <div className="row mb-3 bd-bt">
                                            <div className="col-lg-5 col-md-5 d-flex fz18px fw-b">Tên sản phẩm</div>
                                            <div className="col-lg-2 col-md-2 d-flex justify-content-center fz18px fw-b">Đơn giá</div>
                                            <div className="col-lg-2 col-md-2 d-flex justify-content-center fz18px fw-b">Số lượng</div>
                                            <div className="col-lg-2 col-md-2 d-flex justify-content-center fz18px fw-b">Thành tiền</div>
                                            <div className="col-lg-1 col-md-1 d-flex justify-content-center" />
                                        </div>
                                        <div className="">
                                            {cart.cartItems?.map((cartItem, index) => (
                                                <div className="row mb-3 pb-3 bd-bt" key={index}>
                                                    <div className="col-lg-5 col-md-5 d-flex align-items-center  shoping__cart__item">
                                                        <img src="https://picsum.photos/seed/picsum/101/100"
                                                            alt="" className="img-fluid img_"/>
                                                        <p className="name_pro fz18px fw-b">{cartItem.name}</p>
                                                    </div>
                                                    <div className="col-lg-2 col-md-2 d-flex align-items-center justify-content-center shoping__cart__price">
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        }).format(cartItem.price)}
                                                    </div>
                                                    <div className="col-lg-2 col-md-2 d-flex align-items-center justify-content-center shoping__cart__quantity">
                                                        <div className="quantity">
                                                            <button
                                                                className="btn-qty"
                                                                onClick={() => handleDec(cartItem)}
                                                            >-
                                                            </button>
                                                            <div className="pro-qty">
                                                                <span>{cartItem.cartQuantity}</span>
                                                            </div>
                                                            <button
                                                                onClick={() => handleInc(cartItem)}
                                                                className="btn-qty"
                                                            >+
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-2 d-flex align-items-center justify-content-center shoping__cart__total">
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        }).format(cartItem.price * cartItem.cartQuantity)}
                                                    </div>
                                                    <div className="col-lg-1 col-md-1 d-flex align-items-center justify-content-center shoping__cart__item__close">
                                                        <button className="btn_delete"
                                                            onClick={() => openNotificationWithIcon('error', cartItem)}>
                                                            <i className="fa fa-window-close" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="shoping__cart__btns">
                                                <Link to="/" className="primary-btn">
                                                    <i className="fa fa-arrow-left" aria-hidden="true" />
                                                    Mua hàng ngay
                                                </Link>
                                                <button
                                                    onClick={() => clear()}
                                                    className="primary-btn cart-btn cart-btn-right"
                                                >
                                                    Xóa giỏ hàng
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="shoping__checkout">
                                        <h5>Giỏ Hàng</h5>
                                        <ul>
                                            <li>Tổng tiền hàng<span>{new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            }).format(cart.cartTotalAmount)}</span></li>
                                        </ul>
                                        <Link to="/order" className="primary-btn">Tạo đơn hàng</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
            </section>
        </MasterLayout>
    )
}

export default ShoppingCart