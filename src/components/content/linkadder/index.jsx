import React from 'react';

import { editLink, saveLinks } from '../../../redux/actions/links';
import AutoCompleteField from '../../ui/autocompletefield/index.jsx';
import SaveButton from '../../ui/savebutton/index.jsx';
import styles from './linkadder.scss';

export default props => {
  const { dispatch, links } = props;
  const selectProps = {
    path: 'publications',
    labelName: 'title',
    categoryName: '_id',
    tooltipName: ['title', 'author', 'Language']
  };

  const { source } = links;

  return (
    <div>
      <h3>Teosten välisten linkkien (reseptioiden) lisäys</h3>
      <div className={styles.container}>
        <div>
          <AutoCompleteField
            {...selectProps}
            onChange={selected => dispatch(editLink('source', selected.value))}
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
                    onChange={selected => dispatch(editLink('translations', selected))}
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
      <SaveButton onClick={() => console.log('clicked!')} />
    </div>
  );
};
