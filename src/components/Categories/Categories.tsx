import React, { FC, useEffect, useRef } from 'react'
import { useState } from 'react'

import style from './Categories.module.scss'
import { NavLink } from 'react-router-dom'
import {useAppSelector } from '../../hooks/hooks'
import { CSSTransition } from 'react-transition-group'



const Categories: React.FC = () => {
    const { categories } = useAppSelector(({ categories }) => categories);
    const { areas } = useAppSelector(({ areas }) => areas);
    const { ingredients } = useAppSelector(({ ingredients }) => ingredients);
    const [isOpenCategories, setIsOpenCategories] = useState(false);
    const [isOpenAreas, setIsOpenAreas] = useState(false);
    const [isOpenIngredients, setIsOpenIngredients] = useState(false);
    const [searchIngredient, setSearchIngredient] = useState('')


    //функция открытия/закрытия менюшек ингредиентов, категорий, областей (стран)
    const handleClick = (set: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
        let timeout = 0;
        if (!value &&
            (isOpenCategories || isOpenAreas || isOpenIngredients)) timeout = 600;
        isOpenIngredients && setIsOpenIngredients(false);
        isOpenCategories && setIsOpenCategories(false);
        isOpenAreas && setIsOpenAreas(false);
        setTimeout(() => {
            set(!value);
        }, timeout)
    }

    //При нажатие в любое место кроме меню, меню заркываается
    const menu = useRef<HTMLDivElement>(null);
    document.addEventListener('click', function (event) {
        if (!menu.current?.contains(event.target as Node) && (isOpenAreas || isOpenCategories || isOpenIngredients)) {
            handleClick(setIsOpenAreas, true);
        };
    });

    //управляемый инпут поиска ингредиента
    const handleIngredient = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchIngredient(e.target.value)
    }
    return (
        <>
            <div ref={menu} className={style.categories}>
                <div className={style.buttons}>
                    <p onClick={() => handleClick(setIsOpenCategories, isOpenCategories)} className={style.mainTitle}>Categories</p>
                    <p onClick={() => handleClick(setIsOpenAreas, isOpenAreas)} className={style.mainTitle}>Areas</p>
                    <p onClick={() => handleClick(setIsOpenIngredients, isOpenIngredients)} className={style.mainTitle}>Ingredients</p>
                </div>
                <div className={style.menus}>

                    <CSSTransition in={isOpenCategories} classNames={{
                        enter: style.alertMenuenter,
                        enterActive: style.alertMenuenteractive,
                        exit: style.alertMenuexit,
                        exitActive: style.alertMenuexitactive
                    }} timeout={600} unmountOnExit>
                        <>
                            <ul className={style.list}>
                                {categories.map(({ strCategory }) =>
                                    <li key={strCategory} className={style.itemSideBar}>
                                        <NavLink onClick={()=>handleClick(setIsOpenAreas, true)} className={style.link} to={`/area/categories/${strCategory}`}>
                                            <p className={style.descr}>{strCategory}</p>
                                        </NavLink>
                                    </li>
                                )}
                            </ul>
                        </>
                    </CSSTransition>

                    <CSSTransition in={isOpenAreas} classNames={{
                        enter: style.alertMenuenter,
                        enterActive: style.alertMenuenteractive,
                        exit: style.alertMenuexit,
                        exitActive: style.alertMenuexitactive
                    }} timeout={600} unmountOnExit>
                        <>
                            <ul className={style.list}>
                                {areas.map(({ strArea }) =>
                                    <li key={strArea} className={style.itemSideBar}>
                                        <NavLink onClick={()=>handleClick(setIsOpenAreas, true)} className={style.link} to={`/area/areas/${strArea}`}>
                                            <p className={style.descr}>{strArea}</p>
                                        </NavLink>
                                    </li>
                                )}
                            </ul>
                        </>
                    </CSSTransition>

                    <CSSTransition in={isOpenIngredients} classNames={{
                        enter: style.alertMenuenter,
                        enterActive: style.alertMenuenteractive,
                        exit: style.alertMenuexit,
                        exitActive: style.alertMenuexitactive
                    }} timeout={600} unmountOnExit>
                        <>
                            <div className={`${style.list} ${style.ingredients}`}>
                                <div className={style.content}>
                                    <p>Start typing the ingredient you want</p>
                                    <input value={searchIngredient} onChange={(e) => handleIngredient(e)} placeholder='Beef..' />
                                </div>
                                <div className={style.listIngredients}>
                                    <ul>
                                        {ingredients.filter(({ strIngredient }) => strIngredient.toLowerCase().includes(searchIngredient.toLowerCase())).
                                            map(({ strIngredient }) =>
                                                <NavLink onClick={()=>handleClick(setIsOpenAreas, true)} key={strIngredient} className={style.link} to={`/area/ingredients/${strIngredient}`}>
                                                    <p className={style.descr}>{strIngredient}</p>
                                                </NavLink>
                                            )}
                                    </ul>
                                </div>
                            </div>
                        </>
                    </CSSTransition>
                </div>
            </div>
            <CSSTransition in={isOpenAreas || isOpenCategories || isOpenIngredients} classNames={{
                enter: style.alertOverlayenter,
                enterActive: style.alertOverlayenteractive,
                exit: style.alertOverlayexit,
                exitActive: style.alertOverlayexitactive
            }} timeout={600} unmountOnExit>
                <div className={style.overlay}>

                </div>
            </CSSTransition>
        </>
    )
}

export default Categories