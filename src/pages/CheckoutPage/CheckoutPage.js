import React from "react";
import MasterLayout from "../../layout/MasterLayout";
import {Link} from "react-router-dom";
import BGC from "../../assets/images/banner-pages.png";
import CheckoutForm from "./components/CheckoutForm";

function CheckoutPage() {
    window.scroll(0,0)
    return (
        <MasterLayout>
            <section
                className="breadcrumb-section set-bg"
                style={{backgroundImage: `url(${BGC})`}}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Checkout</h2>
                                <div className="breadcrumb__option">
                                    <Link to="/">Trang Chủ</Link>
                                    <span>Checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <CheckoutForm/>
        </MasterLayout>
    )
}

export default CheckoutPage