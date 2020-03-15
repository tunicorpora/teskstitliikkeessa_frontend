import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchAuthorByName } from '../../../redux/actions/author';
import { resetRouteState } from '../../../redux/actions/utils';
import AutocompleteField from '../../ui/autocompletefield';
import Publication from '../publication';
import styles from './inspector.scss';
import FoldableBox from '../../ui/foldablebox';
import SimpleTabs from '../../ui/simpleTabs';
import Tab from '../../ui/tab';
import AuthorBrowser from '../AuthorBrowser';

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

class AuthorInspector extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(resetRouteState());
  }

  render() {
    const {
      dispatch,
      author = {},
      publications: allPublications,
      authorNames,
			authorLetters,
			uploadStatus
    } = this.props;
    const { publications = [], _id, __v, ...authorDetails } = author;

    return (
      <div className={styles.inspector}>
        <SimpleTabs className={styles.searchContainer} headings={['Pikahaku', 'Selaus']}>
          <div className={styles.searchContainer}>
            <AutocompleteField
              path="authornames"
              categoryName="flat"
              onChange={selected => dispatch(fetchAuthorByName(selected.value))}
              noOptionsMessage="Kirjoita tekijän nimi..."
            />
          </div>
          <div>
            <AuthorBrowser
              authorNames={authorNames}
              dispatch={dispatch}
              authorLetters={authorLetters}
							uploadStatus={uploadStatus}
            />
          </div>
        </SimpleTabs>
        {authorDetails.name && (
          <section className={styles.authorBox}>
            <section className={styles.authorDetails}>
              {authorDetails.name && (
                <div>
                  <h3>{authorDetails.name}</h3>
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
                </div>
              )}
            </section>
            {publications.length > 0 && <h3>Teokset</h3>}
            <section>
              <ul className={styles.receptionList}>
                {publications.map(pub => (
                  <li key={pub._id}>
                    <Publication details={pub} publications={allPublications} dispatch={dispatch} />
                  </li>
                ))}
              </ul>
            </section>
          </section>
        )}
      </div>
    );
  }
}

AuthorInspector.propTypes = {
  authorNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  authorLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
  uploadStatus: PropTypes.string.isRequired
};

export default AuthorInspector;
