import React, { Component } from 'react';
import { uploadData, resetUploadStatus } from '../../../redux/actions/upload';
import styles from './styles.scss';
import generalStyles from '../../main/general_styles.scss';
import Deleter from './deleter';
import SaveButton from '../../ui/buttons/save';
import AddButton from '../../ui/buttons/add';
import UploadIndicator from '../../ui/uploadIndicator';

class xlsImporter extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(resetUploadStatus());
  }

  render() {
    const { dispatch, colnames, colEdit, uploadStatus } = this.props;

    let uploadInfo;

    return (
      <div>
        <UploadIndicator uploadStatus={uploadStatus} dispatch={dispatch} />
        {uploadStatus === 'none' && (
          <div className={styles.narrowed}>
            <form
              id="uploadForm"
              onSubmit={event => {
                event.preventDefault();
                dispatch(uploadData(event.target));
              }}
            >
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
        )}
      </div>
    );
  }
}

export default xlsImporter;
