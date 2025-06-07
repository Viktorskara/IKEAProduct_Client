import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44356/api/",
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getProducts : builder.query({
            query: () => ({
                url: "products"
            }),
            providesTags: ["Products"],
        }),
        getProductById : builder.query({
            query: (id) => ({
                url: `products/${id}`
            }),
            providesTags: ["Products"],
        }),
        createProduct: builder.mutation({
            query: ( productData ) => ({
                url: "products",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: productData
            }),
            invalidatesTags: ['Products'],
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useCreateProductMutation } = productApi;
export default productApi;