import {Auth} from "../pages/Auth";
import {addCart} from "../api/cartAPI";

export default function useCloseBrowser() {
    // const addData = async () => {
    //     const user = Auth.profile()
    //     const getCart = Auth.getCart()
    //     if (user) {
    //         const arrPrd = getCart.map((prd) => ({...prd, quantity: prd.cartQuantity})).map(prd => ({
    //             id: prd.id,
    //             quantity: prd.cartQuantity,
    //         }))
    //         const newCart = {
    //             user_id: user.id,
    //             list_pro: arrPrd
    //         }
    //         await addCart(newCart)
    //     }
    // }
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('123', '123')
    });
}