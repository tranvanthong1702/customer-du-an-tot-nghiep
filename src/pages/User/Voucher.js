import React, { useEffect, useState } from "react";
import LayoutProfile from "./components/LayoutProfile";
import { Auth } from "../Auth";
import { getVoucherAPI } from "../../api/voucherAPI";

function Order() {
    const [voucher, setVoucher] = useState()
    const user = Auth.profile()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: voucher } = await getVoucherAPI()
                setVoucher(voucher.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    return (
        <LayoutProfile>
            <div className="col-lg-9 order-profile">
                <div className="voucher-all">
                    <div className="title-all">
                        Voucher của bạn
                    </div>
                    <hr />
                    {
                        voucher == null ? (
                            <div className="row">
                                <div className="col-lg-6 mb-3">
                                    <div className="voucher">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="name-voucher">
                                                    <div className="name-vc">
                                                        Miễn phí vận chuyển
                                                    </div>
                                                    <div className="line-voucher">

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-8 d-flex align-items-center">
                                                <div className="condition-voucher">
                                                    <div className="condition-name">
                                                        Tất cả hình thức thanh toán
                                                    </div>
                                                    <div className="sale-voucher">
                                                        Giảm đến : 20%
                                                    </div>
                                                    <div className="expiry">
                                                        HSD : 22/12/2021
                                                    </div>
                                                    <div className="use-now">
                                                        <a href="" className="link-voucher">
                                                            Dùng ngay
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-3">
                                    <div className="voucher">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="name-voucher">
                                                    <div className="name-vc">
                                                        Miễn phí vận chuyển
                                                    </div>
                                                    <div className="line-voucher">

                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-lg-8 d-flex align-items-center">
                                                <div className="condition-voucher">
                                                    <div className="condition-name">
                                                        Tất cả hình thức thanh toán
                                                    </div>
                                                   
                                                    <div className="expiry">
                                                        HSD : 22/12/2021
                                                    </div>
                                                    <div className="use-now">
                                                        <a href="" className="link-voucher">
                                                            Dùng ngay
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="voucher-hot">
                                                Số lượng có hạn
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-3">
                                    <div className="voucher">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="name-voucher">
                                                    <div className="name-vc">
                                                        Miễn phí vận chuyển
                                                    </div>
                                                    <div className="line-voucher">

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-8 d-flex align-items-center">
                                                <div className="condition-voucher">
                                                    <div className="condition-name">
                                                        Tất cả hình thức thanh toán
                                                    </div>
                                                    <div className="sale-voucher">
                                                        Giảm đến : 20%
                                                    </div>
                                                    <div className="expiry">
                                                        HSD : 22/12/2021
                                                    </div>
                                                    <div className="use-now">
                                                        <a href="" className="link-voucher">
                                                            Dùng ngay
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ) : (
                            <p>Bạn có chưa có voucher nào !</p>
                        )
                    }
                </div>
            </div>
        </LayoutProfile>
    )
}

export default Order