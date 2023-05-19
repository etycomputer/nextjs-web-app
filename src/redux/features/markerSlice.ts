import { PositionResponse } from "@/pages/api/position/[[...api_route]]";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MarkerState = {
    marker: PositionResponse | null;
};

const initialState = {
    marker: null,
} as MarkerState;

export const counter = createSlice({
    name: "marker",
    initialState,
    reducers: {
        setMarker: (state, action: PayloadAction<PositionResponse>) => {
            state.marker = action.payload;
        }
    },
});

export const {
    setMarker
} = counter.actions;
export default counter.reducer;
