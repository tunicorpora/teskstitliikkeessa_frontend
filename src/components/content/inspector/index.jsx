import React from 'react';

import { fetchAuthorByName } from '../../../redux/actions/author';
import AutocompleteField from '../../ui/autocompletefield/index.jsx';
import Publication from '../publication/index.jsx';
import styles from './inspector.scss';
import FoldableBox from '../../ui/foldablebox';

const translateDetails = key => {
  switch (key) {
    case 'name':
      return 'Nimi';
    case 'pseudonyms':
      return 'Pseudonyymit';
    case 'other names':
      return 'Muut nimet';
    case 'year of birth':
      return 'Syntymävuosi';
    case 'year of death':
      return 'Kuolinvuosi';
    case 'country':
      return 'Maa, jossa aktiivinen';
    case 'language':
      return 'kieli';
    case 'biographical details':
      return 'Elämäkerrallisia tietoja';
    case 'professional details':
      return 'Ammatillisia tietoja';
    default:
      return key;
  }
};

export default props => {
  const { dispatch, author = {}, publications: allPublications } = props;
  const { publications = [], _id, __v, ...authorDetails } = author;

  return (
    <div className={styles.inspector}>
      <section className={styles.searchContainer}>
        <AutocompleteField
          path="authornames"
          categoryName="flat"
          onChange={selected => dispatch(fetchAuthorByName(selected.value))}
        />
      </section>
      <section className={styles.authorDetails}>
        {authorDetails.name && (
          <FoldableBox header="Tekijän tiedot">
            <ul>
              {authorDetails &&
                Object.entries(authorDetails).map(([key, val]) => (
                  <li key={key}>
                    <strong>{translateDetails(key)}</strong>: {val}
                  </li>
                ))}
            </ul>
          </FoldableBox>
        )}
      </section>
      {publications.length > 0 && <h3>Teokset</h3>}
      <section>
        <ul className={styles.receptionList}>
          {publications.map(pub => (
            <li>
              <Publication details={pub} publications={allPublications} dispatch={dispatch} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
