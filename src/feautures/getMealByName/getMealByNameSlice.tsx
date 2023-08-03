//редьюсер запроса поиска по имени

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

interface meal {
  idMeal: string,
  strMeal: string,
  strMealThumb: string
}

interface MealsByNameState {
  meals: meal[],
  isLoading: boolean,
}
const initialState = {
  meals: [],
  isLoading: false,
} as MealsByNameState

export const getMealByNameSlice = createAsyncThunk<
  meal[],
  string
>(
  "meals/getMealsByName",
  async (search) => {
    const res = await axios(`${BASE_URL}/search.php?s=${search}`)
    return res.data.meals;
  }
);

export const mealsByNameSlice = createSlice({
  name: 'mealsByName',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMealByNameSlice.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getMealByNameSlice.fulfilled, (state, { payload }) => {
      state.meals = payload;
      state.isLoading = false;
    })
    builder.addCase(getMealByNameSlice.rejected, (state) => {
      state.isLoading = false;
      console.log("error");
    })
  }
})

export default mealsByNameSlice.reducer;