import React, { useEffect } from "react";
import MasterLayout from "../../../layout/MasterLayout";
import { Order } from "../../../api/orderAPI";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../features/slice/cartSlice";

function StatusPayment() {
  const queryParams = new URLSearchParams(window.location.search);
  const paymentID = queryParams.get("orderId");
  const amount = queryParams.get("amount");
  const transID = queryParams.get("transId");
  const payType = queryParams.get("payType");
  const orderInfo = queryParams.get("orderInfo");
  const resultCode = queryParams.get("resultCode");
  const requestId = queryParams.get("requestId");
  const message = queryParams.get("message");
  const MOMO = localStorage.getItem("MOMO");
  const dispatch = useDispatch();

  const abc = () => {
    if (resultCode == 9000) {
      const data = {
        ...JSON.parse(MOMO),
        paymentID: paymentID,
        requestID: requestId,
        transID: transID,
        amount: amount,
        resultCode: resultCode,
        message: message,
        payType: payType,
        orderInfo: orderInfo,
      };
      Order(data)
        .then((res) => {
          console.log("res data: ", res.data);
          if (res.data.success === true) {
            localStorage.removeItem("MOMO");
            dispatch(clearCart());
            localStorage.removeItem("INFO");
          } else {
            Swal.fire(`Đặt hàng thất bại`, "", "error");
          }
        })
        .catch((err) => {
          alert("api loi", err);
        });
    } else {
      Swal.fire(`Thanh Toán Thất Bại`, "", "error");
    }
  };
  useEffect(() => {
    abc();
  }, []);
  return (
    <MasterLayout>
      Ket qua thanh toan MOMO
      {resultCode == 9000 ? (
        <div>Thanh Toan Thanh Cong</div>
      ) : (
        <div>Thanh Toan That Bai</div>
      )}
    </MasterLayout>
  );
}

export default StatusPayment;
