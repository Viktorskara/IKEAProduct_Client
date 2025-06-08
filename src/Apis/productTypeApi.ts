import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const productTypeApi = createApi({
    reducerPath: "productTypeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44356/api/",
    }),
    tagTypes: ["ProductTypes"],
    endpoints: (builder) => ({
        getProductTypes : builder.query({
            query: () => ({
                url: "productTypes"
            }),
            providesTags: ["ProductTypes"],
        }),
    }),
});

export const { useGetProductTypesQuery  } = productTypeApi;
export default productTypeApi;