import React from 'react';
import PropTypes from 'prop-types';
import { resetUploadStatus } from '../../../redux/actions/upload';
import BasicButton from '../buttons/BasicButton';
import Loader from '../CustomLoader';
import styles from './styles.scss';

const uploadIndicator = props => {
  const { uploadStatus, dispatch } = props;

  if (uploadStatus === 'none') {
    return null;
  }
  if (['upload error', 'error'].includes(uploadStatus)) {
    return (
      <div>
        Lataus ei onnistunut. Ota yhteyttä ylläpitoon ja kerro, minkälaista tiedostoa yritit ladata.
        Päivitä sivu, jos haluat yrittää uudestaan.
      </div>
    );
  }
  if (uploadStatus === 'in progress') {
    return (
      <div>
        <p>Lataus käynnissä, odota hetki...</p>
        <div className={styles.narrow}>
          <Loader />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div>Lataus onnistui.</div>
      {Array.isArray(uploadStatus) && (
        <div>
          <h4>Ladattujen teosten tunnisteet:</h4>
          <ul>
            {uploadStatus.map(pub => (
              <li key={pub.id}>
                {pub.title}: {pub.id}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={styles.margined}>
        <BasicButton
          text="Jatka"
          onClick={() => dispatch(resetUploadStatus())}
          iconName="faArrowRight"
        />
      </div>
    </div>
  );
};

uploadIndicator.propTypes = {
  uploadStatus: PropTypes.oneOfType([Array, PropTypes.string]).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default uploadIndicator;
