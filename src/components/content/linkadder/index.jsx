import PropTypes from 'prop-types';
import React from 'react';

import { editSource, saveLinks } from '../../../redux/actions/links';
import AutoCompleteField from '../../ui/autocompletefield/index.jsx';
import ReceptionAdder from './receptionAdder/index.jsx';
import SaveButton from '../../ui/savebutton/index.jsx';
import styles from './linkadder.scss';

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
    <div>
      <h3>Teosten välisten linkkien (reseptioiden) lisäys</h3>
      <div className={styles.container}>
        <div>
          <AutoCompleteField
            {...selectProps}
            onChange={selected => dispatch(editSource(selected.value, publications))}
          />
        </div>
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
      <SaveButton onClick={() => dispatch(saveLinks(links))} />
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
