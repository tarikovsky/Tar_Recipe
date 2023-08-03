import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import categoriesSlice from './categories/categoriesSlice';
import mealsSlice from './meals/mealsSlice';
import mealSlice from './meal/mealSlice';
import areasSlice from './areasSlice/areasSlice';
import favouritesSlice from './favourites/favouritesSlice';
import mealsByNameSlice from './getMealByName/getMealByNameSlice';
import randomMealSlice from './randomMeal/randomMealSlice';
import ingredientsSlice from './ingredients.ts/ingredientsSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    areas: areasSlice,
    ingredients: ingredientsSlice,
    meals: mealsSlice,
    meal: mealSlice,
    favorites: favouritesSlice,
    mealsByName: mealsByNameSlice,
    randomMeal: randomMealSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
