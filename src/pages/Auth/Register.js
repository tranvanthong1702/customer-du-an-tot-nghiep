import React from "react";
import {Link, useHistory} from 'react-router-dom'
import IMG from "../../assets/images/llogin.png"
import {useForm} from "react-hook-form";
import {registerAPI} from "../../api/authAPI";


function Register() {
    const history = useHistory()
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm()
    const onSubmit = (data) => {
        if (data.password === data.cf_pass) {
            const newData = {
                user_name: data.name,
                email: data.email,
                password: data.password,
                avatar:"https://picsum.photos/200"
            }
            try {
                registerAPI(newData).then(() => {
                    alert("Đăng Kí Thành Công")
                    history.push('/login')
                })
            } catch (error) {
                console.log(error)
            }
        }else{
            alert("Mỗi nhập cái pass cũng không xong")
        }
    }
    return (
        <div className="mv--signup">
            <div className="container-fluid">
                <div className="row content--signup">
                    <div className="col-lg-5 bg--img">
                        <img src={IMG} alt="Anh chua hien thi"/>
                    </div>
                    <div className="col-lg-7 bg--form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <Link to="/">
                                    <i className="fa fa-arrow-circle-left" aria-hidden="true"/>
                                </Link>
                            </div>
                            <div className="title">
                                <span>
                                    Đăng Kí
                                </span>
                            </div>
                            <div className="list--input">
                                <div className="input-group">
                                    <label htmlFor="name" className="col-lg-4">Tên</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="col-lg-8"
                                        placeholder="Nhập tên"
                                        {...register('name', {required: true})}
                                    />
                                    {errors.name && (
                                        <div className="input-group">
                                            <div className="col-lg-4">
                                            </div>
                                            <span className="col-lg-8 mt-3 text-danger">Tên không được dể trống</span>
                                        </div>
                                    )}
                                </div>
                                <div className="input-group">
                                    <label htmlFor="email" className="col-lg-4">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        autoComplete={false}
                                        className="col-lg-8"
                                        placeholder="Nhập email"
                                        {...register('email', {required: true})}
                                    />
                                    {errors.email && (
                                        <div className="input-group">
                                            <div className="col-lg-4">
                                            </div>
                                            <span className="col-lg-8 mt-3 text-danger">Email không được dể trống</span>
                                        </div>
                                    )}
                                </div>
                                <div className="input-group">
                                    <label htmlFor="password" className="col-lg-4">Mật khẩu</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="col-lg-8"
                                        placeholder="Nhập mật khẩu"
                                        {...register('password', {required: true})}
                                    />
                                    {errors.password && (
                                        <div className="input-group">
                                            <div className="col-lg-4">
                                            </div>
                                            <span
                                                className="col-lg-8 mt-3 text-danger">Mật khẩu không được dể trống</span>
                                        </div>
                                    )}
                                </div>
                                <div className="input-group">
                                    <label htmlFor="cf_pass" className="col-lg-4">Xác nhận mật khẩu</label>
                                    <input
                                        type="password"
                                        id="cf_pass"
                                        name="cf_pass"
                                        className="col-lg-8"
                                        placeholder="Xác nhận mật khẩu"
                                        {...register('cf_pass', {required: true})}
                                    />
                                    {errors.cf_pass && (
                                        <div className="input-group">
                                            <div className="col-lg-4">
                                            </div>
                                            <span
                                                className="col-lg-8 mt-3 text-danger">Xác nhận không được dể trống</span>
                                        </div>
                                    )}
                                </div>
                                <div className="btn-group">
                                    <button type="submit">Gửi</button>
                                    <button>
                                        <Link to="/login">Đăng Nhập</Link>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register