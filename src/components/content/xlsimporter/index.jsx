import React, { Component } from 'react';
import { testUpload, uploadData } from '../../../redux/actions/upload';
import ToggleBox from '../../ui/ToggledBox';
import styles from './styles.scss';
import generalStyles from '../../main/general_styles.scss';
import {
  fetchColNames,
  startColEdit,
  saveColEdit,
  makeColedit
} from '../../../redux/actions/contribution';
import { faPencilAlt, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchAuthors } from '../../../redux/actions/author';
import { isAuthenticated } from '../../auth/utils';
import Deleter from './deleter';

const xlsImporter = props => {
  const { dispatch, colnames, colEdit, uploadStatus } = props;

  let uploadInfo;
  if (uploadStatus === 'in progress') {
    uploadInfo = <p>Lataus käynnissä, odota hetki...</p>;
  } else if (uploadStatus !== undefined && uploadStatus !== 'none') {
    uploadInfo = <p>Lataus valmis, lisättiin {uploadStatus} tietuetta.</p>;
  }

  return (
    <div>
      <div className={styles.narrowed}>
        <form
          id="uploadForm"
          onSubmit={event => {
            event.preventDefault();
            dispatch(uploadData(event.target));
          }}
        >
          <p>
            Voit tuoda tietokantaan uutta dataa lataamalla koneeltasi .xlsx-tiedoston. Tiedoston
            tulee vastata LINKKI mallitiedostoa.
          </p>
          <div>{uploadInfo}</div>
          <div className={generalStyles.verticalMargin}>
            <input id="filefield" type="file" name="upload" />
            <input type="submit" value="Lataa tiedosto" />
          </div>
        </form>
      </div>
      {true && (
        <div className={styles.narrowed}>
          <Deleter dispatch={dispatch} />
        </div>
      )}
    </div>
  );
};

export default xlsImporter;
