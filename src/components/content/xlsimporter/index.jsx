import React, { Component } from 'react';
import { uploadData, resetUploadStatus } from '../../../redux/actions/upload';
import styles from './styles.scss';
import generalStyles from '../../main/general_styles.scss';
import Deleter from './deleter';
import SaveButton from '../../ui/buttons/save';
import AddButton from '../../ui/buttons/add';

class xlsImporter extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(resetUploadStatus());
  }

  render() {
    const { dispatch, colnames, colEdit, uploadStatus } = this.props;

    let uploadInfo;

    if (uploadStatus === 'in progress') {
      return (
        <div>
          <p>Lataus käynnissä, odota hetki...</p>
        </div>
      );
    }
    if (
      uploadStatus !== undefined &&
      !['none', 'upload error', 'receptions ok'].includes(uploadStatus)
    ) {
      return (
        <div>
          <div>Lataus valmis .</div>
          <h4>Ladattujen teosten tunnisteet:</h4>
          <ul>
            {Array.isArray(uploadStatus) &&
              uploadStatus.map(pub => (
                <li key={pub.id}>
                  {pub.title}: {pub.id}
                </li>
              ))}
          </ul>
          <div className={styles.margined}>
            <AddButton text="Lataa uusi tiedosto" onClick={() => dispatch(resetUploadStatus())} />
          </div>
        </div>
      );
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
            {uploadStatus === 'upload error' && <div>Latauksessa tapahtui virhe.</div>}
            <p>
              Aloita lataamalla koneeltasi alkuperäistekstejä sisältävä .xlsx-tiedosto. Tiedoston
              tulee vastata{' '}
              <a href="https://puolukka.uta.fi/files/tekstit_liikkeessa_pohja.xlsx">tätä</a>{' '}
              mallitiedostoa. Jos olet tuomassa reseptioita ennen kaikkea johonkuhun kirjailijaan,
              lataa silloinkin vähintään yksi teos nimellä "Määrittelemätön teos." Merkitse tämän
              jälkeen teoksen tunniste ylös ja lisää se reseptioita ladattaessa excel-tiedoston
              target-sarakkeeseen.
            </p>
            <div>{uploadInfo}</div>
            <div className={generalStyles.verticalMargin}>
              <input id="filefield" type="file" name="upload" />
              <SaveButton text="Lataa tiedosto" />
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
  }
}

export default xlsImporter;
