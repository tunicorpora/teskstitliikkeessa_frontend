import React, { Component } from 'react';
import { testUpload, uploadData } from '../../../redux/actions/upload';
import ToggleBox from '../../ui/ToggledBox';
import styles from './styles.scss';
import generalStyles from '../../main/general_styles.scss';
import {
  fetchColNames,
  startColEdit,
  saveColEdit,
  makeColedit,
} from '../../../redux/actions/contribution';
import {
  faPencilAlt,
  faTrashAlt,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchAuthors } from '../../../redux/actions/author';
import { isAuthenticated } from '../../auth/utils';

const removeCol = (colName, dispatch) => {
  const proceed = window.confirm(
    `Oletko varma, että haluat poistaa sarakkeen ${colName} ?`
  );
  if (proceed) {
    const jwt = isAuthenticated();
    const url = `${ENV.apiUrl}/colnames/` + encodeURIComponent(colName);
    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt.token,
      },
    }).then(() => dispatch(fetchColNames()));
  }
};

export default class Xlsimporter extends Component {
  render() {
    const { dispatch, colnames, colEdit, uploadStatus } = this.props;

    let uploadInfo;
    if (uploadStatus === 'in progress') {
      uploadInfo = <p>Lataus käynnissä, odota hetki...</p>;
    } else if (uploadStatus) {
      uploadInfo = <p>Lataus valmis, lisättiin {uploadStatus} tietuetta.</p>;
    }

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
                Jos .xlsx-tiedostossa on sarakkeita, joita tietokannassa ei
                ennen ole ollut, ne lisätään koko tietokantaan
              </li>
              <li>
                Tällä hetkellä tietokanta ei tunnista esim. päivämääriä. Niiden
                osalta pitäisi sopia erikseen, että esimerkiksi kaikki
                sarakkeet, joiden nimet päättyvät "pvm" sisältävät päivämäärään
              </li>
            </ol>
            <div className={generalStyles.verticalMargin}>
              <input id="filefield" type="file" name="upload" />
              <input type="submit" value="Lataa tiedosto" />
            </div>
            <div>{uploadInfo}</div>
          </form>
        </ToggleBox>
        <ToggleBox
          header="Muokkaa rakennetta"
          data={() => {
            dispatch(fetchColNames());
          }}
          openByDefault={false}
        >
          <p>
            Voit muokata tietokannasssa jo olevia kenttiä (taulukon sarakkeita)
            alla olevasta listasta. Klikkaamalla kynäkuvaketta voit muokata
            sarakkeen nimeä, klikkaamalla roskakoria voit poistaa sarakkeen.{' '}
            <strong>Huomaa: </strong>
            jos poistat sarakkeen, se poistetaan koko tietokannasta ja kaikki
            sen sisältämä tieto häviää.
          </p>
          <p>
            Nimiä muokatessa on myös syytä muistaa, että{' '}
            <strong>nimet eivät saa sisältää pisteitä</strong>
          </p>
          <ul className={styles.spacyList}>
            {colnames.all
              .filter(cname => cname !== 'Toimija')
              .map(colname => {
                const editIcon =
                  colEdit.name === colname ? (
                    <FontAwesomeIcon
                      className={styles.iconButton}
                      icon={faSave}
                      onClick={() =>
                        dispatch(saveColEdit(colname, colEdit.newname))
                      }
                    />
                  ) : (
                    <FontAwesomeIcon
                      className={styles.iconButton}
                      icon={faPencilAlt}
                      onClick={() => dispatch(startColEdit(colname))}
                    />
                  );
                const editField =
                  colEdit.name === colname ? (
                    <input
                      onChange={ev =>
                        dispatch(makeColedit(colname, ev.target.value))
                      }
                      type="text"
                      defaultValue={colEdit.newname}
                    />
                  ) : (
                    colname
                  );
                return (
                  <li className={styles.fieldCont}>
                    <div>
                      <FontAwesomeIcon
                        className={styles.iconButton}
                        icon={faTrashAlt}
                        onClick={() => removeCol(colname, dispatch)}
                      />
                    </div>
                    <div>{editIcon}</div>
                    <div>{editField}</div>
                  </li>
                );
              })}
          </ul>
        </ToggleBox>
      </div>
    );
  }
}
