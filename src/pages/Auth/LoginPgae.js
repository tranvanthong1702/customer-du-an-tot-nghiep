import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../api/authAPI";
import { AUTH, AUTH_TOKEN } from "../../constants";
import IMG from "../../assets/images/llogin.png"
import { getAll } from "../../api/productAPI";

function LoginPgae() {
    const history = useHistory()
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm()
    const onSubmit = (data) => {
        try {
            login(data).then(async (res) => {
                if (res.data.success) {
                    const { data: products } = await getAll()
                    const listPrd = products.data
                    const dataCart = res.data.data.user.carts
                    const arrConvert = dataCart.map(cart => {
                        const product = listPrd.find(item => item.id === cart.product_id)
                        return { ...product, apiQuantity: cart.quantity }
                    }).map(prd => (
                        {
                            id: prd.id,
                            cate_id: prd.cate_id,
                            cartQuantity: prd.apiQuantity,
                            created_at: prd.created_at,
                            deleted_at: prd.deleted_at,
                            updated_at: prd.updated_at,
                            desc_short: prd.desc_short,
                            description: prd.description,
                            image: prd.image,
                            name: prd.name,
                            price: prd.price,
                            quantity: prd.quantity,
                            sale: prd.sale
                        }
                    ))
                    localStorage.setItem(AUTH_TOKEN, res.data.data.token)
                    localStorage.setItem(AUTH, JSON.stringify(res.data.data.user))
                    localStorage.setItem('cartItems', JSON.stringify(arrConvert))
                    window.location.href = '/'
                } else {
                    alert("Login Fail")
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="mv--signup">
            <div className="container-fluid">
                <div className="row content--signup">
                    <div className="col-lg-7 bg--form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <Link to="/">
                                    <i className="fa fa-arrow-circle-left" aria-hidden="true" />
                                </Link>
                            </div>
                            <div className="title-big__all text-center cl-blu">
                                Đăng Nhập
                            </div>
                            <div className="box-form list--input">
                                <div className="input-group">
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="Nhập Email"
                                        {...register('email', { required: true })}
                                    />
                                    {errors.email && (
                                        <div className="input-group">
                                            <div className="col-lg-4">
                                            </div>
                                            <span className="form-control mt-3 text-danger">Email không được dể trống</span>
                                        </div>
                                    )}
                                </div>
                                <div className="input-group">
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="Nhập mật khẩu"
                                        {...register('password', { required: true })}
                                    />
                                    {errors.password && (
                                        <div className="input-group">
                                            <div className="col-lg-4">
                                            </div>
                                            <span
                                                className="form-control mt-3 text-danger">Mật khẩu không được dể trống</span>
                                        </div>
                                    )}
                                </div>
                                <div className="btn-group">
                                    <button>
                                        <Link to="/register">Đăng Kí</Link>
                                    </button>
                                    <button type={"submit"}>
                                        Đăng Nhập
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-5 bg--img">
                        <img src={IMG} alt="Anh chua hien thi" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPgae