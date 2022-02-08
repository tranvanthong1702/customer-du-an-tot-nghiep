import {Auth} from "./index";
import {useHistory} from "react-router-dom";
import {addCart} from "../../api/cartAPI";

async function LogoutPage() {
    const history = useHistory()
    const user = Auth.profile()
    const getCart = Auth.getCart()
    const arrPrd = getCart.map((prd) => ({...prd, quantity: prd.cartQuantity})).map(prd => ({
        id: prd.id,
        quantity: prd.cartQuantity,
    }))
    const newCart = {
        user_id:user.id,
        list_pro:arrPrd
    }
    await addCart(newCart)
    Auth.logout()
    history.push('/')
}

export default LogoutPage