import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productSlice";
import { colourReducer } from "./colourSlice";
import { productTypeReducer } from "./productTypeSlice";

import { productApi } from "../Apis";
import colourApi from "../Apis/colourApi";
import productTypeApi from "../Apis/productTypeApi";

const store = configureStore({
    reducer: {
        productStore: productReducer,
        colourStore: colourReducer,
        productTypeStore: productTypeReducer,
        [productApi.reducerPath]: productApi.reducer,
        [colourApi.reducerPath]: colourApi.reducer,
        [productTypeApi.reducerPath]: productTypeApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productApi.middleware)
            .concat(colourApi.middleware)
            .concat(productTypeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
