import React from "react";
import {Swiper, SwiperSlide} from "swiper/swiper-react.cjs";
import SwiperCore, {Autoplay, Pagination} from 'swiper';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import {Button, notification} from "antd";
import {useDispatch} from "react-redux";
import {addToCart} from "../../../features/slice/cartSlice";


function SwiperComponentShop({categories, products}) {
    SwiperCore.use([Autoplay]);
    SwiperCore.use([Pagination]);
    const dispatch = useDispatch()
    const openNotificationWithIcon = (type, product) => {
        dispatch(addToCart(product))
        notification[type]({
            message: 'Đã thêm giỏ hàng',
            description:
                `Sản phẩm : ${product.name}`,
        });
    };
    const findCateName = (id)=>{
        if (categories){
            const a = categories.filter(item=>item.id===id)[0].name
            return a
        }
    }
    return (

        < Swiper slidesPerView={3} spaceBetween={30} pagination={{
            "clickable": true
        }
        } className="mySwiper" autoplay={{delay: 5000}}>
            {products?.slice(0, 10).filter(item => item.sale > 0).map(prd => {
                return (
                    <SwiperSlide>
                        <div className="col">
                            <div className="product__discount__item">
                                <div className="product__discount__item__pic set-bg">
                                    <img src={prd.image} alt={prd.name}/>
                                    <div className="product__discount__percent">{prd.sale}%</div>
                                    <ul className="product__item__pic__hover">
                                        <li><a href="#"><i className="fa fa-heart"/></a></li>
                                        <li><a href="#"><i className="fa fa-retweet"/></a></li>
                                        <li>
                                            <Button
                                                style={{width: 40, height: 40, borderRadius: 50}}
                                                onClick={() => openNotificationWithIcon('success', prd)}
                                            >
                                                <i className="fa fa-shopping-cart"/>
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="product__discount__item__text">
                                    <span>{findCateName(prd.cate_id)}</span>
                                    <h5><a href="#">{prd.name}</a></h5>
                                    <div className="product__item__price">
                                        {new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        }).format(prd.price - (prd.price / 100 * (prd.sale)))}
                                        <span>
                                            {new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            }).format(prd.price)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                )
            })}
        </Swiper>

    )
}

export default SwiperComponentShop