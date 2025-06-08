import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    colour: [],
};

export const colourSlice = createSlice({
    name: "Colour",
    initialState: initialState,
    reducers: {
        setColour: (state, action) => {
            state.colour = action.payload;
        },
    },
});

export const {setColour} = colourSlice.actions;
export const colourReducer = colourSlice.reducer;