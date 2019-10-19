import PropTypes from 'prop-types';
import React from 'react';

import { editSource, saveLinks } from '../../../redux/actions/links';
import AutoCompleteField from '../../ui/autocompletefield/index.jsx';
import ReceptionAdder from './receptionAdder/index.jsx';
import SaveButton from '../../ui/savebutton/index.jsx';
import styles from './linkadder.scss';
import { uploadData, resetUploadStatus } from '../../../redux/actions/upload';
import BasicButton from '../../ui/buttons/BasicButton';
import Save from '../../ui/buttons/save';

const linkAdder = props => {
  const { dispatch, links, publications, uploadStatus } = props;

  const { source, receptions } = links;

  const selectProps = {
    path: 'publication',
    labelName: 'title',
    categoryName: '_id',
    tooltipName: ['title', 'author', 'Language']
  };

  const receptionAdders = [
    { label: 'Käännökset', labelInDatabase: 'translations' },
    { label: 'Adaptaatiot', labelInDatabase: 'adaptations' },
    { label: 'Arvostelut', labelInDatabase: 'reviews' },
    { label: 'Muut artikkelit / uutiset / blogitekstit ym.', labelInDatabase: 'articles' },
    { label: 'Muut reseptiot', labelInDatabase: 'other' }
  ];

  return (
    <div className={styles.outerContainer}>
      <div className={styles.narrowed}>
        {uploadStatus === 'receptions ok' ? (
          <div>
            Lataus onnistui.
            <br /> <br />
            <BasicButton text="Lataa lisää" onClick={() => dispatch(resetUploadStatus())} />
          </div>
        ) : (
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
        )}
      </div>
      {false && (
        <div>
          <h1>Metodi 2: interaktiivisesti </h1>
          <div>
            Voit myös merkitä jonkin jo ladatun teoksen jonkin toisen teoksen reseptioksi alla
            olevien pudotusvalikkojen avulla.
          </div>
          <div>
            <AutoCompleteField
              {...selectProps}
              onChange={selected => dispatch(editSource(selected.value, publications))}
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
                        selectProps={selectProps}
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
  );
};

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
