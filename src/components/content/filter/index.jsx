import React, { Component } from 'react';
import Select from 'react-select';
import styles from './styles.scss';
import { updateFilter, removeFilter, filterContributions } from '../../../redux/actions/filter';
import BasicButton from '../../ui/buttons/BasicButton';

const selectStyle = {
  container: (provided) => ({
    ...provided,
    width: '20em',
  }),
};

const selectStyleSmall = {
  container: (provided) => ({
    ...provided,
    width: '8em',
  }),
};

const getOperatorText = (operator, fieldOptions) => {
  const pickedOption = fieldOptions.find((o) => o.value == operator);
  return pickedOption ? pickedOption.label : 'Sisältää';
};

export default class Filter extends Component {
  handleChange(field, val, idx) {
    const { dispatch, allfilters } = this.props;
    dispatch(updateFilter(field, val, idx, allfilters));
  }

  render() {
    const { colnames, idx: filterIndex, dispatch, allfilters } = this.props;

    let fieldOptions = [
      { label: 'Sisältää', value: 'Sisältää' },
      { label: 'On täsmälleen', value: '=' },
    ];

    if (allfilters[filterIndex].fieldname === 'year') {
      fieldOptions = [
        ...fieldOptions,
        { label: 'Suurempi kuin', value: '>' },
        { label: 'Pienempi kuin', value: '<' },
      ];
    }

    return (
      <div className={styles.cont}>
        <div>
          <Select
            styles={selectStyle}
            onChange={(selected) => this.handleChange('fieldname', selected.value, filterIndex)}
            value={{
              label: allfilters[filterIndex].fieldname,
              value: allfilters[filterIndex].fieldname,
            }}
            options={colnames
              .filter((colname) => colname)
              .map((colname) => ({ label: colname, value: colname }))}
          />
        </div>
        <div>
          <Select
            styles={selectStyleSmall}
            onChange={(selected) => this.handleChange('operator', selected.value, filterIndex)}
            value={{
              label: getOperatorText(allfilters[filterIndex].operator, fieldOptions),
              value: allfilters[filterIndex].operator,
            }}
            options={fieldOptions}
          />
        </div>
        <div>
          <input
            type="text"
            value={allfilters[filterIndex].value || ''}
            onChange={(ev) => {
              this.handleChange('value', ev.target.value, filterIndex);
            }}
          />
        </div>
        <div>
          <BasicButton
            customClass={styles.redButton}
            text="Poista ehto"
            onClick={() => dispatch(removeFilter(filterIndex))}
            iconName="faTrash"
          />
        </div>
      </div>
    );
  }
}
