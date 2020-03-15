import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AuthorForCombining from '../AuthorForCombining';
import styles from './styles.scss';
import BasicButton from '../../../ui/buttons/BasicButton';
import { combineAuthors } from '../../../../redux/actions/author';
import utilStyles from '../../../../general_styles/utilities.scss';

const AuthorCombiner = ({ onSubmit, initialCombineFrom }) => {
  const [combineTo, changeCombineTo] = useState({ name: '' });
  const [combineFrom, changeCombineFrom] = useState({ name: '' });

  const getAuthorForSelect = (name, setter) => {
    const url = `${process.env.API_URL}/author/${name}`;
    fetch(url)
      .then(response => response.json())
      .then(setter);
  };

  useEffect(() => {
    changeCombineFrom(initialCombineFrom);
  }, [initialCombineFrom]);

  return (
    <article>
      <div className={styles.container}>
        <AuthorForCombining
          onChange={selected => getAuthorForSelect(selected.value, changeCombineFrom)}
          author={combineFrom}
          text="Joka poistetaan"
        />
        <AuthorForCombining
          onChange={selected => getAuthorForSelect(selected.value, changeCombineTo)}
          author={combineTo}
          text="Joka jää voimaan"
        />
      </div>
      <BasicButton
        customClass={utilStyles.mt1}
        iconName="faCheck"
        onClick={() =>
          window.confirm(
            `Oletko varma? Tämä poistaa tekijän ${combineFrom.name} ja siirtä hänen teoksensa tekijälle ${combineTo.name}`
          ) && onSubmit(combineFrom.name, combineTo.name)
        }
        text="Vahvista yhdistäminen"
      />
    </article>
  );
};

AuthorCombiner.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialCombineFrom: PropTypes.shape({ name: PropTypes.string })
};

AuthorCombiner.defaultProps = {
  initialCombineFrom: { name: '' }
};

export default AuthorCombiner;
