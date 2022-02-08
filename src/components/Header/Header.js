import React, { useEffect, useState } from "react";
import LOGO from '../../assets/images/logofix.png'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTotals } from "../../features/slice/cartSlice";
import { Auth } from "../../pages/Auth";
import Avatar from "antd/es/avatar/avatar";
import { Button, Dropdown, Menu, Modal } from "antd";
import { useLogout } from "../../hooks/useAuth";
import { getVoucherAPI } from "../../api/voucherAPI";
import useFetchAPI from "../../hooks/useFetchAPI";

function Header() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch()
    const logout = useLogout()
    const cart = useSelector((state) => state.cart)
    useEffect(() => {
        dispatch(getTotals())
    }, [cart, dispatch])

    const { data: listVoucher } = useFetchAPI(getVoucherAPI)

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const user = Auth.profile()
    const menu = (
        <Menu>
            <Menu.Item key={'1'}>
                <Link rel="noopener noreferrer" to="/profile">
                    Tài Khoản
                </Link>
            </Menu.Item>
            <Menu.Item key={'2'}>
                <button type="button" onClick={logout}
                    style={{ outline: "none", border: "none", backgroundColor: "unset" }}>
                    Đăng xuất
                </button>
            </Menu.Item>
        </Menu>
    );
    return (
        <div className="sticky-top">
            {/* <button className="scroll" onClick={() => handleScroll()}>
                <i className="fa fa-angle-double-up" aria-hidden="true" />
            </button> */}
            <div className="humberger__menu__overlay" />
            <div className="humberger__menu__wrapper">
                <div className="humberger__menu__logo">
                    <Link to="/"><img src="img/logo.png" alt="" /></Link>
                </div>
                <div className="humberger__menu__cart">
                    <ul>
                        <li><Link to="/love"><i className="fa fa-heart" /> <span>1</span></Link></li>
                        <li><Link to="/cart"><i className="fa fa-shopping-bag" /> <span>3</span></Link></li>
                        <li><Link to="/login"><i className="fa fa-user" />Đăng Nhập</Link></li>
                    </ul>
                    <div className="header__cart__price">item: <span>$150.00</span></div>
                </div>
                <div className="humberger__menu__widget">
                    <div className="header__top__right__auth">
                        <Link to="#"><i className="fa fa-user" /> Đăng Nhập</Link>
                    </div>
                </div>
                <nav className="humberger__menu__nav mobile-menu">
                    <ul>
                        <li className="active"><Link to="/">Trang chủ</Link></li>
                        <li><Link to="/shop">Cửa Hàng</Link></li>
                        <li><Link to="/">Pages</Link>
                            <ul className="header__menu__dropdown">
                                <li><Link to="./shop-details.html">Shop Details</Link></li>
                                <li><Link to="./shoping-cart.html">Shoping Cart</Link></li>
                                <li><Link to="./checkout.html">Check Out</Link></li>
                                <li><Link to="./blog-details.html">Blog Details</Link></li>
                            </ul>
                        </li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/contact">Liên Hệ</Link></li>
                    </ul>
                </nav>
                <div id="mobile-menu-wrap" />
                <div className="header__top__right__social">
                    <Link to="#"><i className="fa fa-facebook" /></Link>
                    <Link to="#"><i className="fa fa-twitter" /></Link>
                    <Link to="#"><i className="fa fa-linkedin" /></Link>
                    <Link to="#"><i className="fa fa-pinterest-p" /></Link>
                </div>
                <div className="humberger__menu__contact">
                    <ul>
                        <li><i className="fa fa-envelope" aria-hidden="true" /> hello@colorlib.com</li>
                        <li>Free Shipping for all Order of $99</li>
                    </ul>
                </div>
            </div>
            <header className="header">
                <div className="header__main--logo container">
                    <div className="row header_row ">
                        <div className="col-lg-2 col-md-2 col-4">
                            <div className="header__logo">
                                <Link to="/"><img src={LOGO} alt="Logo" /></Link>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-6 d-none d-lg-block">
                            <nav className="header__menu">
                                <ul>
                                    <li className="active"><Link to="/">Trang Chủ</Link></li>
                                    <li><Link to="/shop">Cửa Hàng</Link></li>
                                    <li><Link to="/blog">Tin Tức</Link></li>
                                    <li><Link to="/contact">Liên Hệ</Link></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-2 col-md-10 col-8">
                            <div className="header__cart">
                                <ul>
                                    <li>
                                        <Button type="primary" onClick={showModal}>
                                            <i className="fa fa-credit-card-alt" aria-hidden="true" />
                                        </Button>
                                        <Modal title="Danh Sách Voucher"
                                            visible={isModalVisible}
                                            onOk={handleOk}
                                            onCancel={handleCancel}
                                        >
                                            {listVoucher ? (
                                                <div>
                                                    {listVoucher.map(voucher => {
                                                        return (
                                                            <div className="text-uppercase mb-3 d-flex">
                                                                <span>
                                                                    <i className="fa fa-credit-card-alt" aria-hidden="true" />
                                                                </span>
                                                                <div>
                                                                    <span>
                                                                        {voucher.title}
                                                                    </span>
                                                                    <span className="text-danger">
                                                                        ({voucher.sale}%)
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="text-center mt-3">
                                                    <span>
                                                        OMG <i className="fa fa-frown-o" aria-hidden="true" /> !
                                                    </span>
                                                    <div>
                                                        Chưa có voucher nào cả
                                                    </div>
                                                </div>
                                            )}
                                        </Modal>
                                    </li>
                                    <li>
                                        <Link to="/cart">
                                            <i className="fa fa-shopping-bag" />
                                            <span>{cart.cartTotalQuantity}</span>
                                        </Link>
                                    </li>
                                    {user ?
                                        (<li>
                                            <Dropdown overlay={menu} placement="bottomLeft" arrow>
                                                <Avatar src={user.avatar} />
                                            </Dropdown>
                                        </li>) :
                                        (<li>
                                            <Link to="/login">
                                                <i className="fa fa-user" /> 
                                                {/* Login */}
                                            </Link>
                                        </li>)
                                    }
                                    <li>
                                        <div className="humberger__ d-block d-lg-none">
                                            <i className="fa fa-bars" />
                                        </div>
                                    </li>
                                </ul>

                            </div>

                        </div>
                    </div>

                </div>
            </header>
        </div>

    )
}

export default Header