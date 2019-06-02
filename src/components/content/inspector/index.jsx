import React from 'react';

import { fetchAuthorByName } from '../../../redux/actions/author';
import AutocompleteField from '../../ui/autocompletefield/index.jsx';
import Publication from '../publication/index.jsx';
import styles from './inspector.scss';

export default (props) => {
  const { dispatch, author = {}, publications: allPublications } = props;
  const { publications = [] } = author;

  return (
    <div className={styles.inspector}>
      <section className={styles.searchContainer}>
        <AutocompleteField
          path="authornames"
          categoryName="flat"
          onChange={selected => dispatch(fetchAuthorByName(selected.value))}
        />
      </section>
      {publications.length > 0 && <h3>Teokset</h3>}
      <section>
        <ul className={styles.receptionList}>
          {publications.map(pub => (
            <li>
              <Publication
                details={pub}
                publications={allPublications}
                dispatch={dispatch}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
