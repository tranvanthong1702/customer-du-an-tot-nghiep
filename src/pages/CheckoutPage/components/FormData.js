import React, { useEffect, useState } from "react";
import MasterLayout from "../../../layout/MasterLayout";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { getTransport, verifyEmail } from "../../../api/transportAPI";
import { getTotals } from "../../../features/slice/cartSlice";
import Swal from "sweetalert2";

function FormData() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [transport, setTransport] = useState();
  const [loading, setLoading] = useState(false);
  const { profile } = useAuth();
  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: transport } = await getTransport();
        setTransport(transport.data);
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
  const onSubmit = async (data) => {
    console.log("data", data);
    let newData = {
      ...data,
      // total_price: cart.cartTotalAmount,
      products: arrPrd,
    };
    if (profile) {
      const user_id = profile.id;
      newData = { ...newData, user_id: user_id };
      if (
        data.customer_email == profile.email ||
        data.customer_email == profile.address_custom.customer_email
      ) {
        localStorage.setItem("INFO", JSON.stringify(newData));
        history.push("/checkout");
      } else {
        await verifyEmail({
          name: data.customer_name,
          email: data.customer_email,
        }).then(async (res) => {
          Swal.fire({
            title: "H??y nh???p m?? x??c th???c",
            input: "text",
            inputAttributes: {
              autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "X??c Th???c",
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
              if (res.data.data == login) {
                localStorage.setItem("INFO", JSON.stringify(newData));
                history.push("/checkout");
              } else {
                alert("Ma Xac Nhan Khong Dung");
              }
            },
            allowOutsideClick: () => !Swal.isLoading(),
          });
        });
      }
    } else {
      await verifyEmail({
        name: data.customer_name,
        email: data.customer_email,
      }).then(async (res) => {
        Swal.fire({
          title: "H??y nh???p m?? x??c th???c",
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "X??c Th???c",
          showLoaderOnConfirm: true,
          preConfirm: (login) => {
            if (res.data.data == login) {
              localStorage.setItem("INFO", JSON.stringify(newData));
              history.push("/checkout");
            } else {
              alert("Ma Xac Nhan Khong Dung");
            }
          },
          allowOutsideClick: () => !Swal.isLoading(),
        });
      });
    }

    // const res = await Order(newData)
    // dispatch(clearCart())
    // history.push(`/thankyou/${res.data.data.user_id}/${res.data.data.id}`)
  };
  const handleEmail = async () => {
    // await verifyEmail(
    //     {
    //         name: "thanh",
    //         email: "buithanh2001nb@gmail.com"
    //     }
    // ).then((res) => {
    //         // const codeConfirm = prompt("Nh???p m?? x??c th???c !"
    //         // if (res.data.data == codeConfirm) {
    //         //     history.push('/')
    //         // } else {
    //         //     console.log("fail")
    //         // }
    //     }
    // )
  };
  return (
    <MasterLayout>
      <section className="checkout spad">
        <div className="container">
          <div className="checkout__form m-auto">
            <h4>Th??ng tin mua h??ng</h4>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              {profile ? (
                <div className="row">
                  <div className="col-lg-8 col-md-6">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="checkout__input">
                          <label className="fw-b" htmlFor="customer_name">T??n :</label>
                          <input
                            type="text"
                            name="customer_name"
                            {...register("customer_name", { required: true })}
                            defaultValue={profile.user_name}
                          />
                          {errors.customer_name && (
                            <span className="text-danger">
                              T??n kh??ng ???????c b??? tr???ng !
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="checkout__input">
                          <label className="fw-b" htmlFor="customer_email">Email :</label>
                          <input
                            type="text"
                            name="customer_email"
                            {...register("customer_email", { required: true })}
                            defaultValue={profile.email}
                          />
                          {errors.customer_email && (
                            <span className="text-danger">
                              Email kh??ng ???????c b??? tr???ng !
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="checkout__input">
                          <label className="fw-b" htmlFor="customer_phone">S??? ??i???n tho???i :</label>
                          <input
                            type="text"
                            defaultValue={
                              profile.address_custom?.customer_phone
                            }
                            {...register("customer_phone", { required: true })}
                          />
                          {errors.customer_phone && (
                            <span className="text-danger">
                              S??? ??i???n tho???i kh??ng ???????c b??? tr???ng !
                            </span>
                          )}
                        </div>
                      </div>
                      {loading ? (
                        <>Dang load</>
                      ) : (
                        <>
                          {transport ? (
                            <>
                              <div className="col-lg-12">
                                <div className="checkout__input">
                                  <label className="fw-b" htmlFor="provinceID">T???nh :</label>
                                  <input
                                    type="text"
                                    name="provinceID"
                                    disabled={true}
                                    defaultValue={transport.provinceName}
                                    {...register("provinceID")}
                                  />
                                  {errors.provinceID && (
                                    <span className="text-danger">
                                      T???nh kh??ng ???????c b??? tr???ng !
                                    </span>
                                  )}
                                </div>
                              </div>

                              {transport.districts.length > 0 && (
                                <div className="col-lg-12">
                                  <div className="checkout__input">
                                    <label className="fw-b" htmlFor="districtID">Huy???n :</label>
                                    <select
                                      name="districtID"
                                      id=""
                                      {...register("districtID")}
                                      defaultValue={
                                        profile.address_custom?.districtID
                                      }
                                      className="form-select"
                                    >
                                      {transport.districts.map((item) => {
                                        return (
                                          <option
                                            key={item.id}
                                            value={parseInt(item.districtID)}
                                          >
                                            {item.districtName}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    {errors.districtID && (
                                      <span className="text-danger">
                                        Huy???n kh??ng ???????c b??? tr???ng !
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <>No Data</>
                          )}
                        </>
                      )}
                      <div className="col-lg-12">
                        <div className="checkout__input">
                          <label className="fw-b" htmlFor="customer_address">?????a ch??? :</label>
                          <input
                            type="text"
                            name="customer_address"
                            defaultValue={
                              profile.address_custom?.customer_address
                            }
                            {...register("customer_address", {
                              required: true,
                            })}
                          />
                          {errors.customer_address && (
                            <span className="text-danger">
                              ?????a ch??? kh??ng ???????c b??? tr???ng !
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="checkout__input">
                          <label className="fw-b" htmlFor="customer_note">Ghi ch?? th??m :</label>
                          <input
                            type="text"
                            name="customer_note"
                            {...register("customer_note")}
                          />
                          {errors.customer_note && (
                            <span className="text-danger">
                              Ghi ch?? kh??ng ???????c b??? tr???ng !
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="btn__">
                        <button
                          type="submit"
                          className="site-btn"
                          onClick={() => handleEmail()}
                        >
                          Ti???p t???c
                        </button>
                        <Link className="site-btn" to={"/cart"}>
                          Quay l???i
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col-lg-8 col-md-6">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="checkout__input">
                          <label className="fw-b" htmlFor="customer_name">T??n :</label>
                          <input
                            type="text"
                            name="customer_name"
                            {...register("customer_name", { required: true })}
                          />
                          {errors.customer_name && (
                            <span className="text-danger">
                              T??n kh??ng ???????c b??? tr???ng !
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="checkout__input">
                          <label className="fw-b" htmlFor="customer_email">Email :</label>
                          <input
                            type="text"
                            name="customer_email"
                            {...register("customer_email", { required: true })}
                          />
                          {errors.customer_email && (
                            <span className="text-danger">
                              Email kh??ng ???????c b??? tr???ng !
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="checkout__input">
                          <label className="fw-b" htmlFor="customer_phone">S??? ??i???n tho???i :</label>
                          <input
                            type="text"
                            {...register("customer_phone", { required: true })}
                          />
                          {errors.customer_phone && (
                            <span className="text-danger">
                              S??? ??i???n tho???i kh??ng ???????c b??? tr???ng !
                            </span>
                          )}
                        </div>
                      </div>
                      {loading ? (
                        <>Dang load</>
                      ) : (
                        <>
                          {transport ? (
                            <>
                              <div className="col-lg-12">
                                <div className="checkout__input">
                                  <label className="fw-b" htmlFor="provinceID">T???nh :</label>
                                  <input
                                    type="text"
                                    name="provinceID"
                                    disabled={true}
                                    defaultValue={transport.provinceName}
                                    {...register("provinceID")}
                                    className="form-select"
                                  />
                                  {errors.provinceID && (
                                    <span className="text-danger">
                                      T???nh kh??ng ???????c b??? tr???ng !
                                    </span>
                                  )}
                                </div>
                              </div>

                              {transport.districts.length > 0 && (
                                <div className="col-lg-12">
                                  <div className="checkout__input">
                                    <label className="fw-b" htmlFor="districtID">Huy???n :</label>
                                    <select
                                      name="districtID"
                                      id=""
                                      {...register("districtID")}
                                      className="form-select"
                                    >
                                      {transport.districts.map((item) => {
                                        return (
                                          <option
                                            key={item.id}
                                            value={parseInt(item.districtID)}
                                          >
                                            {item.districtName}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    {errors.districtID && (
                                      <span className="text-danger">
                                        Huy???n kh??ng ???????c b??? tr???ng !
                                      </span>
                                    )}
                                  </div>

                                </div>
                              )}
                            </>
                          ) : (
                            <>No Data</>
                          )}
                        </>
                      )}
                      <div className="col-lg-12">
                        <div className="checkout__input">
                          <label className="fw-b" htmlFor="customer_address">?????a ch??? :</label>
                          <input
                            type="text"
                            name="customer_address"
                            {...register("customer_address", {
                              required: true,
                            })}
                          />
                          {errors.customer_address && (
                            <span className="text-danger">
                              ?????a ch??? kh??ng ???????c b??? tr???ng !
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="checkout__input">
                          <label className="fw-b" htmlFor="customer_note">Ghi ch?? th??m :</label>
                          <input
                            type="text"
                            name="customer_note"
                            {...register("customer_note")}
                          />
                          {errors.customer_note && (
                            <span className="text-danger">
                              Ghi ch?? kh??ng ???????c b??? tr???ng !
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="btn__">
                        <button
                          type="submit"
                          className="site-btn"
                          onClick={() => handleEmail()}
                        >
                          Ti???p t???c
                        </button>
                        <Link className="site-btn" to={"/cart"}>
                          Quay l???i
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
    </MasterLayout>
  );
}

export default FormData;
