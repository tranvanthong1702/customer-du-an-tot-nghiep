import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";


export const authAPI = createApi({
    reducerPath: "authAPI",
    baseQuery: fetchBaseQuery({baseUrl: "http://127.0.0.1:8000/api/"}),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => "auth",
        })
    })
})
export const {useGetAllProductsQuery} = authAPI