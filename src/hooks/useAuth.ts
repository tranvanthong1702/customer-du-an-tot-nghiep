import {useHistory} from "react-router-dom"
import {Auth} from "../pages/Auth";
import {addCart} from "../api/cartAPI";

export default function useAuth() {
    const profileLocal = localStorage.getItem('auth') || null
    let profile = null
    const token = localStorage.getItem('auth_token') || null
    if (profileLocal) {
        profile = JSON.parse(profileLocal)
    }
    return {profile, token}
}

export function useLogout() {
    const history = useHistory()
    return () => {
        const user = Auth.profile()
        const getCart = Auth.getCart()
        const arrPrd = getCart.map((prd: any) => ({...prd, quantity: prd.cartQuantity})).map((prd: any) => ({
            id: prd.id,
            quantity: prd.cartQuantity,
        }))
        const newCart = {
            user_id: user.id,
            list_pro: arrPrd
        }
        addCart(newCart).then(() => {
            Auth.logout()
            if (history.location.pathname === '/') {
                window.location.reload()
            } else {
                window.location.href = '/'
            }
        })
    }
}