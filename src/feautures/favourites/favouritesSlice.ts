//редьюсер добавления и удаления элементов в избранном

import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface meal {
    strMeal: string,
    strMealThumb: string,
    idMeal: string
}
interface FavouriteState {
    favs: meal[],
    count:number,
}
const initialState = {
    favs: [],
    count: 0
} as FavouriteState


export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        handle: (state, action: PayloadAction<meal>) => {
            const found = state.favs.findIndex((meal) => meal.strMeal === action.payload.strMeal);
            if (found !== -1) {
                state.favs.splice(found, 1);
            }
            else {
                state.favs.push(action.payload);
            }
            state.count = state.favs.length;
        }
    },
})

export const { handle } = favouritesSlice.actions;
export default favouritesSlice.reducer;