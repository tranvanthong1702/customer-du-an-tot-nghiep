import Instance from "./instance";
import {Auth} from "../pages/Auth";

const token = Auth.getToken()

export const getVoucherAPI = () => {
    return Instance.get(`/voucher`,{headers: {"Authorization": `Bearer ${token}`}})
}