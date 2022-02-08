import React, { useEffect, useState } from "react";
import LayoutProfile from "./components/LayoutProfile";
import { getOrderByProcess } from "../../api/orderAPI";
import { Auth } from "../Auth";
import FilterBar from "./components/filterBar";
import OrderDetail from "./components/OrderDetail";
import { useForm } from "react-hook-form";

const STATUS = [
  {
    name: "Tất cả",
    value: "order/default",
  },
  {
    name: "Đang Xử Lí",
    value: "processing",
  },
  {
    name: "Đang Giao",
    value: "delivering",
  },
  {
    name: "Đã Giao",
    value: "success",
  },
  {
    name: "Chưa Đánh Giá",
    value: "order/feedback/0",
  },
];

function Order() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(STATUS.map((i) => ({ ...i, total: 0 })));
  const [statusSelected, setStatusSelected] = useState(STATUS[0].value);
  const user = Auth.profile();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onHandSubmit = async (data) => {
      console.log(data)
  }
  const fetchData = () => {
    setLoading(true);
    getOrderByProcess(statusSelected, user.id).then(({ data }) => {
      if (data?.success) {
        console.log(`${statusSelected}`, data?.data);
        setDetails(data.data);
        setLoading(false);
      } else {
        setDetails([]);
        setLoading(false);
      }
    });
  };
  const onChangeStatus = (id) => {
    setStatusSelected(id);
  };
  useEffect(() => {
    fetchData();
  }, [statusSelected]);
  return (
    <LayoutProfile>
      <div className="col-lg-9 order-profile">
        <FilterBar status={status} onChangeStatus={onChangeStatus} />
        <form className="form-search" onSubmit={handleSubmit(onHandSubmit)}>
          <button>
            <i className="fa fa-search" aria-hidden="true" />
          </button>
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng theo ID hoặc tên sản phẩm"
          />
        </form>
        {loading ? (
          <div>Dang Load</div>
        ) : (
          <div>
            {details.length === 0 ? (
              <div>No data</div>
            ) : (
              <div className="order">
                {details.map((detail, index) => (
                  <div key={`order-${index}`}>
                    <OrderDetail detail={detail} />
                  </div>
                ))}
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <form className="modal-dialog" onSubmit={handleSubmit(onHandSubmit)} >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Đánh giá
                        </h5>
                      </div>
                      <div className="modal-body">
                        <textarea
                          id="w3review"
                          name="w3review"
                          rows="4"
                          cols="68"
                          {...register('content')}
                        />
                        <input {...register('point')} className="form-control" placeholder="Số điểm" />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Đóng
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Đánh Giá
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </LayoutProfile>
  );
}

export default Order;
