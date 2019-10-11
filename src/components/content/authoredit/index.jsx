import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LabelledField from '../../ui/LabelledField';
import AutocompleteField from '../../ui/autocompletefield';
import {
  fetchAuthorByName,
  editAuthor,
  saveAuthorEdit,
  resetAuthor
} from '../../../redux/actions/author';
import BasicButton from '../../ui/buttons/BasicButton';
import styles from './styles.scss';

class AuthorEdit extends Component {
  state = { isEdit: true };

  switchToNew() {
    const { dispatch } = this.props;
    dispatch(resetAuthor());
    this.setState({ isEdit: false });
  }

  render() {
    const { dispatch, author } = this.props;
    const { isEdit } = this.state;
    return (
      <div>
        <div className={styles.switch}>
          <div>
            <input type="radio" checked={isEdit} onChange={() => this.setState({ isEdit: true })} />{' '}
            Muokkaa vanhaa
          </div>
          <div>
            <input type="radio" checked={!isEdit} onChange={() => this.switchToNew()} />
            Lisää uusi
          </div>
        </div>
        {isEdit && (
          <section className={styles.authorSearch}>
            <div className={styles.authorSearchHeading}>Hae tekijän nimellä</div>
            <AutocompleteField
              path="authornames"
              categoryName="flat"
              onChange={selected => dispatch(fetchAuthorByName(selected.value))}
            />
          </section>
        )}
        {(!isEdit || (isEdit && author.name)) && (
          <section>
            <section>
              <LabelledField
                value={author.name}
                label="Nimi"
                onChange={ev => dispatch(editAuthor('name', ev.target.value))}
              />
              <LabelledField
                value={author['other names']}
                label="Muut nimet (esim. tyttönimi)"
                onChange={ev => dispatch(editAuthor('other names', ev.target.value))}
              />
              <LabelledField
                value={author.pseudonyms}
                label="Pseudonyymit"
                onChange={ev => dispatch(editAuthor('pseudonyms', ev.target.value))}
              />
              <LabelledField
                value={author['year of birth']}
                inputType="number"
                label="Syntymävuosi"
                onChange={ev => dispatch(editAuthor('year of birth', ev.target.value))}
              />
              <LabelledField
                value={author['year of death']}
                inputType="number"
                label="Kuolinvuosi"
                onChange={ev => dispatch(editAuthor('year of death', ev.target.value))}
              />
              <LabelledField
                value={author.country}
                label="Maa / maat, joissa toiminut"
                onChange={ev => dispatch(editAuthor('country', ev.target.value))}
              />
              <LabelledField
                value={author.language}
                label="Kieli"
                onChange={ev => dispatch(editAuthor('language', ev.target.value))}
              />
              <LabelledField
                value={author['biographical details']}
                inputType="area"
                label="Elämäkerrallisia tietoja"
                onChange={ev => dispatch(editAuthor('biographical details', ev.target.value))}
              />
              <LabelledField
                value={author['professional details']}
                inputType="area"
                label="Ammatillisia tietoja"
                onChange={ev => dispatch(editAuthor('professional details', ev.target.value))}
              />
            </section>
            <section>
              <BasicButton
                iconName="faSave"
                text="Tallenna"
                onClick={() => dispatch(saveAuthorEdit(author))}
              />
            </section>
          </section>
        )}
      </div>
    );
  }
}

AuthorEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string,
    'professional details': PropTypes.string,
    'biographical details': PropTypes.string,
    language: PropTypes.string,
    country: PropTypes.string,
    'year of birth': PropTypes.number,
    'year of death': PropTypes.number,
    'other names': PropTypes.string,
    pseudonyms: PropTypes.string
  }).isRequired
};

export default AuthorEdit;
