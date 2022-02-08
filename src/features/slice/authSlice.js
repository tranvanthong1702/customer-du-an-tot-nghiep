import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    current: {},
    isAuthenticated: false,
    loading: false
}

export const signIn = createAsyncThunk(
    'auth/signin',
    async (userData) => {
        const {data} = await axios.post("http://127.0.0.1:8000/api/login", userData)
        return data
    }
)
export const signUp = createAsyncThunk(
    'auth/register',
    async (userData) => {
        const {data} = await axios.post("http://127.0.0.1:8000/api/register", userData)
        console.log(data)
        return data
    }
)
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [signIn.pending]: (state, action) => {
            state.status = "Pending"
            state.loading = true
        },
        [signIn.fulfilled]: (state, action) => {
            state.status = "Success"
            state.current = action.payload
            state.loading = false
        },
        [signIn.rejected]: (state, action) => {
            state.status = "Rejected"
        }
    }
});

export default authSlice.reducer