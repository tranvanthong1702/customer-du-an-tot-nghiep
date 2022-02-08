import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getTotals } from "../../../features/slice/cartSlice";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { Link, useHistory, useParams } from "react-router-dom";
import useFetchAPI from "../../../hooks/useFetchAPI";
import { getVoucherAPI } from "../../../api/voucherAPI";
import {
  getTransport,
  priceShip,
  verifyEmail,
} from "../../../api/transportAPI";
import { MOMO, Order } from "../../../api/orderAPI";
import Swal from "sweetalert2";

function CheckoutForm() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [voucher, setVoucher] = useState();
  const [priceS, setPriceS] = useState();
  const [payment, setPayment] = useState(0);
  const [loading, setLoading] = useState(false);
  const { data: listVoucher } = useFetchAPI(getVoucherAPI);
  const { profile } = useAuth();
  const info = localStorage.getItem("INFO");
  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  let vouchers = [];
  if (profile) {
    if (profile.vouchers.length > 0) {
      vouchers = profile.vouchers;
    }
  }
  const change = async (event) => {
    const idVoucher = parseInt(event.target.value);
    if (profile) {
      const findVoucher = await vouchers.find((item) => item.id === idVoucher);
      setVoucher(findVoucher);
    } else {
      const findVoucher = await listVoucher.find(
        (item) => item.id === idVoucher
      );
      setVoucher(findVoucher);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: priceS } = await priceShip(cart.cartTotalQuantity * 1000);
        setPriceS(priceS.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
    dispatch(getTotals());
  }, [cart, dispatch]);
  const arrPrd = cart.cartItems
    .map((prd) => ({ ...prd, quantity: prd.cartQuantity }))
    .map((prd) => ({
      product_id: prd.id,
      standard_price: prd.price,
      standard_name: prd.name,
      quantity: prd.cartQuantity,
    }));
  const onChangePay = (e) => {
    setPayment(e.target.value);
  };
  const onSubmit = async () => {
    if (cart.cartTotalAmount >= 50000) {
      if (voucher) {
        if (voucher.classify_voucher_id === 3) {
          const totalPrice =
            priceS + cart.cartTotalAmount - (priceS * voucher.sale) / 100;
          let newData = {
            ...JSON.parse(info),
            total_price: totalPrice,
            payments: parseInt(payment),
            transportation_costs: priceS,
            provinceID: 201,
            voucher_id: voucher.id,
          };
          if (profile) {
            const user_id = profile.id;
            newData = { ...newData, user_id: user_id };
          }
          if (payment == 1) {
            if (cart.cartTotalAmount >= 50000) {
              window.open(
                `http://127.0.0.1:8000/api/order/payment/momo?amount=${totalPrice}`
              );
              localStorage.setItem("MOMO", JSON.stringify(newData));
            } else {
              Swal.fire(`Đơn hàng tối thiểu 50,000đ`, "", "warning");
            }
          } else {
            const res = await Order(newData);
            if (res.data.success === true) {
              dispatch(clearCart());
              history.push(
                `/thankyou/${res.data.data.user_id}/${res.data.data.id}`
              );
            } else {
              Swal.fire(`Đặt hàng thất bại`, "", "error");
            }
          }
        } else if (voucher.classify_voucher_id === 1) {
          const totalPrice =
            priceS +
            cart.cartTotalAmount -
            (cart.cartTotalAmount * voucher.sale) / 100;
          let newData = {
            ...JSON.parse(info),
            total_price: totalPrice,
            payments: parseInt(payment),
            transportation_costs: priceS,
            provinceID: 201,
            voucher_id: voucher.id,
          };
          if (profile) {
            const user_id = profile.id;
            newData = { ...newData, user_id: user_id };
          }
          if (payment == 1) {
            if (cart.cartTotalAmount >= 50000) {
              window.open(
                `http://127.0.0.1:8000/api/order/payment/momo?amount=${totalPrice}`
              );
              localStorage.setItem("MOMO", JSON.stringify(newData));
            } else {
              Swal.fire(`Đơn hàng tối thiểu 50,000đ`, "", "warning");
            }
          } else {
            const res = await Order(newData);
            if (res.data.success === true) {
              dispatch(clearCart());
              history.push(
                `/thankyou/${res.data.data.user_id}/${res.data.data.id}`
              );
            } else {
              Swal.fire(`Đặt hàng thất bại`, "", "error");
            }
          }
        } else if (voucher.classify_voucher_id === 2) {
          const totalPrice =
            priceS + cart.cartTotalAmount - (priceS * voucher.sale) / 100;
          if (cart.cartTotalAmount >= 150000) {
            let newData = {
              ...JSON.parse(info),
              total_price: totalPrice,
              payments: parseInt(payment),
              transportation_costs: priceS,
              provinceID: 201,
              voucher_id: voucher.id,
            };
            if (profile) {
              const user_id = profile.id;
              newData = { ...newData, user_id: user_id };
            }
            if (payment == 1) {
              if (cart.cartTotalAmount >= 50000) {
                window.open(
                  `http://127.0.0.1:8000/api/order/payment/momo?amount=${totalPrice}`
                );
                localStorage.setItem("MOMO", JSON.stringify(newData));
              } else {
                Swal.fire(`Đơn hàng tối thiểu 50,000đ`, "", "warning");
              }
            } else {
              const res = await Order(newData);
              if (res.data.success === true) {
                dispatch(clearCart());
                history.push(
                  `/thankyou/${res.data.data.user_id}/${res.data.data.id}`
                );
              } else {
                Swal.fire(`Đặt hàng thất bại`, "", "error");
              }
            }
          } else {
            Swal.fire(
              `Điều kiện áp dụng đơn hàng tối thiểu 150,000đ`,
              "",
              "warning"
            );
          }
        }
      } else {
        const totalPrice = cart.cartTotalAmount + priceS;
        let newData = {
          ...JSON.parse(info),
          total_price: totalPrice,
          payments: parseInt(payment),
          transportation_costs: priceS,
          provinceID: 201,
        };
        if (profile) {
          const user_id = profile.id;
          newData = { ...newData, user_id: user_id };
        }
        if (payment == 1) {
          if (cart.cartTotalAmount >= 50000) {
            window.open(
              `http://127.0.0.1:8000/api/order/payment/momo?amount=${totalPrice}`
            );
            localStorage.setItem("MOMO", JSON.stringify(newData));
          } else {
            Swal.fire(`Đơn hàng tối thiểu 50,000đ`, "", "warning");
          }
        } else {
          const res = await Order(newData);
          if (res.data.success === true) {
            dispatch(clearCart());
            history.push(
              `/thankyou/${res.data.data.user_id}/${res.data.data.id}`
            );
          } else {
            Swal.fire(`Đặt hàng thất bại`, "", "error");
          }
        }
      }
    } else {
      Swal.fire(`Đơn hàng tối thiểu 50,000đ`, "", "warning");
    }
  };
  return (
    <section className="checkout spad">
      <div className="container">
        <div className="checkout__form">
          <h4>Hóa đơn chi tiết</h4>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            {profile ? (
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="checkout__order">
                    <h4>Đơn hàng của bạn</h4>
                    <div className="checkout__order__products">
                      Sản phẩm <span>Tổng tiền</span>
                    </div>
                    <ul>
                      {cart.cartItems?.map((cartItem) => {
                        return (
                          <li key={cartItem.id}>
                            {cartItem.name.slice(0, 18)} (x
                            {cartItem.cartQuantity}){" "}
                            <span>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(cartItem.price * cartItem.cartQuantity)}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="checkout__order__subtotal">
                      Tiền hàng
                      <span>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(cart.cartTotalAmount)}
                      </span>
                    </div>
                    <div className="checkout__order__total">
                      Tiền ship
                      {loading ? (
                        <>Dang Load</>
                      ) : (
                        <>
                          {priceS ? (
                            <span>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(priceS)}
                            </span>
                          ) : (
                            <>Dang Load</>
                          )}
                        </>
                      )}
                    </div>
                    {voucher ? (
                      <div>
                        {voucher.classify_voucher_id === 3 ? (
                          <div>
                            <div className="checkout__order__total">
                              Miễn ship ({voucher.sale}%)
                              <span>
                                -{" "}
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(priceS * (voucher.sale / 100))}
                              </span>
                            </div>
                            <div className="checkout__order__total">
                              Thanh toán
                              <span>
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(
                                  cart.cartTotalAmount -
                                  priceS * (voucher.sale / 100) +
                                  priceS
                                )}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="checkout__order__total">
                              Giảm giá ({voucher.sale}%)
                              <span>
                                -{" "}
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(
                                  cart.cartTotalAmount * (voucher.sale / 100)
                                )}
                              </span>
                            </div>
                            <div className="checkout__order__total">
                              Thanh toán
                              <span>
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(
                                  cart.cartTotalAmount -
                                  cart.cartTotalAmount *
                                  (voucher.sale / 100) +
                                  priceS
                                )}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        {loading ? (
                          <>Dang Load</>
                        ) : (
                          <>
                            {priceS ? (
                              <div className="checkout__order__total">
                                Thanh toán
                                <span>
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(cart.cartTotalAmount + priceS)}
                                </span>
                              </div>
                            ) : (
                              <>Dang Load</>
                            )}
                          </>
                        )}
                      </div>
                    )}
                    <div>
                      {vouchers.length > 0 ? (
                        <select
                          name="voucher"
                          id="voucher"
                          onChange={change}
                          className="form-select text-uppercase mb-2"
                        >
                          <option value={0} className="text-uppercase">
                            Không sử dụng voucher
                          </option>
                          {vouchers.map((voucher) => {
                            return (
                              <option
                                value={voucher.id}
                                key={voucher.id}
                                className="text-uppercase"
                              >
                                {voucher.title} ({voucher.sale}%)
                              </option>
                            );
                          })}
                        </select>
                      ) : (
                        <div className="text-center mt-3">
                          <span>
                            OMG{" "}
                            <i className="fa fa-frown-o" aria-hidden="true" /> !
                          </span>
                          <div>No Result</div>
                        </div>
                      )}
                    </div>
                    <div className="">
                      <select className="form-select" onChange={onChangePay}>
                        <option value={0}>COD</option>
                        <option value={1}>MOMO</option>
                      </select>
                    </div>
                    <div className="btn__ text-center">
                      <button
                        type="submit"
                        className="site-btn"
                        onClick={() => onSubmit}
                      >
                        Đặt Hàng
                      </button>
                      <Link className="site-btn" to={"/order"}>
                        Quay lại
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="checkout__order">
                    <h4>Đơn hàng của bạn</h4>
                    <div className="checkout__order__products">
                      Sản phẩm <span>Tổng tiền</span>
                    </div>
                    <ul>
                      {cart.cartItems?.map((cartItem) => {
                        return (
                          <li key={cartItem.id}>
                            {cartItem.name.slice(0, 18)} (x
                            {cartItem.cartQuantity}){" "}
                            <span>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(cartItem.price * cartItem.cartQuantity)}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="checkout__order__subtotal">
                      Tiền hàng
                      <span>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(cart.cartTotalAmount)}
                      </span>
                    </div>
                    <div className="checkout__order__total">
                      Tiền ship
                      {loading ? (
                        <>Dang Load</>
                      ) : (
                        <>
                          {priceS ? (
                            <span>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(priceS)}
                            </span>
                          ) : (
                            <>Dang Load</>
                          )}
                        </>
                      )}
                    </div>
                    {voucher ? (
                      <div>
                        {voucher.classify_voucher_id === 3 ? (
                          <div>
                            <div className="checkout__order__total">
                              Miễn ship ({voucher.sale}%)
                              <span>
                                -{" "}
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(priceS * (voucher.sale / 100))}
                              </span>
                            </div>
                            <div className="checkout__order__total">
                              Thanh toán
                              <span>
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(
                                  cart.cartTotalAmount -
                                  priceS * (voucher.sale / 100) +
                                  priceS
                                )}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="checkout__order__total">
                              Giảm giá ({voucher.sale}%)
                              <span>
                                -{" "}
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(
                                  cart.cartTotalAmount * (voucher.sale / 100)
                                )}
                              </span>
                            </div>
                            <div className="checkout__order__total">
                              Thanh toán
                              <span>
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(
                                  cart.cartTotalAmount -
                                  cart.cartTotalAmount *
                                  (voucher.sale / 100) +
                                  priceS
                                )}
                              </span>

                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        {loading ? (
                          <>Dang Load</>
                        ) : (
                          <>
                            {priceS ? (
                              <div className="checkout__order__total">
                                Thanh toán
                                <span>
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(cart.cartTotalAmount + priceS)}
                                </span>
                              </div>
                            ) : (
                              <>Dang Load</>
                            )}
                          </>
                        )}
                      </div>
                    )}
                    {listVoucher ? (
                      <div>
                        <select
                          name="voucher"
                          id="voucher"
                          onChange={change}
                          className="form-select text-uppercase mb-2"
                        >
                          <option value={0} className="text-uppercase">
                            Không sử dụng voucher
                          </option>
                          {listVoucher.map((voucher) => {
                            return (
                              <option
                                value={voucher.id}
                                key={voucher.id}
                                className="text-uppercase"
                              >
                                {voucher.title} ({voucher.sale}%)
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    ) : (
                      <div>Khong Co voucher nao cho ban</div>
                    )}
                    <div className="">
                      <select className="form-select" onChange={onChangePay}>
                        <option value={0}>COD</option>
                        <option value={1}>MOMO</option>
                      </select>
                    </div>
                    <div className="btn__ text-center">
                      <button
                        type="submit"
                        className="site-btn"
                        onClick={() => onSubmit}
                      >
                        Đặt Hàng
                      </button>
                      <Link className="site-btn" to={"/order"}>
                        Quay lại
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default CheckoutForm;
