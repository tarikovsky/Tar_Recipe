import React, { useEffect, useState, useRef } from 'react'

import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/route'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getMealByNameSlice } from '../../feautures/getMealByName/getMealByNameSlice';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Categories from '../Categories/Categories';
// import Favorites from '../Favorites/Favorites';

interface IHeaderProps {
    handleOpenFavorite: () => void;
}


const Header: React.FC<IHeaderProps> = ({ handleOpenFavorite }) => {
    const { count } = useAppSelector(({ favorites }) => favorites)
    const [search, setSearch] = useState('');
    const dispatch = useAppDispatch();

    //управляемый инпут поиска
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    let { meals, isLoading } = useAppSelector(({ mealsByName }) => mealsByName);

    //вызов экшена фетча рецептов с новым состоянием поиска каждые полсекунды, если пользователь остановился вводить 
    useEffect(() => {
        const idTimeout = setTimeout(() => {
            dispatch(getMealByNameSlice(search));
        }, 500)
        return () => clearTimeout(idTimeout)
    }, [search])

    //отчищение стейта поиска (по сути закрытие меню поиска)
    const closeSearch = () => {
        setSearch('');
    }

    //закрытие меню поиска по нажатию куда-угодно кроме собственно меню поиска
    const searchId = useRef<HTMLDivElement>(null);
    document.addEventListener('mousedown', function (event) {
        if (!searchId.current?.contains(event.target as Node) && (search)) {
            closeSearch();
        };
    });


    return (
        <>
            <div className={styles.header}>
                <Link to={ROUTES.HOME}>
                    <div className={styles.logo}>
                    </div>
                </Link>
                <div className={styles.right}>
                    <Categories />
                    <div ref={searchId} className={styles.searchBlock}>
                        <form>
                            <div className={styles.searchBox}>
                                <input value={search} onChange={(e) => handleSearch(e)} className={styles.searchInput}
                                    type='search'
                                    placeholder='Search'
                                />
                                <div className={styles.searchImage} />
                                {search &&
                                    <div className={styles.searchBlock}>
                                        {meals &&
                                            <ul>
                                                {meals && meals.map(({ strMeal, strMealThumb, idMeal }) =>
                                                    <NavLink onClick={closeSearch} key={strMeal} className={styles.link} to={`/meals/${idMeal}`}>

                                                        <li key={idMeal}>
                                                            <img src={strMealThumb} />
                                                            <p>{strMeal}</p>
                                                        </li>
                                                    </NavLink>
                                                )}
                                            </ul>
                                        }
                                        <CSSTransition in={!meals} classNames={{
                                            enter: styles.emptySearchEnter,
                                            enterActive: styles.emptySearchEnterActive,
                                            exit: styles.emptySearchExit,
                                            exitActive: styles.emptySearchExitActive
                                        }} timeout={400} unmountOnExit>
                                            <div className={styles.empty}>
                                                <h2 className={styles.title}>Sorry, nothing found</h2>
                                                <img className={styles.image} src="/images/sad1.png" alt='sad' />
                                                <p className={styles.text}>Please try something else.</p>
                                            </div>
                                        </CSSTransition>
                                    </div>
                                }
                            </div>
                            <div className={styles.searchContainer}>
                            </div>
                        </form>
                    </div>
                    <div onClick={handleOpenFavorite} className={styles.favorites}>
                        <p className={styles.favText}>
                            Your favorite recipes
                        </p>
                        <img className={styles.favImage} src='/images/favorite.svg' alt="favorite" />
                        {count > 0 && <div className={styles.count}>
                            <span>{count}</span>
                        </div>}
                    </div>

                </div >
            </div >
        </>
    )
}

export default Header