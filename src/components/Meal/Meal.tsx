import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { useParams } from 'react-router-dom';
import { getMeal } from '../../feautures/meal/mealSlice';

import styles from './Meal.module.scss'
import { handle } from '../../feautures/favourites/favouritesSlice';

const Meal: React.FC = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    //получение нового рецепта при изменении id 
    useEffect(() => {
        id && dispatch(getMeal(id));
    }, [dispatch, id])

    const { meal, isLoading } = useAppSelector(({ meal }) => meal);
    const { favs } = useAppSelector(({ favorites }) => favorites)
    const { idMeal, strMeal, strCategory, strArea, strInstructions, strMealThumb, strYoutube } = meal;
    
    //добавление удаление из избранного
    const handleFavorites = () => {
        dispatch(handle({ idMeal, strMeal, strMealThumb }));
    }
    const foundLiked = !!favs.find((meal) => meal.idMeal === idMeal);

    //замена нужного куска строки для воспроизведения 
    let newYoutube = strYoutube;
    if (newYoutube) newYoutube = newYoutube.replace("watch?v=", "embed/")
    console.log(newYoutube);


    // дальше кусок кода парсит наш рецепт и заполняет массивы ingredients и measures
    let ingredients = [];
    let count_ingredients: number = 1;
    let ingredient = `strIngredient1`

    let measures: string[] = [];
    let count_measures: number = 1;
    let measure = `strMeasure1`
    for (let [key, val] of Object.entries(meal)) {
        if (key === ingredient && val?.trim() !== '') {
            ingredients.push(val);
            count_ingredients++;
            ingredient = `strIngredient${count_ingredients}`;
        }
        else if (key === measure && val?.trim() !== '') {
            measures.push(val);
            count_measures++;
            measure = `strMeasure${count_measures}`;
        }
    }


    return (
        <div className={styles.meal}>
            {!isLoading && meal &&
                <>
                    <h2 className={styles.title}>{strMeal}</h2>
                    <div className={styles.recipe}>
                        <div className={styles.photo}>
                            <div className={styles.favorite}>
                                <button onClick={handleFavorites} className={foundLiked ? styles.active : ""} />
                            </div>
                            <img src={strMealThumb} alt='meal' />
                        </div>
                        <ul className={styles.ingredients}>
                            {ingredients.map((item, id) =>
                                <li key={item + id}>
                                    <span className={styles.ingredient}>{item}</span>
                                    {measures[id]
                                        ?
                                        <span className={styles.dots}>.................................................................................</span>
                                        :
                                        <span className={styles.dots}>.</span>
                                    }
                                    <span className={styles.measure}>{measures[id]}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                    <iframe
                        width="560"
                        height="315"
                        src={newYoutube}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; 
            clipboard-write; encrypted-media; 
            gyroscope; picture-in-picture; 
            web-share">

                    </iframe>
                    {strInstructions && <p className={styles.instructions}>{strInstructions.split('\r\n\r\n').join('\r\n').split('\r\n').join(`\r\n\r\n`)}</p>}
                </>}
        </div>
    )
}

export default Meal