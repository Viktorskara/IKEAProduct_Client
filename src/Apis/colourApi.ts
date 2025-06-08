import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const colourApi = createApi({
    reducerPath: "colourApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44356/api/",
    }),
    tagTypes: ["Colours"],
    endpoints: (builder) => ({
        getColours : builder.query({
            query: () => ({
                url: "colours"
            }),
            providesTags: ["Colours"],
        }),
    }),
});

export const { useGetColoursQuery  } = colourApi;
export default colourApi;