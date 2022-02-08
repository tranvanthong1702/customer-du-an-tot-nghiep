import React, { useEffect, useState } from "react";
import MasterLayout from "../../../layout/MasterLayout";
import { useParams } from "react-router-dom";
import { getOrderByID } from "../../../api/orderAPI";

function ThankyouPage() {
    const { id } = useParams()
    const [details, setDetails] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: details } = await getOrderByID(id)
                setDetails(details.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    const convertDate = (data) => {
        const date = new Date(data)
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
    return (
        <MasterLayout>
            <div className="container-thankyou">
                <div className="row">
                    <div className="col">
                        <div className="thankyou">
                            <div className="text-thankyou">
                                <h5>Cảm ơn bạn đã đặt hàng</h5>
                            </div>
                        </div>
                        <div className="information row">
                            {details ? (
                                <div>
                                    <div className="mb-2">
                                        <span className="fw-b">Mã đơn hàng</span> : {details.code_orders}
                                    </div>
                                    <div className="mb-2">
                                        <span className="fw-b">Ngày Tạo :</span> {convertDate(details.created_at)}
                                    </div>
                                    <div className="mb-2">
                                        <span className="fw-b">Tên :</span> {details.customer_name}
                                    </div>
                                    <div className="mb-2">
                                        <span className="fw-b">Điện thoại :</span> {details.customer_phone}
                                    </div>
                                    <div className="mb-2">
                                        <span className="fw-b">Ghi chú :</span> {details.customer_note ? (
                                            <>
                                                details.customer_note
                                            </>
                                        ) : (
                                            <>
                                                Không có ghi chú gì
                                            </>
                                        )}
                                    </div>
                                    <div className="mb-2">
                                        <span className="fw-b">Địa chỉ :</span> {details.customer_address}
                                    </div>
                                    <div className="mb-2">
                                        <span className="fw-b">Tổng tiền :</span> {new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        }).format(details.total_price)}
                                    </div>
                                    <div className="mb-2">
                                        <span className="fw-b">Hình thức thanh toán :</span> {details.payments == 0 ? 'COD' : 'MOMO'}
                                    </div>
                                </div>
                            ) : (<div>Dang Load</div>)}
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export default ThankyouPage