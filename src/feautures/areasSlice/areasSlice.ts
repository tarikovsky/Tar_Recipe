//редьюсер фетча списка всех area (стран)

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

interface AreasState {
    areas: [],
    isLoading: boolean,
}
const initialState = {
    areas: [],
    isLoading: false,
} as AreasState

export const getAreas = createAsyncThunk(
    "areas/getAreas",
    async (thunkAPI) => {
        const res = await axios(`${BASE_URL}/list.php?a=list`)
        return res.data.meals;
    }
);

export const areasSlice = createSlice({
    name: 'areas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAreas.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getAreas.fulfilled, (state, { payload }) => {
            state.areas = payload;
            state.isLoading = false;
        })
        builder.addCase(getAreas.rejected, (state) => {
            state.isLoading = false;
            console.log("error");
        })
    }
})

export default areasSlice.reducer;