//редьюсер, получение рецепта по id

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../../utils/constants"


interface IMeal {
    idMeal: string,
    strMeal: string,
    strDrinkAlternate: string,
    strCategory: string,
    strArea: string,
    strInstructions: string,
    strMealThumb: string,
    strTags: string,
    strYoutube: string,
    strIngredient1: string,
    strIngredient2: string,
    strIngredient3: string,
    strIngredient4: string,
    strIngredient5: string,
    strIngredient6: string,
    strIngredient7: string,
    strIngredient8: string,
    strIngredient9: string,
    strIngredient10: string,
    strIngredient12: string,
    strIngredient13: string,
    strIngredient14: string,
    strIngredient15: string,
    strIngredient16: string,
    strIngredient17: string,
    strIngredient18: string,
    strIngredient19: string,
    strIngredient20: string,
    strMeasure1: string,
    strMeasure2: string,
    strMeasure3: string,
    strMeasure4: string,
    strMeasure5: string,
    strMeasure6: string,
    strMeasure7: string,
    strMeasure8: string,
    strMeasure9: string,
    strMeasure10: string,
    strMeasure12: string,
    strMeasure13: string,
    strMeasure14: string,
    strMeasure15: string,
    strMeasure16: string,
    strMeasure17: string,
    strMeasure18: string,
    strMeasure19: string,
    strMeasure20: string,
}

interface MealState {
    meal: IMeal,
    isLoading: boolean,
}

const initialState = {
    meal: {},
    isLoading: false,
} as MealState

export const getMeal = createAsyncThunk<
    IMeal,
    string
>(
    'meal/getMeal',
    async (id) => {
        const res = await axios(`${BASE_URL}//lookup.php?i=${id}`);
        return res.data.meals[0];
    }
)

export const mealSlice = createSlice({
    name: 'meal',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMeal.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getMeal.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.meal = payload;
        })
        builder.addCase(getMeal.rejected, (state) => {
            state.isLoading = true;
            console.log('error');
        })
    }
})

export default mealSlice.reducer;