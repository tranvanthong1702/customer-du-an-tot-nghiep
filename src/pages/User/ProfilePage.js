import React from "react";
import LayoutProfile from "./components/LayoutProfile";
import { Auth } from "../Auth";

function ProfilePage() {
    const user = Auth.profile()
    const info_user = user.info_user[0]
    console.log(info_user, 'infor')
    const convertDate = (data) => {
        const date = new Date(data)
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }
    return (
        <LayoutProfile>
            <div className="col-lg-9 ">
                <div className="edit-profile">
                    <div className="title-edit">
                        <div className="title-all">
                            Hồ sơ của tôi
                        </div>
                        <div className="title-small">
                            Quản lí thông tin hồ sơ để bảo mật tài khoản
                        </div>
                    </div>
                    <form action="">
                        <div className="form-profile mb-4">
                            <div className="row">
                                <div className="col-lg-9 form_">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <p className="text-profile">
                                                Tên :
                                            </p>
                                        </div>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" defaultValue="" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <p className="text-profile">
                                                Email :
                                            </p>
                                        </div>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" disabled defaultValue="" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <p className="text-profile">
                                                Số điện thoại :
                                            </p>
                                        </div>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" defaultValue="" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <p className="text-profile">
                                                Giới tính :
                                            </p>
                                        </div>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" defaultValue="" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <p className="text-profile">
                                                Ngày sinh :
                                            </p>
                                        </div>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="date" defaultValue="" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <p className="text-profile">
                                                Địa chỉ :
                                            </p>
                                        </div>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" defaultValue=""/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <p className="text-profile">
                                                Ngày tạo tài khoản :
                                            </p>
                                        </div>
                                        <div className="col-lg-9">
                                            <input className="form-control" type="text" defaultValue="" />                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 d-flex align-items-center image">
                                    <div className="default-image">
                                        <img src="https://picsum.photos/200" alt="Avatar" />
                                        <input type="file" className="form-control"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btn_ text-center">
                            <button className="btn-success">
                                Lưu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </LayoutProfile>
    )
}
export default ProfilePage