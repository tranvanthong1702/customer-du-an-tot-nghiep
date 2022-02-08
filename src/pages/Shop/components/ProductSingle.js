import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../../features/slice/cartSlice";
import ReactPaginate from "react-paginate";
import { Button, notification } from "antd";

function ProductSingle({ products, categories }) {
  const { loading, data: listProducts } = products;
  const { loadingCate, data: cate } = categories;
  const [categorySelected, setCategorySelected] = useState(null);
  const [sorted, setSorted] = useState(null);
  const [priceSelected, setPriceSelected] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [q, setPhone] = useState([]);
  const productPerPage = 9;
  const pageVisited = pageNumber * productPerPage;
  const productss = useMemo(() => {
    if (categorySelected) {
      if (sorted === "new") {
        return listProducts
          .filter((i) => i.cate_id === parseInt(categorySelected))
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      } else if (sorted === "desc") {
        return listProducts
          .filter((i) => i.cate_id === parseInt(categorySelected))
          .sort((a, b) => b.price - a.price);
      } else if (sorted === "asc") {
        return listProducts
          .filter((i) => i.cate_id === parseInt(categorySelected))
          .sort((a, b) => a.price - b.price);
      } else if (sorted === "name") {
        return listProducts
          .filter((i) => i.cate_id === parseInt(categorySelected))
          .sort((a, b) => {
            var nameA = a.name.toLowerCase(),
              nameB = b.name.toLowerCase();
            if (nameA < nameB)
              //sort string ascending
              return -1;
            if (nameA > nameB) return 1;
            return 0;
          });
      } else if (sorted === "name1") {
        return listProducts
          .filter((i) => i.cate_id === parseInt(categorySelected))
          .sort((a, b) => {
            var nameA = a.name.toLowerCase(),
              nameB = b.name.toLowerCase();
            if (nameA < nameB)
              //sort string ascending
              return 1;
            if (nameA > nameB) return -1;
            return 0;
          });
      } else if (sorted === "sale") {
        return listProducts
          .filter((i) => i.cate_id === parseInt(categorySelected))
          .filter((i) => i.sale > 0);
      } else {
        return listProducts.filter(
          (i) => i.cate_id === parseInt(categorySelected)
        );
      }
    } else if (priceSelected) {
      if (priceSelected == 1) {
        return listProducts.filter((i) => parseInt(i.price) < 100000);
      } else if (priceSelected == 2) {
        return listProducts.filter(
          (i) => parseInt(i.price) >= 100000 && parseInt(i.price) < 200000
        );
      } else if (priceSelected == 3) {
        return listProducts.filter(
          (i) => parseInt(i.price) >= 200000 && parseInt(i.price) < 500000
        );
      } else if (priceSelected == 3) {
        return listProducts.filter(
          (i) => parseInt(i.price) >= 500000 && parseInt(i.price) < 1000000
        );
      } else if (priceSelected == 3) {
        return listProducts.filter((i) => parseInt(i.price) > 1000000);
      } else {
        return listProducts;
      }
    } else {
      if (sorted === "new") {
        return listProducts.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
      } else if (sorted === "desc") {
        return listProducts.sort((a, b) => b.price - a.price);
      } else if (sorted === "asc") {
        return listProducts.sort((a, b) => a.price - b.price);
      } else if (sorted === "name") {
        return listProducts.sort((a, b) => {
          var nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase();
          if (nameA < nameB)
            //sort string ascending
            return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
      } else if (sorted === "name1") {
        return listProducts.sort((a, b) => {
          var nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase();
          if (nameA < nameB)
            //sort string ascending
            return 1;
          if (nameA > nameB) return -1;
          return 0;
        });
      } else if (sorted === "sale") {
        return listProducts.filter((i) => i.sale > 0);
      } else {
        return listProducts;
      }
    }
  }, [listProducts, categorySelected, sorted, priceSelected]);
  const search = (rows) => {
    return rows.filter(
      (row) =>
        row.name.toLowerCase().indexOf(q) > -1 ||
        row.name.toLowerCase().indexOf(q) > -1
    );
  };
  console.log(productss);
  const pageCount = Math.ceil(productss.length / productPerPage);
  const dispatch = useDispatch();
  const openNotificationWithIcon = (type, product) => {
    dispatch(addToCart(product));
    notification[type]({
      message: "Đã thêm giỏ hàng",
      description: `Sản phẩm : ${product.name}`,
    });
  };
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const onchangeSort = (e) => {
    setSorted(e.target.value);
  };
  const onchangePrice = (e) => {
    setPriceSelected(e.target.value);
  };
  const onChangeCate = (e) => {
    setCategorySelected(e.target.value);
  };
  return (
    <div className="row">
      {loading ? (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="shop_">
          <div className="sort-shop">
            <div className="row">
              {loadingCate ? (
                <div className=" d-flex justify-content-center mt-3">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="col-lg-3 col-md-3 col-6 mb-3">
                  {cate.length > 0 ? (
                    <select onChange={onChangeCate}>
                      <option value={""}>Tất cả</option>
                      {cate.map((item) => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
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
              <div className="col-lg-3 col-md-3 col-6 mb-3">
                <select onChange={onchangeSort}>
                  <option className="option" value={""}>
                    Tất cả
                  </option>
                  <option className="option" value="desc">
                    Giá giảm dần
                  </option>
                  <option className="option" value="asc">
                    Giá tăng dần
                  </option>
                  <option className="option" value="new">
                    Sản phẩm mới nhất
                  </option>
                  <option className="option" value="name">
                    Sản phẩm A - Z
                  </option>
                  <option className="option" value="name1">
                    Sản phẩm Z - A
                  </option>
                  <option className="option" value="sale">
                    Sản phẩm giảm giá
                  </option>
                </select>
              </div>
              <div className="col-lg-3 col-md-3 col-6 mb-3">
                <select onChange={onchangePrice}>
                  <option className="option" value={""}>
                    Tất cả
                  </option>
                  <option className="option" value={1}>
                    Dưới 100k
                  </option>
                  <option className="option" value={2}>
                    100k - 200k
                  </option>
                  <option className="option" value={3}>
                    200k - 500k
                  </option>
                  <option className="option" value={4}>
                    500k - 1000k
                  </option>
                  <option className="option" value={5}>
                    Tren 1000k
                  </option>
                </select>
              </div>
              <div className="col-lg-3 col-md-3 col-6 mb-3">
                <form action="" className="form-search">
                  <input
                    type="text"
                    className="form-control mb-4"
                    value={q}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Tìm kiếm ..."
                  />
                  <i class="fa fa-search" aria-hidden="true"></i>
                </form>
              </div>
            </div>
          </div>
          {productss.length > 0 ? (
            <div className="row">
              {search(
                productss.slice(pageVisited, pageVisited + productPerPage)
              )?.map((prd) => {
                return (
                  <div className="col-lg-4 col-md-6 col-6 col-sm-6" key={prd.id}>
                    <div className="product__item">
                      <div className="product__item__pic set-bg">
                        <Link to={`/detail/${prd.id}`} className="img__">
                          <img
                            src={prd.image}
                            alt={prd.name}
                            className="w-full-image"
                          />
                        </Link>
                        {/* <ul className="product__item__pic__hover">
                                                    <li>
                                                        <Link to={`/detail/${prd.id}`}>
                                                            <i className="fa fa-eye" aria-hidden="true" />
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Button
                                                            style={{ width: 40, height: 40, borderRadius: 50 }}
                                                            onClick={() => openNotificationWithIcon('success', prd)}
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                        </Button>
                                                    </li>
                                                </ul> */}
                      </div>
                      <div className="product__item__text">
                        <p className="name-pro">
                          <Link to={`/detail/${prd.id}`}>{prd.name}</Link>
                        </p>
                        <p className="price-pro">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(prd.price)}
                        </p>
                        <div className="btn_ct">
                          <Link to="/contact">
                            <span>Liên hệ</span>
                          </Link>
                          <button
                            className="btn-cart"
                            style={{ width: 40, height: 40, borderRadius: 50 }}
                            onClick={() =>
                              openNotificationWithIcon("success", prd)
                            }
                          >
                            <i className="fa fa-cart-plus" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <ReactPaginate
                previousLabel={"Trang trước"}
                nextLabel={"Trang sau"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousClassName={"previousBttn"}
                nextLinkClassName={"nextBttn" + ""}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
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
  );
}

export default ProductSingle;
