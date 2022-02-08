import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../features/slice/cartSlice";
import { Button, notification } from "antd";

function FeatureComponent({ product, category }) {
  const dispatch = useDispatch();
  const { loading: lPrd, data: listProducts } = product;
  const [categorySelected, setCategorySelected] = useState(null);

  const products = useMemo(
    () =>
      categorySelected
        ? listProducts.filter((i) => i.cate_id === categorySelected)
        : listProducts,
    [listProducts, categorySelected]
  );
  const { loading: lCate, data: categories } = category;
  const openNotificationWithIcon = (type, product) => {
    console.log(product);
    dispatch(addToCart(product));
    notification[type]({
      message: "Đã thêm giỏ hàng",
      description: `Sản phẩm : ${product.name}`,
    });
  };
  const onChangeCategory = (id) => {
    setCategorySelected(id);
  };
  return (
    <section className="featured spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <p className="title-prohot">Sản phẩm nổi bật</p>
            </div>
            <div className="featured__controls">
              {lCate ? (
                <div className="d-flex justify-content-center mt-3">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="btn_feature">
                  {categories ? (
                    <div className="btn__">
                      <button
                        className="active"
                        data-filter="*"
                        onClick={() => onChangeCategory(null)}
                      >
                        All
                      </button>
                      {categories.slice(0, 4).map((cate) => {
                        return (
                          <button
                            data-filter=".oranges"
                            key={cate.id}
                            onClick={() => onChangeCategory(cate.id)}
                          >
                            {cate.name}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center mt-3">
                      <span>
                        OMG <i className="fa fa-frown-o" aria-hidden="true" /> !
                      </span>
                      <div>No Result</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row featured__filter">
          {lPrd ? (
            <div className="d-flex justify-content-center mt-3">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div>
              {products.length > 0 ? (
                <div className="row">
                  {products?.slice(0, 8).map((prd) => {
                    return (
                      <div
                        className="col-lg-3 col-md-4 col-sm-6 col-6 mix oranges fresh-meat"
                        key={prd.id}
                      >
                        <div className="featured__item">
                          <div className="featured__item__pic set-bg">
                            <Link to={`/detail/${prd.id}`} className="img__">
                              <img
                                src={prd.image}
                                alt={prd.name}
                                className="w-full-image"
                              />
                            </Link>
                          </div>
                          <div className="featured__item__text">
                            <div className="name-pro">
                              <Link to={`/detail/${prd.id}`}>{prd.name}</Link>
                            </div>
                            <div className="d-flex justify-content-center">
                              {prd.sale ? (
                                <>
                                  <p className="price-pro mr-1">
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
                                </>
                              ) : (
                                <p className="price-pro mr-1">
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(prd.price)}
                                </p>
                              )}
                            </div>
                            {prd.status !== 0 ? (
                              <div className="btn_ct">
                                <Link to="/contact">
                                  <span>Liên hệ</span>
                                </Link>
                                <button
                                  className="btn-cart"
                                  style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 50,
                                  }}
                                  onClick={() =>
                                    openNotificationWithIcon("success", prd)
                                  }
                                >
                                  <i className="fa fa-cart-plus" />
                                </button>
                              </div>
                            ) : (
                              <div className="btn_ct">
                                <Link to="/contact">
                                  <span>Liên hệ</span>
                                </Link>
                                <p className="text-danger">Hết hàng</p>
                              </div>
                            )}
                            <div></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center mt-3">
                  <span>
                    OMG <i className="fa fa-frown-o" aria-hidden="true" /> !
                  </span>
                  <div>No Result</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FeatureComponent;
