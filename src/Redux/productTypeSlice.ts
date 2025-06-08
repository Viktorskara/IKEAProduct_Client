import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    productType: [],
};

export const productTypSlice = createSlice({
    name: "ProductType",
    initialState: initialState,
    reducers: {
        setProductType: (state, action) => {
            state.productType = action.payload;
        },
    },
});

export const {setProductType} = productTypSlice.actions;
export const productTypeReducer = productTypSlice.reducer;