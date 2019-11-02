import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import LabelledField from '../../ui/LabelledField';
import { updatenewPublicationField } from '../../../redux/actions/publications';
import { submitPublication } from '../../../redux/actions/upload';
import styles from './PublicationAdder.scss';
import AutoCompleteField from '../../ui/autocompletefield';
import { selectProps } from '../../../utils/misc';
import Save from '../../ui/buttons/save';
import UploadIndicator from '../../ui/uploadIndicator';

const selectStyles = {
  container: provided => ({
    ...provided,
    width: '10em'
  })
};

class PublicationAdder extends Component {
  state = { publicationType: 'original' };

  pickType(ev) {
    const {
      target: { checked, value }
    } = ev;
    this.setState({ publicationType: checked && value === 'original' ? 'original' : 'reception' });
  }

  render() {
    const { dispatch, newPublication, publications, uploadStatus } = this.props;
    const { publicationType } = this.state;
    const fields = [
      { label: 'title', type: 'text' },
      { label: 'english title', type: 'text' },
      { label: 'document type', type: 'text' },
      { label: 'genre', type: 'text' },
      { label: 'language', type: 'text' },
      { label: 'publication', type: 'text' },
      { label: 'name', type: 'text' },
      { label: 'publish location', type: 'text' },
      { label: 'publisher', type: 'text' },
      { label: 'year', type: 'text' },
      { label: 'date', type: 'text' },
      { label: 'source', type: 'text' },
      { label: 'note', type: 'text' },
      { label: 'link', type: 'text' }
    ];
    const receptionTypes = ['translation', 'adaptation', 'review', 'article', 'other'].map(
      label => ({ label, value: label })
    );

    return (
      <div>
        <UploadIndicator uploadStatus={uploadStatus} dispatch={dispatch} />
        {uploadStatus === 'none' && (
          <form
            onSubmit={event => {
              event.preventDefault();
              dispatch(submitPublication(newPublication, publicationType));
            }}
          >
            <h1>Lisää yksittäinen teos</h1>
            <ul className={styles.typePicker}>
              <li>
                <input
                  type="radio"
                  value="original"
                  id="isOriginalRadio"
                  onChange={ev => this.pickType(ev)}
                  checked={publicationType === 'original'}
                />
                <label htmlFor="isOriginalRadio"> Alkuperäisteos</label>
              </li>
              <li>
                <input
                  type="radio"
                  value="reception"
                  id="isReceptionRadio"
                  onChange={ev => this.pickType(ev)}
                  checked={publicationType === 'reception'}
                />
                <label htmlFor="isReceptionRadio"> Reseptio</label>
              </li>
            </ul>
            {publicationType === 'reception' && (
              <div>
                <div>
                  <LabelledField label="Alkuperäisteos" type="other">
                    <AutoCompleteField
                      {...selectProps}
                      styles={selectStyles}
                      path="searchpublication"
                      noOptionsMessage="Kirjoita teoksen nimi..."
                      onChange={sel => dispatch(updatenewPublicationField('target', sel.value))}
                    />
                  </LabelledField>
                </div>
                <div>
                  <LabelledField label="Reseption tyyppi" type="other">
                    <Select
                      styles={selectStyles}
                      options={receptionTypes}
                      onChange={sel =>
                        dispatch(updatenewPublicationField('reception_type', sel.value))
                      }
                    />
                  </LabelledField>
                </div>
              </div>
            )}
            <LabelledField label="Tekijä (Sukunimi Etunimi)">
              <AutoCompleteField
                path="authornames"
                categoryName="flat"
                noOptionsMessage="Kirjoita olemassa oleva tai uusi tekijä  (Sukunimi Etunimi)..."
                creatable
                onChange={selected => dispatch(updatenewPublicationField('author', selected.value))}
                styles={selectStyles}
              />
            </LabelledField>
            {fields.map(field => (
              <LabelledField
                key={field.label}
                label={field.label}
                onChange={ev => dispatch(updatenewPublicationField(field.label, ev.target.value))}
                value={newPublication ? newPublication[field.label] : ''}
              />
            ))}
            <div>
              <Save text="Tallenna" />
            </div>
          </form>
        )}
      </div>
    );
  }
}

PublicationAdder.propTypes = {
  dispatch: PropTypes.func.isRequired,
  newPublication: PropTypes.shape({ title: PropTypes.string }).isRequired,
  publications: PropTypes.objectOf(PropTypes.object).isRequired,
  uploadStatus: PropTypes.oneOfType([Array, PropTypes.string])
};

PublicationAdder.defaultProps = {
  uploadStatus: 'none'
};

export default PublicationAdder;
