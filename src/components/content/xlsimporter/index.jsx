import React from 'react';
import { testUpload, uploadData } from '../../../redux/actions/upload';
import ToggleBox from '../../ui/ToggledBox';
import styles from './styles.scss';
import generalStyles from '../../main/general_styles.scss';
import { fetchColNames } from '../../../redux/actions/contribution';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchAuthors } from '../../../redux/actions/author';

const removeCol = (colName, dispatch) => {
  const proceed = window.confirm(
    `Oletko varma, että haluat poistaa sarakkeen ${colName} ?`
  );
  if (proceed) {
    console.log('proceeding');
    fetch('http://localhost:3000/colnames/' + encodeURIComponent(colName), {
      method: 'DELETE',
    }).then(res => dispatch(fetchColNames()));
  }
};

export default ({ dispatch, colnames }) => {
  console.log(colnames);
  return (
    <div className={styles.narrowed}>
      <ToggleBox header="Tuo uutta dataa">
        <form
          id="uploadForm"
          onSubmit={event => {
            event.preventDefault();
            dispatch(uploadData(event.target));
          }}
        >
          <p>
            Voit tuoda tietokantaan uutta dataa lataamalla koneeltasi
            .xlsx-tiedoston. Tiedoston rakenteessa on huomioitava:
          </p>
          <ol>
            <li>Ensimmäisellä rivillä tulee olla sarakkeiden nimet</li>
            <li>
              Ensimmäisen sarakkeen tulee sisältää kunkin rivin kannalta
              oleellisen toimijan (kirjailijan yms.) nimi
            </li>
            <li>
              Jos .xlsx-tiedostossa on sarakkeita, joita tietokannassa ei ennen
              ole ollut, ne lisätään koko tietokantaan
            </li>
            <li>
              Tällä hetkellä tietokanta ei tunnista esim. päivämääriä. Niiden
              osalta pitäisi sopia erikseen, että esimerkiksi kaikki sarakkeet,
              joiden nimet päättyvät "pvm" sisältävät päivämäärään
            </li>
          </ol>
          <div className={generalStyles.verticalMargin}>
            <input id="filefield" type="file" name="upload" />
            <input type="submit" value="Lataa tiedosto" />
          </div>
        </form>
      </ToggleBox>
      <ToggleBox
        header="Muokkaa rakennetta"
        data={() => {
          dispatch(fetchColNames());
        }}
        openByDefault={true}
      >
        <p>
          Voit muokata tietokannasssa jo olevia kenttiä (taulukon sarakkeita)
          alla olevasta listasta. Klikkaamalla kynäkuvaketta voit muokata
          sarakkeen nimeä, klikkaamalla roskakoria voit poistaa sarakkeen.{' '}
          <strong>Huomaa: </strong>
          jos poistat sarakkeen, se poistetaan koko tietokannasta ja kaikki sen
          sisältämä tieto häviää.
        </p>
        <ul className={styles.spacyList}>
          {colnames.all.map(colname => (
            <li className={styles.fieldCont}>
              <div>
                <FontAwesomeIcon
                  className={styles.iconButton}
                  icon={faTrashAlt}
                  onClick={() => removeCol(colname, dispatch)}
                />
              </div>
              <div>
                <FontAwesomeIcon
                  className={styles.iconButton}
                  icon={faPencilAlt}
                />
              </div>
              <div>{colname}</div>
            </li>
          ))}
        </ul>
      </ToggleBox>
    </div>
  );
};
