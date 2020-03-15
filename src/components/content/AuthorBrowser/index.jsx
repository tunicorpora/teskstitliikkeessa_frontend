import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  listAuthorNames,
  fetchAuthorByName,
  listAuthorLetters
} from '../../../redux/actions/author';
import utilStyles from '../../../general_styles/utilities.scss';
import styles from './styles.scss';

const AuthorBrowser = props => {
  const { authorNames, authorLetters, dispatch, uploadStatus } = props;

  useEffect(() => {
    dispatch(listAuthorLetters());
  }, [authorLetters.join('')]);

  return (
    <div>
      <ul className={styles.letterList}>
        {authorLetters.map(letter => (
          <li key={letter}>
            <button
              className={utilStyles.linkButton}
              type="button"
              onClick={() => dispatch(listAuthorNames(letter))}
            >
              {letter}
            </button>
          </li>
        ))}
      </ul>
      <ul>
        {authorNames.map(name => (
          <li key={name}>
            <button
              className={utilStyles.linkButton}
              type="button"
              onClick={() => dispatch(fetchAuthorByName(name))}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

AuthorBrowser.propTypes = {
  authorNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  authorLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default AuthorBrowser;
