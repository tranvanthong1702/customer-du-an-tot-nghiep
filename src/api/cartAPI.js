import Instance from "./instance";
import {Auth} from "../pages/Auth";

const token = Auth.getToken()
export const addCart = (data) => {
    return Instance.post('/cart/add-cart', data, {headers: {"Authorization": `Bearer ${token}`}})
}