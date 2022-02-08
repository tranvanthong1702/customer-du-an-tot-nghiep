import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";


export const productsAPI = createApi({
    reducerPath: "productsAPI",
    baseQuery: fetchBaseQuery({baseUrl: "http://127.0.0.1:8000/api"}),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => "product/all",
        })
    })
})
export const {useGetAllProductsQuery} = productsAPI