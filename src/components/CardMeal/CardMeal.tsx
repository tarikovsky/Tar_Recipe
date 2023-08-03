import React, { useState,useEffect} from 'react'
import styles from './CardMeal.module.scss'
import { NavLink } from 'react-router-dom'
import { handle } from '../../feautures/favourites/favouritesSlice'
import { useAppDispatch } from '../../hooks/hooks'

interface ICardMeal {
    idMeal: string,
    strMealThumb: string,
    strMeal: string,
    _isLiked: boolean,
    showLike: boolean
}


const CardMeal: React.FC<ICardMeal> = ({ idMeal, strMealThumb, strMeal,_isLiked,showLike}) => {
    const [isLiked, setIdLiked] = useState(_isLiked);
    const dispatch = useAppDispatch();

    //добавление удаление из избранного
    const handleState = () => {
        dispatch(handle({strMeal,strMealThumb,idMeal}));
    }

    //изменение состояния лайка
    useEffect(()=>{
        setIdLiked(_isLiked);
    },[_isLiked])
    return (
        <li className={styles.link}>
            {showLike && <button onClick={handleState} className={isLiked ? styles.active : ""} />}
            <NavLink key={idMeal} className={styles.meal} to={`/meals/${idMeal}`}>
                <div className={styles.image}>
                    <img src={strMealThumb} />
                </div>
                <p className={styles.title}>{strMeal}</p>
            </NavLink>
        </li>
    )
}

export default CardMeal