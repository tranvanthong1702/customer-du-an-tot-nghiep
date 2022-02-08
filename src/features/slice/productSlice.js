import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAll, getById} from "../../api/productAPI";

const initialState = {
    items: [],
    status: null
}
export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async () => {
        try {
            const {data} = await getAll()
            return data
        } catch (error) {
            return error.response.data
        }
    }
)
export const productsByIdFetch = createAsyncThunk(
    "products/productsByIdFetch",
    async (id) => {
        try {
            const {data} = await getById(id)
            return data
        } catch (error) {
            return error.response.data
        }
    }
)
const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: {
        [productsFetch.pending]: (state, action) => {
            state.status = "Pending"
        },
        [productsFetch.fulfilled]: (state, action) => {
            state.status = "Success"
            state.items = action.payload
        },
        [productsFetch.rejected]: (state, action) => {
            state.status = "Rejected"
        }
    }
})
export default productSlice.reducer