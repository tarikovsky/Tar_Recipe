//редьюсер, получение рецептов по нужным параметрам

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../../utils/constants"


interface MealsState {
    meals: [],
    isLoading: boolean,
}

const initialState = {
    meals: [],
    isLoading: false
} as MealsState

export const getMeals = createAsyncThunk<
    [],
    [string,string,string]
  >(
    "meals/getMeals",
    async (props) => {
        const res = await axios(`${BASE_URL}/${props[0]}.php?${props[1]}=${props[2]}`)
        return res.data.meals;
    }
)

export const mealsSlice = createSlice({
    name: 'meals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMeals.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getMeals.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.meals = payload;
        })
        builder.addCase(getMeals.rejected, (state) => {
            state.isLoading = false;
            console.log('error');
        })
    }
})

export default mealsSlice.reducer;