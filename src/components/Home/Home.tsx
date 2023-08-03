import React, { useEffect, useState } from 'react'
import styles from './Home.module.scss'
import CardMeal from '../CardMeal/CardMeal'

import { tenMeals } from './FirstMeals'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { IRandomMeal, getRandomMeal } from '../../feautures/randomMeal/randomMealSlice'
import { NavLink } from 'react-router-dom'


const Home: React.FC = () => {

  const [random10Meal, setRandomMeal] = useState<IRandomMeal>({ idMeal: "", strMeal: "", strMealThumb: "" })
  const dispatch = useAppDispatch();
  const { randomMeal, isLoading } = useAppSelector(({ randomMeal }) => randomMeal);
  const [isActiveRandom, setIsActiveRandom] = useState(true);
  const letters = "abcdefghijklmnopqrstuvwxyz".split('');

  //получение рандомного рецепта при загрузке страницы
  useEffect(() => {
    dispatch(getRandomMeal());
  }, [])

  //функция обновляет отображаемый рецепт в генераторе рандомных рецептов каждый time мс. 
  //В конце отправляет запрос на получение рандомного рецепта
  const handleGenerate = () => {
    setIsActiveRandom(false);
    let count = 0;
    let time = 200;
    let intervalGenerate = setTimeout(function run() {
      if (count < 9) {
        count += 1;
        time += 30;
        setRandomMeal(tenMeals[count]);
        intervalGenerate = setTimeout(run, time);
      }
      else {
        dispatch(getRandomMeal());
      }
    }, time)
  }


  useEffect(() => {
    setRandomMeal(randomMeal);
    setIsActiveRandom(true);
  }, [randomMeal])

  return (
    <>
      <div className={styles.homeWrapper}>

        <div className={styles.home}>
          <div id="random" className={styles.banner}>
            <img className={styles.photoBanner} src="images/banner2.jpg" alt='banner' />
            <div className={styles.RandomContent}>
              <h2>Pick a random recipe</h2>
              <p>If you don't want to think about what to eat today</p>
              {random10Meal.idMeal !== '' &&
                <div className={`${styles.meal} ${!isActiveRandom ? styles.active : ''}`}>
                  <CardMeal
                    idMeal={random10Meal.idMeal}
                    strMeal={random10Meal.strMeal}
                    strMealThumb={random10Meal.strMealThumb}
                    _isLiked={false}
                    showLike={false} />
                  <div className={`${styles.anim} ${isActiveRandom ? styles.active : ''}`}>
                    <div className={`${styles.stick} ${styles.left}`} />
                    <div className={`${styles.stick} ${styles.right}`} />
                    <div className={`${styles.stick} ${styles.left2}`} />
                    <div className={`${styles.stick} ${styles.right2}`} />
                  </div>
                </div>}
              <button onClick={handleGenerate} className={styles.generate}>regenerate</button>
            </div>
          </div>
          <div id="second" className={styles.banner}>
            <img className={styles.photoBanner} src="images/banner5.jpg" alt='banner' />
            <div className={styles.lettersContent}>
              <h2>Select recipe by first letter</h2>
              <p>{"Rumor has it that dishes that\r\nbegin with the first letter of your name are the tastiest."}</p>
              <div className={styles.wrapper}>
                <ul className={styles.list}>
                  {letters.map((l, id) =>
                    <NavLink key={l} className={styles.link} to={`/area/letters/${l}`}>
                      <li style={{ background: `rgb(${255 - 1.6 * id}, ${187 - 7.1 * id}, ${9.8 * id})` }} className={styles.letter}>
                        <span className={styles.l}>{l}</span>
                      </li>
                    </NavLink>
                  )
                  }
                </ul>
              </div>
            </div>
          </div>
          <div id="third" className={styles.banner}>
            <img className={styles.photoBanner} src="images/banner6.jpg" alt='banner' />
            <div className={styles.workingContent}>
              <h2>We have not completed this section of the site yet</h2>
              <p>you are sure to find something interesting</p>
              <figure><img src='/images/working.gif' /></figure>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </>
  )
}

export default Home