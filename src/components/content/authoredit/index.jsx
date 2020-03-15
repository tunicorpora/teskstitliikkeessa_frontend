import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LabelledField from '../../ui/LabelledField';
import AutocompleteField from '../../ui/autocompletefield';
import {
  fetchAuthorByName,
  editAuthor,
  saveAuthorEdit,
  resetAuthor,
  deleteAuthor,
  combineAuthors
} from '../../../redux/actions/author';
import BasicButton from '../../ui/buttons/BasicButton';
import UploadIndicator from '../../ui/uploadIndicator';
import AuthorCombiner from './AuthorCombiner';
import styles from './styles.scss';
import styleUtils from '../../../general_styles/utilities.scss';

class AuthorEdit extends Component {
  state = { isEdit: true, isCombining: false };

  switchToNew() {
    const { dispatch } = this.props;
    dispatch(resetAuthor());
    this.setState({ isEdit: false });
  }

  render() {
    const { dispatch, author, uploadStatus } = this.props;
    const { isEdit, isCombining } = this.state;

    return (
      <div>
        <UploadIndicator dispatch={dispatch} uploadStatus={uploadStatus} />
        {uploadStatus === 'none' && (
          <div>
            <div className={styles.switch}>
              <div>
                <input
                  type="radio"
                  checked={isEdit}
                  onChange={() => this.setState({ isEdit: true })}
                />{' '}
                Muokkaa vanhaa
              </div>
              <div>
                <input type="radio" checked={!isEdit} onChange={() => this.switchToNew()} />
                Lisää uusi
              </div>
            </div>
            {isEdit && !isCombining && (
              <div>
                <div className={styles.authorSearch}>
                  <div className={styles.authorSearchHeading}>Hae tekijän nimellä</div>
                  <AutocompleteField
                    path="authornames"
                    categoryName="flat"
                    noOptionsMessage="Kirjoita tekijän nimi..."
                    onChange={selected => dispatch(fetchAuthorByName(selected.value))}
                  />
                </div>
              </div>
            )}
            {isCombining && (
              <AuthorCombiner
                initialCombineFrom={author}
                onSubmit={(from, to) => {
                  this.setState({ isCombining: false });
                  dispatch(combineAuthors(from, to));
                }}
              />
            )}
            {isEdit && author.name && !isCombining && (
              <div className={`${styles.margined} ${styles.buttonContainer}`}>
                <BasicButton
                  text="Poista tekijä"
                  iconName="faTrash"
                  onClick={() =>
                    window.confirm(`Oletko varma? Tämä poistaa myös kaikki tekijän teokset? `) &&
                    dispatch(deleteAuthor(author._id))
                  }
                />
                <BasicButton
                  iconName="faArrowRight"
                  customClass={styleUtils.ml1}
                  onClick={() => this.setState({ isCombining: true })}
                  text="Yhdistä toiseen"
                />
              </div>
            )}
            {(!isEdit || (isEdit && author.name)) && !isCombining && (
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
