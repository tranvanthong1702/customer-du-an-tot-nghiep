import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const newProduct = action.payload;
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === newProduct.id
            )
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1
            } else {
                const tempProduct = {...newProduct, cartQuantity: 1}
                state.cartItems.push(tempProduct)
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        increaseCart(state, action) {
            const items = state.cartItems.find(item => item.id === action.payload.id);
            items.cartQuantity++
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        decreaseCart(state, action) {
            const items = state.cartItems.find(item => item.id === action.payload.id);
            items.cartQuantity--;
            if (items.cartQuantity < 1) {
                state.cartItems = state.cartItems.filter(item => item.id !== items.id);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        removeItemFromCart(state, action) {
            const id = action.payload.id;
            state.cartItems = state.cartItems.filter(item => item.id !== id);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        clearCart(state, action) {
            state.cartItems = []
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        getTotals(state, action) {
            let {total, quantity} = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const {price, cartQuantity} = cartItem
                    const itemTotal = price * cartQuantity
                    cartTotal.total += itemTotal
                    cartTotal.quantity += cartQuantity
                    return cartTotal
                },
                {
                    total:0,
                    quantity:0
                }
            )

            state.cartTotalQuantity= quantity
            state.cartTotalAmount=total
        }
    }
})
export const {addToCart, increaseCart, decreaseCart, removeItemFromCart, clearCart,getTotals} = cartSlice.actions
export default cartSlice.reducer