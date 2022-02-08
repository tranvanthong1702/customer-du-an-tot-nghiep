import React from "react";
import { Link } from "react-router-dom"

function TopNew({ product }) {
    const { loading, data: products } = product
    const convertDate = (data) => {
        const date = new Date(data)
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }
    return (
        <div className="col-lg-4 col-md-6 mb-3">
            <div className="latest-product__text">
                <div className="title_pro">Mới về</div>
                {loading ? (
                    <div className="d-flex justify-content-center mt-3">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div>
                        {products ? (
                            <div>
                                {products?.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 5).map(prd => {
                                    return (
                                        <div className="row latest-product__slider owl-carousel mb-3" key={prd.id}>
                                            <div className="col-lg-4 col-md-4 col-6 latest-product__item__pic">
                                                <Link to={`/detail/${prd.id}`} className="latest-product__item">
                                                    <img src={prd.image} alt="Img-Product" className="img-fluid" />
                                                </Link>
                                            </div>
                                            <div className="col-lg-8 col-md-8 col-6 latest-product__item__text">
                                                <div className="name-pro">
                                                    <Link to={`/detail/${prd.id}`} className="latest-product__item">{prd.name}</Link>
                                                </div>
                                                <p className="price-pro">
                                                    {new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    }).format(prd.price)}
                                                </p>
                                                <p className="mt-2 day-date">
                                                {convertDate(prd.updated_at)}
                                                </p>
                                            </div>

                                        </div>
                                    )
                                })}
                            </div>
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

export default TopNew
