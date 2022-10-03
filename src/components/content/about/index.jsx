import React from 'react';
import styles from './styles.scss';
import Linder from '../../../images/Marie_Linder.jpg';
import Kollontai from '../../../images/1280px-Aleksandra_Kollontai.jpg';
import Gan from '../../../images/190px-Mother_HPB_Helena_Gan.jpg';
import Oksanen from '../../../images/Sofi2020_1_c_Toni_Harkonen-scaled.jpg';

export default () => (
  <div className={styles.wrapper}>
    <article className={styles.content}>
      <section className={styles.fi}>
        <img src={Oksanen} alt="Sofi Oksanen" className={styles.imgRight} />
        <img src={Gan} alt="Helena Gan" className={styles.imgRight} />

        <p>
          TeLi-tietokanta on suunniteltu TeLi-projektille. Tähän tietokantaan on koottu
          bibliografisia tietoja suomalaisten ja venäläisten naiskirjailijoiden kirjoittamista
          teoksista ja niiden käännöksistä ja muusta vastaanotosta Venäjällä ja Suomessa.{' '}
        </p>

        <p>
          TeLi -tietokanta sisältää tällä hetkellä yli 1000 nimeä suomalaisia ja venäläisiä
          naiskirjailijoita, kääntäjiä, tutkijoita, toimittajia ja muita kulttuurialan tekijöitä.
          Tietokannassa on yli 6000 tietuetta.
        </p>

        <p>
          Tervetuloa käyttämään tietokantaa. Klikkaa vasemmalta ylhäältä "tekstit" tai "tekijät"
          kiinnostuksesi mukaan - kirjautumista ei tarvita.
        </p>
      </section>

      <section className={styles.ru}>
        <img src={Kollontai} alt="Alexandra Kollontai" className={styles.imgLeft} />
        <img src={Linder} alt="Helena Gan" className={styles.imgLeft} />

        <p>
          База данных TeLi создана специально для проекта TeLi — «Тексты в движении». В базе данных
          собраны библиографические сведения о произведениях, написанных финляндскими и русскими
          писательницами и переведённых на (соответственно) русский и финский языки, а также
          информация о самых разных вариантах их рецепции в России и Финляндии, как то статьи в
          научных изданиях, рецензии в журналах, газетах и социальных сетях (в блогах и на
          интернет-форумах), театральные постановки и экранизации, радио- и телепрограммы.
        </p>

        <p>
          База данных TeLi постоянно пополняется: на конец 2022 года в ней представлены более 1000
          имён финляндских и русских/русскоязычных писательниц, переводчиц, исследователей,
          журналистов и других деятелей литературы и культуры. Общее количество рецепций составляет
          более 6000 записей.
        </p>

        <p>
          Пользование базой данных в гостевом режиме доступно без специального пароля. В разделе
          Tekstit (кнопка слева вверху экрана) можно вести поиск как по одному, так и по нескольким
          параметрам одновременно: автор, название произведения, издательство, язык, год и место
          издания. В разделе Tekijät, где представлены в алфавитном порядке имена писательниц,
          переводчиц и переводчиков, исследовательниц и исследователей, можно получить сразу всю
          информацию по конкретному автору (тексты, переводы, различные виды рецепций).
        </p>

        <p>Добро пожаловать в базу данных TeLi!</p>
      </section>

      <section className={styles.imageContainer}></section>
    </article>
  </div>
);
