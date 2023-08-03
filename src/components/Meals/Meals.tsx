import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getMeals } from '../../feautures/meals/mealsSlice';

import styles from './Meals.module.scss'
import CardMeal from '../CardMeal/CardMeal';

const Meals: React.FC = () => {
    const { cats, id } = useParams();
    const dispatch = useAppDispatch();
    let catsStr = '';

    //отправка запроса на новый рецепт при изменении id
    //запрос зависит от cats
    useEffect(() => {
        if (id) {
            if (cats === 'categories') {
                dispatch(getMeals(['filter', 'c', id]));
            }
            else if (cats === 'areas') {
                dispatch(getMeals(['filter', 'a', id]));
            }
            else if (cats === 'ingredients') {
                dispatch(getMeals(['filter', 'i', id.split(' ').join('_').toLowerCase()]));
            }
            else if (cats === 'letters') {
                dispatch(getMeals(['search', "f", id]));
            }
        }
    }, [dispatch, id]);
    const { meals, isLoading } = useAppSelector(({ meals }) => meals);
    const { favs } = useAppSelector(({ favorites }) => favorites);
    return (
        <div className={styles.category}>
            {meals && !isLoading &&
                <>
                    <div className={styles.top}>
                        {cats &&
                            <>
                                <h2>{cats === 'categories' ? `Category: ${id}` : cats === 'areas' ? `Area: ${id}` : cats === 'ingredients' ? `Ingredient: ${id}` : cats ==="letters" ? `First letter: ${id?.toUpperCase()}` : ''}</h2>
                            </>
                        }
                    </div>
                    <div>
                        <ul className={styles.list}>
                            {meals.map(({ strMeal, strMealThumb, idMeal }) =>
                                <CardMeal
                                    key={strMeal}
                                    strMeal={strMeal}
                                    strMealThumb={strMealThumb}
                                    idMeal={idMeal}
                                    _isLiked={!!favs.find((meal) => meal.strMeal === strMeal)}
                                    showLike={true} />
                            )}
                        </ul>
                    </div>
                </>
            }
        </div>
    )

}

export default Meals