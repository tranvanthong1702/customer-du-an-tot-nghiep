import React from "react";
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/swiper-react.cjs";
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
function BlogComponent({ blogs }) {
    const { data, loading } = blogs
    SwiperCore.use([Autoplay]);
    SwiperCore.use([Navigation]);
    console.log(data)
    return (
        <section className="from-blog spad">
            <div className="container">
                <div className="section-title from-blog__title">
                    <p className="title-prohot">Tin tức</p>
                </div>
                {loading ? (
                    <div className="d-flex justify-content-center mt-3">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div>
                        {data ? (
                            <Swiper spaceBetween={10} breakpoints={{
                                1024: {
                                    slidesPerView: 3.5,
                                    spaceBetween: 10,
                                },
                                991: {
                                    slidesPerView: 3.5,
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
                            }}  loop={true}
                                loopFillGroupWithBlank={true}
                                navigation={true}
                                className="mySwiper" autoplay={{ delay: 4000 }}>
                                {data.map(blog => {
                                    return (
                                        <SwiperSlide key={blog.id}>
                                            <div className="blog__item">
                                                <Link to={`/blog-detail/${blog.id}`} className="img__">
                                                    <img src={blog.image} alt={blog.name} className="w-full-image" />
                                                </Link>
                                                <div className="blog__item__text">
                                                    <div className="title-blog">
                                                        <Link to={`/blog-detail/${blog.id}`}>{blog.title}</Link>
                                                    </div>
                                                    <div className="day-date">
                                                        <i className="fa fa-calendar-o" />{blog.created_at.slice(0, 10)}
                                                    </div>
                                                    <p className="content">
                                                        {blog.content.slice(0, 100)}
                                                    </p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        ) : (
                            <div className="text-center mt-3">
                                <span>
                                    OMG <i className="fa fa-frown-o" aria-hidden="true" /> !
                                </span>
                                <div>
                                    Chưa có tin tức nào mới cả !
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}

export default BlogComponent