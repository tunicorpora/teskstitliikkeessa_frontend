import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { editSource, saveLinks } from '../../../redux/actions/links';
import AutoCompleteField from '../../ui/autocompletefield/index.jsx';
import ReceptionAdder from './receptionAdder/index.jsx';
import SaveButton from '../../ui/savebutton/index.jsx';
import styles from './linkadder.scss';
import { uploadData, resetUploadStatus } from '../../../redux/actions/upload';
import { resetRouteState } from '../../../redux/actions/utils';
import BasicButton from '../../ui/buttons/BasicButton';
import Save from '../../ui/buttons/save';
import { selectProps } from '../../../utils/misc';
import UploadIndicator from '../../ui/uploadIndicator';

class linkAdder extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(resetRouteState());
  }

  render() {
    const { dispatch, links, publications, uploadStatus } = this.props;

    const { source, receptions } = links;

    const receptionAdders = [
      { label: 'Käännökset', labelInDatabase: 'translations' },
      { label: 'Adaptaatiot', labelInDatabase: 'adaptations' },
      { label: 'Arvostelut', labelInDatabase: 'reviews' },
      { label: 'Muut artikkelit / uutiset / blogitekstit ym.', labelInDatabase: 'articles' },
      { label: 'Muut reseptiot', labelInDatabase: 'other' }
    ];

    return (
      <div className={styles.outerContainer}>
        <UploadIndicator uploadStatus={uploadStatus} dispatch={dispatch} />
        {uploadStatus === 'none' && (
          <div>
            <h1>Reseptioiden lisäys</h1>
            <div className={styles.narrowed}>
              <form
                id="recuploadForm"
                onSubmit={event => {
                  event.preventDefault();
                  dispatch(uploadData(event.target, 'reception'));
                }}
              >
                <p>
                  Huom! Olethan muistanut lisätä ensin alkuperäisteokset (ks. linkki vasemmalla)?
                  <br />
                  <br />
                  Voit lisätä reseptioita .xlsx-tiedoston perusteella. Käytä{' '}
                  <a href="https://puolukka.uta.fi/files/tekstit_liikkeessa_pohja.xlsx">
                    samaa mallipohjaa
                  </a>{' '}
                  kuin alkuperäisteoksiin, mutta muista täyttää target- ja reception_type-sarakkeet.
                  Target-sarakkeeseen tarvittavat tunnisteet voit hakea Tekstit-sivun hakutoiminnon
                  avulla.
                </p>
                <div>
                  <input id="recfilefield" type="file" name="upload" />
                  <Save text="Lataa tiedosto" />
                </div>
              </form>
            </div>
            {true && (
              <div className={styles.marginedLarge}>
                <h1>Lisättyjen reseptioiden muokkaus</h1>
                <div className={`${styles.narrowed} ${styles.margined}`}>
                  Voit merkitä jonkin jo ladatun teoksen jonkin toisen teoksen reseptioksi alla
                  olevien pudotusvalikkojen avulla. Samalla tavoin voit poistaa tai muokata
                  lisättyjä reseptioita.
                </div>
                <div>
                  <AutoCompleteField
                    {...selectProps}
                    onChange={selected => dispatch(editSource(selected.value, publications))}
                    path="searchpublication"
                    noOptionsMessage="Kirjoita teoksen nimi..."
                  />
                </div>
                <div className={styles.container}>
                  {source && (
                    <div>
                      <ul className={styles.relationList}>
                        {receptionAdders.map(adder => (
                          <li key={adder.labelInDatabase}>
                            <ReceptionAdder
                              {...adder}
                              publications={publications}
                              dispatch={dispatch}
                              receptionIds={receptions[adder.labelInDatabase]}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className={styles.outerContainer}>
                  <SaveButton onClick={() => dispatch(saveLinks(links))} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

linkAdder.propTypes = {
  links: PropTypes.shape({
    links: {
      source: PropTypes.string,
      receptions: {
        translations: PropTypes.arrayOf(PropTypes.string),
        adaptations: PropTypes.arrayOf(PropTypes.string),
        reviews: PropTypes.arrayOf(PropTypes.string),
        articles: PropTypes.arrayOf(PropTypes.string),
        other: PropTypes.arrayOf(PropTypes.string)
      }
    }
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  publications: PropTypes.objectOf(PropTypes.object).isRequired
};

export default linkAdder;
