//редьюсер запроса всех ингредиентов

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

interface ingredient{
    idIngredient: string,
    strIngredient: string
}


interface IngredientsState {
    ingredients: ingredient[],
    isLoading: boolean,
}
const initialState = {
    ingredients: [],
    isLoading: false,
} as IngredientsState

export const getIngredients = createAsyncThunk(
    "ingredients/getIngredients",
    async (thunkAPI) => {
        const res = await axios(`${BASE_URL}/list.php?i=list`)
        return res.data.meals;
    }
);

export const ingredientsSlice = createSlice({
    name: 'areas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getIngredients.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getIngredients.fulfilled, (state, { payload }) => {
            state.ingredients = payload;
            state.isLoading = false;
        })
        builder.addCase(getIngredients.rejected, (state) => {
            state.isLoading = false;
            console.log("error");
        })
    }
})

export default ingredientsSlice.reducer;