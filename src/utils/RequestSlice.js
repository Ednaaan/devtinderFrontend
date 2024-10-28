import { createSlice } from "@reduxjs/toolkit";

const requestslice = createSlice({
    name: "requests",
    initialState: null,
    reducers:{
        addRequest:(state, action) => action.payload,
        removeRequest:(state, action) => {
            const newArray = state.filter(r => r._id !== action.payload);
            return newArray;
        }
    }
});

export const { addRequest, removeRequest } = requestslice.actions;

export default requestslice.reducer;