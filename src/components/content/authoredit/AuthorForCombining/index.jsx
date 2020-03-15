import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import AutocompleteField from '../../../ui/autocompletefield';

const AuthorForCombining = ({ onChange, text, author }) => {
  const { publications } = author;
  return (
    <article className={styles.container}>
      <header className={styles.authorSearchHeading}>Valitse tekijä, {text}</header>
      <AutocompleteField
        path="authornames"
        categoryName="flat"
        noOptionsMessage="Kirjoita tekijän nimi..."
        onChange={selected => onChange(selected)}
        value={author.name}
        label={author.name}
      />
      {publications !== undefined && <footer>Teoksia: {publications.length}</footer>}
    </article>
  );
};

AuthorForCombining.propTypes = {
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  author: PropTypes.shape({ name: '' }).isRequired
};

export default AuthorForCombining;
