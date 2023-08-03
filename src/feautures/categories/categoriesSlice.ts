//редьюсер фетча списка всех категорий

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

interface CategoriesState {
    categories: [],
    isLoading: boolean,
}
const initialState = {
    categories: [],
    isLoading: false,
} as CategoriesState

export const getCategories = createAsyncThunk(
    "categories/getCategories",
    async () => {
        const res = await axios(`${BASE_URL}/list.php?c=list`)
        return res.data.meals;
    }
);

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getCategories.fulfilled, (state, { payload }) => {
            state.categories = payload;
            state.isLoading = false;
        })
        builder.addCase(getCategories.rejected, (state) => {
            state.isLoading = false;
            console.log("error");
        })
    }
})

export default categoriesSlice.reducer;