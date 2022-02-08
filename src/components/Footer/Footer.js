import React from "react";
import { Link } from "react-router-dom";
import LOGO from '../../assets/images/logofix.png'

function Footer() {
    return (
        <div>
            <a href="tel:0949501096" title="Hotline 0949501096" class="btn-call"><span><i class="fa fa-phone"></i></span></a>
            <footer className="footer spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-sm-6">
                            <div className="footer__about">
                                <div className="footer__about__logo">
                                    <Link to="/"><img src={LOGO} alt="Logo" /></Link>
                                    <p>Sàn Thương mại điện tử kết nối tiêu thụ sản phẩm Nông – Thủy sản SẠCH 3 miền của Việt Nam</p>
                                </div>
                                <ul>
                                    <li>Địa chỉ: Trịnh Văn Bô - Nam Từ Liêm - Hà Nội</li>
                                    <li>
                                        <a href="tel:0949501096">Điện thoại: 0949501096</a>
                                    </li>
                                    <li>
                                        <a href="mailto:markveget@gmail.com">Email: markveget@gmail.com</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6 ">
                            <div className="footer__widget">
                                <h6>Thông tin</h6>
                                <ul>
                                    <li><a href="#">Giới thiệu</a></li>
                                    <li><a href="#">Sản phẩm</a></li>
                                    <li><a href="#">Tin tức</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6 ">
                            <div className="footer__widget">
                                <h6>Chính sách</h6>
                                <ul>
                                    <li><a href="#">Chính sách mua hàng</a></li>
                                    <li><a href="#">Chính sách hoàn hàng</a></li>
                                    <li><a href="#">Chính sách bảo mật</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="footer__widget">
                                <h6>Đăng ký nhận ưu đãi</h6>
                                <p className="mb-4">Đăng ký nhận thông báo khuyến mãi từ MarkVeget để nhận mã giảm giá 20%</p>
                                {/* <form action="#">
                                    <input type="text" placeholder="Email" />
                                    <button type="submit" className=""><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                                </form> */}
                                <div className="footer__widget__social">
                                    <a href="#"><i className="fa fa-facebook" /></a>
                                    <a href="#"><i className="fa fa-instagram" /></a>
                                    <a href="#"><i className="fa fa-twitter" /></a>
                                    <a href="#"><i className="fa fa-pinterest" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <section className="section-coppy">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="footer__copyright">
                                <div className="footer__copyright__text text-center">
                                    <p>
                                        Copyright © All rights reserved by MarkVeget
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Footer