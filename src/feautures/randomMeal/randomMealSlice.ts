//редьюсер, получение рандомного рецепта

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../../utils/constants"


export interface IRandomMeal {
    idMeal: string,
    strMeal: string,
    strMealThumb: string,
}

interface RamdomMealState {
    randomMeal: IRandomMeal,
    isLoading: boolean,
}

const initialState = {
    randomMeal: {},
    isLoading: false,
} as RamdomMealState

export const getRandomMeal = createAsyncThunk(
    'meal/getMeal',
    async () => {
        const res = await axios(`${BASE_URL}/random.php`);
        return res.data.meals[0];
    }
)

export const randomMealSlice = createSlice({
    name: 'randomMeal',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRandomMeal.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getRandomMeal.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.randomMeal = payload;
        })
        builder.addCase(getRandomMeal.rejected, (state) => {
            state.isLoading = true;
            console.log('error');
        })
    }
})

export default randomMealSlice.reducer;