import {createSlice} from "@reduxjs/toolkit"
import { create } from "domain";

const initialState = {
    product: [],
};

export const productSlice = createSlice({
    name: "Product",
    initialState: initialState,
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload;
        },
    },
});

export const {setProduct} = productSlice.actions;
export const productReducer = productSlice.reducer;