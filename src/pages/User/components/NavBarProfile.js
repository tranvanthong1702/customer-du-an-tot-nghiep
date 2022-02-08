import React from "react";
import { Link } from 'react-router-dom'

function NavBarProfile() {
    return (
        <div className="col-lg-3">
            <div className="navbar-profile">
                <div className="title ">
                    <div className="title-image">
                        <img src="https://picsum.photos/200" alt="Avatar" />
                    </div>
                    <div className="title-text">
                        <span>
                            <b>Bui Xuan Thanh</b>
                        </span>
                        <div>
                            <Link to="/profile">
                                <i className="fa fa-pencil" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/profile">
                                    <i className="fa fa-user" aria-hidden="true" />
                                    Hồ sơ của tôi
                                </Link>
                            </li>
                            <li>
                                <Link to="/user/order">
                                    <i className="fa fa-shopping-bag" aria-hidden="true" />
                                    Đơn Hàng
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile/edit">
                                    <i className="fa fa-bell" aria-hidden="true" />
                                    Thông báo
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile/voucher">
                                    <i className="fa fa-credit-card" aria-hidden="true" />
                                    Kho Voucher
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default NavBarProfile
