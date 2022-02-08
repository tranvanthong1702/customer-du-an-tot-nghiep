import PropTypes from "prop-types";
import React from "react";

function OrderDetail(props) {
  const { detail } = props;
  const convertDate = (data) => {
    const date = new Date(data);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  return (
    <div className="order-details">
      <div className="status-order">
        <div>
          <b>Mã đơn hàng : </b>
          {detail.id}
        </div>
        <div>
          <b>Trạng thái : </b>
          <i>
            {detail.process_id == 1 && "Đang Xử Lí"}
            {detail.process_id == 2 && "Đang Xử Lí"}
            {detail.process_id == 3 && "Đang Xử Lí"}
            {detail.process_id == 4 && "Đang Giao"}
            {detail.process_id == 5 && "Giao Thành Công"}
            {detail.process_id == 6 && "Giao Thất Bại"}
          </i>
        </div>
        <div>
          <b>Ngày đặt hàng : </b>{" "}
          <i>{detail.created_at ? `${convertDate(detail.created_at)}` : ""}</i>
        </div>
      </div>
      <div className="content">
        {detail.order_details?.map((prd) => {
          return (
            <div className="product row" key={prd.id}>
              <div className="col-lg-2">
                <img
                  src="https://picsum.photos/200"
                  alt="Product"
                  className="img-fluid"
                />
              </div>
              <div className="col-lg-6 product-name">
                <div className="title-pro">{prd.name}</div>
              </div>
              <div className="col-lg-2 text-center product-price">
                <div>x{prd.quantity}</div>
              </div>
              <div className="col-lg-2 text-center product-price">
                <span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(prd.standard_price * prd.quantity)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="shipper-total">
        <div className="total">
          <span>Nhân viên giao hàng :</span>
          <span>
            {detail.shipper_id ? `${detail.shipper_id}` : "Chưa có Shipper"}
          </span>
        </div>
        <div className="total">
          <span>Số điện thoại :</span>
          <span>
            {detail.customer_phone
              ? `${detail.customer_phone}`
              : "Chưa có Phone"}
          </span>
        </div>

        <div className="total">
          <span>Tổng số tiền :</span>
          <span>
            {detail.total_price
              ? `${new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(detail.total_price)}`
              : "Chưa có Price"}
          </span>
        </div>
      </div>
      <div className="btn-order">
        {detail.process_id == 5 && (
          <button data-bs-toggle="modal" data-bs-target="#exampleModal">
            Đánh giá
          </button>
        )}
      </div>
    </div>
  );
}

OrderDetail.propTypes = {
  detail: PropTypes.object.isRequired,
};

export default OrderDetail;
