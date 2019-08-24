import PropTypes from 'prop-types';
import React from 'react';

import { editReceptions, editSource, saveLinks } from '../../../redux/actions/links';
import { getTooltip } from '../../../utils/misc';
import AutoCompleteField from '../../ui/autocompletefield/index.jsx';
import SaveButton from '../../ui/savebutton/index.jsx';
import styles from './linkadder.scss';

const linkAdder = props => {
  const {
    dispatch,
    links: {
      source,
      receptions: { translations = [], adaptations = [] }
    },
    publications
  } = props;
  const selectProps = {
    path: 'publications',
    labelName: 'title',
    categoryName: '_id',
    tooltipName: ['title', 'author', 'Language']
  };

  const translationValues = translations.map(id => {
    const details = publications[id] || { title: '...', author: '', Language: '' };
    return {
      label: details.title || '...',
      value: id,
      tooltip: getTooltip(selectProps.tooltipName, details)
    };
  });

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
              <li>
                <div>Käännökset:</div>
                <div>
                  <AutoCompleteField
                    {...selectProps}
                    isMulti
                    value={translationValues}
                    onChange={selected =>
                      dispatch(editReceptions('translations', selected, publications))
                    }
                  />
                </div>
              </li>
              <li>
                <div>Adaptaatiot:</div>
                <div>
                  <AutoCompleteField
                    {...selectProps}
                    isMulti
                    onChange={selected => dispatch(editLink('adaptations', selected))}
                  />
                </div>
              </li>
              <li>
                <div>Muut:</div>
                <div>
                  <AutoCompleteField
                    {...selectProps}
                    isMulti
                    onChange={selected => dispatch(editLink('other', selected))}
                  />
                </div>
              </li>
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
        adaptations: PropTypes.arrayOf(PropTypes.string)
      }
    }
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  publications: PropTypes.objectOf(PropTypes.object).isRequired
};

export default linkAdder;
