import React from "react";
import {Swiper, SwiperSlide} from "swiper/swiper-react.cjs";
import SwiperCore, {Pagination, Autoplay} from 'swiper';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

function SwiperComponentShopDetails() {
    SwiperCore.use([Autoplay]);
    SwiperCore.use([Pagination]);

    return (
        < Swiper slidesPerView={3} spaceBetween={30} pagination={{
            "clickable": true
        }
        } className="mySwiper" autoplay={{delay: 5000}}>
            <SwiperSlide>
                <img data-imgbigurl="https://picsum.photos/seed/picsum/270/270"
                     src="https://picsum.photos/seed/picsum/270/270" alt="123"/>
            </SwiperSlide>
            <SwiperSlide>
                <img data-imgbigurl="https://picsum.photos/seed/picsum/270/270"
                     src="https://picsum.photos/seed/picsum/270/270" alt="123"/>
            </SwiperSlide>
            <SwiperSlide>
                <img data-imgbigurl="https://picsum.photos/seed/picsum/270/270"
                     src="https://picsum.photos/seed/picsum/270/270" alt="123"/>
            </SwiperSlide>
            <SwiperSlide>
                <img data-imgbigurl="https://picsum.photos/seed/picsum/270/270"
                     src="https://picsum.photos/seed/picsum/270/270" alt="123"/>
            </SwiperSlide>

        </Swiper>

    )
}

export default SwiperComponentShopDetails
