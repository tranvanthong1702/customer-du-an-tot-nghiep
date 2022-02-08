import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { cancelOrder } from "../../api/orderAPI";
import Swal from "sweetalert2";
import { getAll } from "../../api/blogAPI";

function CancelOrderPage() {
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        cancelOrder(id).then((res) => {
          if (res.data.success) {
            Swal.fire({
              title: `Đơn hàng ${res.data.data} đã hủy thành công !`,
              icon: "success",
            });
            history.push("/");
          } else {
            Swal.fire({
              title: `${res.data.data}`,
              icon: "warning",
            });
            history.push("/");
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return <div>Cancel order</div>;
}

export default CancelOrderPage;
