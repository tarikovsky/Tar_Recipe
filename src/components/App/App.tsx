import React, { useEffect, useState } from 'react'
import AppRoutes from '../Routes/AppRoutes'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import styles from './App.module.scss'
import styleFav from '../Favorites/Favorites.module.scss'
import { useAppDispatch } from '../../hooks/hooks'
import { getCategories } from '../../feautures/categories/categoriesSlice'
import { getAreas } from '../../feautures/areasSlice/areasSlice'
import Favorites from '../Favorites/Favorites'
import { CSSTransition } from 'react-transition-group'
import { getIngredients } from '../../feautures/ingredients.ts/ingredientsSlice'


const App: React.FC = () => {
    const dispatch = useAppDispatch();

    //диспатч при первом запуске программы
    useEffect(() => {
        dispatch(getCategories());
        dispatch(getAreas());
        dispatch(getIngredients());
    }, [dispatch])
    const [isOpenFavorite, setIsOpenFavorite] = useState(false);

    //функция открытия/закрытия меню избранного
    const handleOpenFavorite = () => {
        setIsOpenFavorite(!isOpenFavorite);
    }
    return (
        <div className={styles.app}>
            <div className={styles.content}>
                <CSSTransition in={isOpenFavorite} classNames={{
                    enter: styleFav.alertEnter,
                    enterActive: styleFav.alertEnterActive,
                    exit: styleFav.alertExit,
                    exitActive: styleFav.alertExitActive
                }} timeout={300}
                    unmountOnExit>
                    <Favorites handleOpenFavorite={handleOpenFavorite} />
                </CSSTransition>
                <Header handleOpenFavorite={handleOpenFavorite} />
                <div className={`${styles.main_content} ${isOpenFavorite ? styles.goLeft : ''}`}>
                    <div>
                        <AppRoutes />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default App