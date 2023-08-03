import React from 'react'

import styles from './Favorites.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { handle } from '../../feautures/favourites/favouritesSlice';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group'

interface IFavoritesProps {
    handleOpenFavorite: () => void;
}


const Favorites: React.FC<IFavoritesProps> = ({ handleOpenFavorite }) => {

    const { favs, count } = useAppSelector(({ favorites }) => favorites)
    const dispatch = useAppDispatch();

    //вызов удаления объекта из избранного
    const remove = (strMeal: string, strMealThumb: string, idMeal: string) => {
        dispatch(handle({ strMeal, strMealThumb, idMeal }));
    }
    return (
        <>
            <div className={styles.favsContainer}>

                <div onClick={handleOpenFavorite} className={styles.overlay}>

                </div>
                <div className={styles.favorites}>
                    <div className={styles.header}>
                        <h2>Favorites</h2>
                        <button onClick={handleOpenFavorite} className={styles.close} />
                    </div>
                    {
                        count > 0 &&
                        <ul className={styles.list}>
                            {
                                favs.map(({ strMeal, strMealThumb, idMeal }) =>
                                    <div className={styles.card}>
                                        <button onClick={() => remove(strMeal, strMealThumb, idMeal)} />
                                        <NavLink onClick={handleOpenFavorite} key={strMeal} className={styles.link} to={`/meals/${idMeal}`}>
                                            <li>
                                                <div className={styles.content}>
                                                    <p>{strMeal}</p>
                                                </div>
                                                <img src={strMealThumb} alt='meal' />
                                            </li>
                                        </NavLink>
                                    </div>
                                )
                            }
                        </ul>}
                    <CSSTransition in={count === 0} classNames={{
                        enter: styles.emptyFavEnter,
                        enterActive: styles.emptyFavEnterActive,
                    }} timeout={400} unmountOnExit>
                        <div className={styles.empty}>
                            <h2 className={styles.title}>It's empty here</h2>
                            <img className={styles.image} src="/images/sad2.png" alt='sad2' />
                            <p className={styles.text}>It's time to add something to your favorites!</p>
                        </div>
                    </CSSTransition>
                </div>
            </div>
        </>
    )
}

export default Favorites