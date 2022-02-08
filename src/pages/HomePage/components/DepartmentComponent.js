import React, { useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../../../assets/images/slide.jpg";
import Banner1 from "../../../assets/images/slide1.jpg";
import { Swiper, SwiperSlide } from "swiper/swiper-react.cjs";
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
// install Swiper modules
SwiperCore.use([Pagination, Navigation]);
function DepartmentComponent({ category }) {
    const [showCategory, setShowCategory] = useState(true)
    const { loading, status, data } = category
    SwiperCore.use([Autoplay]);
    SwiperCore.use([Pagination]);
    return (
        <section className="hero">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="hero__categories">
                            <div className="hero__categories__all" onClick={() => {
                                setShowCategory(!showCategory)
                            }}>
                                <i className="fa fa-bars" />
                                <span>Danh mục sản phẩm</span>
                            </div>
                            {loading ?
                                (
                                    <div className="d-flex justify-content-center mt-3">
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        {data ? (
                                            <ul style={{ display: showCategory ? '' : 'none' }}>
                                                {data.slice(0, 11).map((cate) => {
                                                    return (
                                                        <li key={cate.id}><Link to="/">{cate.name}</Link></li>
                                                    )
                                                })}
                                            </ul>
                                        ) : (
                                            <div className="text-center mt-3">
                                                <span>
                                                    OMG <i className="fa fa-frown-o" aria-hidden="true" /> !
                                                </span>
                                                <div>
                                                    No Result
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="hero__search">
                            <div className="hero__search__form">
                                <form action="#">
                                    <input type="text" placeholder="Bạn cần tìm gì ?" />
                                    <button type="submit" className="site-btn btn-header">Tìm kiếm</button>
                                </form>
                            </div>
                        </div>
                        <div className="hero-item">
                            <Swiper className="mySwiper hero" autoplay={{ delay: 3000 }}>
                                <SwiperSlide>
                                    <div className="hero__ set-bg">
                                        <img src={Banner} />
                                        <div className="hero__text d-none d-lg-block d-md-block">
                                            <span>Trái cây tươi</span>
                                            <h2>Vegetable <br />100% hữu cơ</h2>
                                            <p>Nhận và giao hàng miễn phí</p>
                                            <Link to="/shop" className="primary-btn">Mua ngay</Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="hero__ set-bg" >
                                        <img src={Banner1} />
                                        <div className="hero__text d-none d-lg-block d-md-block">
                                            <span>Trái cây tươi</span>
                                            <h2>Vegetable <br />100% hữu cơ</h2>
                                            <p>Nhận và giao hàng miễn phí</p>
                                            <Link to="/shop" className="primary-btn">Mua ngay</Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DepartmentComponent