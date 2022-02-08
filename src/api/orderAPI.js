import Instance from "./instance";
import { Auth } from "../pages/Auth";
import data from "bootstrap/js/src/dom/data";

const token = Auth.getToken();
export const Order = (data) => {
  return Instance.post("/order/add", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const getOrderByID = (id) => {
  return Instance.get(`/order/detail/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const getAllOrder = () => {
  return Instance.get(`/order/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const getOrderByProcess = (filed, id) => {
  return Instance.get(`/customer/${filed}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const MOMO = (data) => {
  return Instance.get("/order/payment/momo", { params: data });
};
export const cancelOrder = (id) => {
  return Instance.put(`/order/cancel/${id}`);
};
