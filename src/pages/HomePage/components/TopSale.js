import React from "react";
import SALE from "../../../assets/images/sale.png"
import { Link } from "react-router-dom"


function TopSale({ product }) {
    const { loading, data: products } = product
    const convertDate = (data) => {
        const date = new Date(data)
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }
    return (
        <div className="col-lg-4 col-md-6 mb-3">
            <div className="latest-product__text">
                <div className="title_pro">Giảm giá</div>
                {loading ? (
                    <div className="d-flex justify-content-center mt-3">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div>
                        {products ? (
                            products?.sort((a, b) => new Date(b.sale) - new Date(a.sale)).slice(0, 5).filter(item => item.sale > 0).map(prd => {
                                return (
                                    <div className="row latest-product__slider owl-carousel mb-3 position-relative" key={prd.id}>
                                        <div className="col-lg-4 col-md-4 col-6 latest-product__item__pic">
                                            <Link to={`/detail/${prd.id}`} className="latest-product__item">
                                                <img src={prd.image} alt="Img-Product" className="img-fluid" />
                                            </Link>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-6 latest-product__item__text">
                                            <div className="name-pro">
                                                <Link to={`/detail/${prd.id}`} className="latest-product__item">{prd.name}</Link>
                                            </div>
                                            <div className="price_ d-flex ">
                                                <p className="price-pro mr-1">
                                                    {new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    }).format(prd.price)}
                                                </p>
                                                <p className="price-pro text-danger">
                                                    {new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    }).format(prd.price - (prd.price * prd.sale / 100))}
                                                </p>
                                            </div>
                                            <p className="mt-2 day-date">
                                                {convertDate(prd.updated_at)}
                                            </p>
                                        </div>
                                        <div class="box-sale">
                                            <div class="_3yCxz- _3aFlEb _3Kq1-f">
                                                <span class="percent">{prd.sale}%</span>
                                                <span class="WL8HRl">Giảm</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="">
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
    )
}

export default TopSale