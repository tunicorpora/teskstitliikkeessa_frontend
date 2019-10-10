import PropTypes from 'prop-types';
import React from 'react';

import { editSource, saveLinks } from '../../../redux/actions/links';
import AutoCompleteField from '../../ui/autocompletefield/index.jsx';
import ReceptionAdder from './receptionAdder/index.jsx';
import SaveButton from '../../ui/savebutton/index.jsx';
import styles from './linkadder.scss';
import { uploadData } from '../../../redux/actions/upload';

const linkAdder = props => {
  const { dispatch, links, publications } = props;

  const { source, receptions } = links;

  const selectProps = {
    path: 'publications',
    labelName: 'title',
    categoryName: '_id',
    tooltipName: ['title', 'author', 'Language']
  };

  const receptionAdders = [
    { label: 'Käännökset', labelInDatabase: 'translations' },
    { label: 'Adaptaatiot', labelInDatabase: 'adaptations' },
    { label: 'Muut', labelInDatabase: 'other' }
  ];

  return (
    <div className={styles.outerContainer}>
      <h1>Metodi 1: interaktiivisesti </h1>
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
      <div>
        <h1>Metodi 2: .xlsx-tiedostosta </h1>
        <form
          id="recuploadForm"
          onSubmit={event => {
            event.preventDefault();
            dispatch(uploadData(event.target, '_receptions'));
          }}
        >
          <p>Voit lisätä reseptioita myös .xlsx-tiedoston perusteella.</p>
          <div>
            <input id="recfilefield" type="file" name="upload" />
            <input type="submit" value="Lataa tiedosto" />
          </div>
        </form>
      </div>
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
        other: PropTypes.arrayOf(PropTypes.string)
      }
    }
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  publications: PropTypes.objectOf(PropTypes.object).isRequired
};

export default linkAdder;
