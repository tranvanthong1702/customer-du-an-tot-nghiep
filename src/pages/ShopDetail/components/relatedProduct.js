import React from "react";
import { Link } from "react-router-dom"
import { Button, notification } from "antd";
import { addToCart } from "../../../features/slice/cartSlice";
import { useDispatch } from "react-redux";

function RelatedProduct({ products, loading }) {
    const dispatch = useDispatch()
    const openNotificationWithIcon = (type, product) => {
        dispatch(addToCart(product))
        notification[type]({
            message: 'Đã thêm giỏ hàng',
            description:
                `Sản phẩm : ${product.name}`,
        });
    };
    return (
        <div>
            <section className="related-product">
                <div className="container">
                    <div className="row">
                        <div className="section-title related__product__title">
                            <div className="title-big__all">Sản phẩm liên quan</div>
                        </div>
                    </div>
                    {loading ? (
                        <div>
                            <div className="d-flex justify-content-center mt-3">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            {!products ? (
                                <div>
                                    <div className="text-center mt-3">
                                        <span>
                                            OMG <i className="fa fa-frown-o" aria-hidden="true" /> !
                                        </span>
                                        <div>
                                            No Result
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="row">
                                    {products.map(prd => {
                                        return (
                                            <div className="col-lg-3 col-md-4 col-sm-6" key={prd.id}>
                                                <div className="featured__item">
                                                    <div className="featured__item__pic set-bg">
                                                        <Link to={`/detail/${prd.id}`} className="img__">
                                                            <img src={prd.image} alt={prd.name} className="w-full-image" />
                                                        </Link>
                                                    </div>
                                                    <div className="featured__item__text">
                                                        <div className="name-pro">
                                                            <Link to={`/detail/${prd.id}`} >{prd.name}</Link>
                                                        </div>
                                                        <div className="d-flex justify-content-around">
                                                            <p className="price-pro">
                                                                <strike>
                                                                    {new Intl.NumberFormat("vi-VN", {
                                                                        style: "currency",
                                                                        currency: "VND",
                                                                    }).format(prd.price)}
                                                                </strike>
                                                            </p>
                                                            <p className="text-danger price-pro ml-3">
                                                                {new Intl.NumberFormat("vi-VN", {
                                                                    style: "currency",
                                                                    currency: "VND",
                                                                }).format(
                                                                    prd.price - (prd.price * prd.sale) / 100
                                                                )}
                                                            </p>
                                                        </div>
                                                        {prd.status !== 0 ? (
                                                            <div className="btn_ct">
                                                                <Link to='/contact'>
                                                                    <span>Liên hệ</span>
                                                                </Link>
                                                                <button className="btn-cart"
                                                                    style={{ width: 40, height: 40, borderRadius: 50 }}
                                                                    onClick={() =>
                                                                        openNotificationWithIcon("success", prd)
                                                                    }
                                                                >
                                                                    <i className="fa fa-cart-plus" />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="btn_ct">
                                                                <Link to='/contact'>
                                                                    <span>Liên hệ</span>
                                                                </Link>
                                                                <p className="text-danger">Hết hàng</p>
                                                            </div>
                                                        )}
                                                        <div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default RelatedProduct