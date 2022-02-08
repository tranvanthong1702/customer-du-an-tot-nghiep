import React from "react";
import MasterLayout from "../../layout/MasterLayout";
import BGC from "../../assets/images/banner-pages.png";
import { Link } from "react-router-dom";
function Contact() {
    return (
        <MasterLayout>
            
            <section className="breadcrumb-section set-bg bg-dark" style={{ backgroundImage: `url(${BGC})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center ">
                            <div className="breadcrumb__text">
                                <h2>Contact Us</h2>
                                <div className="breadcrumb__option">
                                    <a href="./index.html">Home</a>
                                    <span>Contact Us</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="contact spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_phone" />
                                <h4>Số điện thoại</h4>
                                <p>0949501096</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_pin_alt" />
                                <h4>Địa chỉ</h4>
                                <p>Phố Trịnh Văn Bô - Nam Từ Liêm - Hà Nội</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_clock_alt" />
                                <h4>Thời gian mở cửa</h4>
                                <p>10:00 am to 23:00 pm</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_mail_alt" />
                                <h4>Email</h4>
                                <p>markveget@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div>
                <div className="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.863855881406!2d105.74459841445476!3d21.038132792835267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b991d80fd5%3A0x53cefc99d6b0bf6f!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1634208200008!5m2!1svi!2s" width="100%" height="500" style={{ border: 0 }} allowfullscreen="" loading="lazy"></iframe>
                    {/* <div className="map-inside">
                        <i className="icon_pin" />
                        <div className="inside-widget">
                            <h4>New York</h4>
                            <ul>
                                <li>Phone: +12-345-6789</li>
                                <li>Add: 16 Creek Ave. Farmingdale, NY</li>
                            </ul>
                        </div>
                    </div> */}
                </div>
                <div className="contact-form spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="contact__form__title">
                                    <h2>Liên hệ với chúng tôi</h2>
                                </div>
                            </div>
                        </div>
                        <form action="#">
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <input type="text" placeholder="Họ và tên" />
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <input type="text" placeholder="Email" />
                                </div>
                                <div className="col-lg-12 text-center">
                                    <textarea placeholder="Your message" defaultValue={""} />
                                    <button type="submit" className="site-btn"><i class="fa fa-paper-plane" aria-hidden="true"></i>Gửi</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </MasterLayout>)
}
export default Contact