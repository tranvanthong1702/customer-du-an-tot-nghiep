import React from "react";
import { Swiper, SwiperSlide } from "swiper/swiper-react.cjs";
import { Link } from "react-router-dom";
import SwiperCore, { Autoplay, Pagination ,Navigation} from 'swiper';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

function SwiperComponent({ product }) {
    SwiperCore.use([Autoplay]);
    SwiperCore.use([Pagination]);
    const { loading, status, data } = product
    return (
        <section className="section-swiper">
            <div className="container">
                <Swiper slidesPerView={4} spaceBetween={10} breakpoints={{
                        1024: {
                            slidesPerView: 4,
                            spaceBetween:10,
                        },
                        991: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        480: {
                            slidesPerView: 2.5,
                            spaceBetween: 10,
                        },
                        320: {
                            slidesPerView: 1.5,
                            spaceBetween: 10,
                        }
                    }} pagination={{
                        "clickable": true
                    }}
                     className="mySwiper" autoplay={{ delay: 3000 }}>
                    {loading ? (
                        <div className="d-flex justify-content-center mt-3">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div>
                            {data?.map((product) => {
                                return (

                                    <SwiperSlide key={product.id}>
                                        <div className="">
                                            <div className="categories__item set-bg">
                                                <img src={product.image} />
                                                <h5><Link to={`/detail/${product.id}`}>{product.name}</Link></h5>
                                            </div>
                                        </div>
                                    </SwiperSlide>

                                )
                            })}
                        </div>
                    )}
                </Swiper>
            </div>
        </section>
    )
}

export default SwiperComponent