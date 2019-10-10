import React, { Component } from 'react';
import styles from './styles.scss';
import { updateFilter, removeFilter, filterContributions } from '../../../redux/actions/filter';
import { fetchContributions } from '../../../redux/actions/contribution';

export default class Filter extends Component {
  handleChange(field, val, idx) {
    const { dispatch, allfilters } = this.props;
    dispatch(updateFilter(field, val, idx, allfilters));
  }

  render() {
    const { colnames, idx: filterIndex, dispatch, allfilters } = this.props;

    return (
      <div className={styles.cont}>
        <div>
          {/*TODO: MIKÄ TAHANSA kenttä...*/}
          <select
            onChange={ev => this.handleChange('fieldname', ev.target.value, filterIndex)}
            value={allfilters[filterIndex].fieldname}
          >
            {colnames.map((colname, idx) => {
              if (colname) {
                return (
                  <option value={colname} key={`colnameopt _${idx}`}>
                    {colname}
                  </option>
                );
              }
            })}
          </select>
        </div>
        <div>
          <select
            onChange={ev => this.handleChange('operator', ev.target.value, filterIndex)}
            value={allfilters[filterIndex].operator}
          >
            <option>Sisältää</option>
            <option value="=">On täsmälleen</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            value={allfilters[filterIndex].value || ''}
            onChange={ev => {
              this.handleChange('value', ev.target.value, filterIndex);
            }}
          />
        </div>
        <div>
          <button onClick={() => dispatch(removeFilter(filterIndex))}>Poista ehto</button>
        </div>
      </div>
    );
  }
}
