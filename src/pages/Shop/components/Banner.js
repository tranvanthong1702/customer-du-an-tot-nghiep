import React from "react";
import BGC from "../../../assets/images/banner-blog.png"
import { Link } from "react-router-dom";
function Banner() {
    return (
        <section className="breadcrumb-section set-bg"
            style={{ backgroundImage: `url(${BGC})` }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="breadcrumb__text">
                            <h2>Cửa Hàng Mark Veget</h2>
                            <div className="breadcrumb__option">
                                <Link to="/">Trang chủ</Link>
                                <span>Cửa hàng</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Banner