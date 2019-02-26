import React, { Component } from 'react';
import styles from './styles.scss';
import {
  updateFilter,
  removeFilter,
  filterContributions,
} from '../../../redux/actions/filter';
import { fetchContributions } from '../../../redux/actions/contribution';

export default class Filter extends Component {
  handleChange(field, val, idx) {
    const { dispatch, allfilters } = this.props;
    console.log(allfilters);
    dispatch(updateFilter(field, val, idx, allfilters));
  }

  render() {
    const { colnames, idx: filterIndex, dispatch } = this.props;

    return (
      <div className={styles.cont}>
        <div>
          {/*TODO: MIKÄ TAHANSA kenttä...*/}
          <select
            onChange={ev =>
              this.handleChange('fieldname', ev.target.value, filterIndex)
            }
          >
            {colnames.map((colname, idx) => {
              if (colname) {
                return <option key={`colnameopt _${idx}`}>{colname}</option>;
              }
            })}
          </select>
        </div>
        <div>
          <select
            onChange={ev =>
              this.handleChange('operator', ev.target.value, filterIndex)
            }
          >
            <option>Sisältää</option>
            <option>=</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            onChange={ev => {
              this.handleChange('value', ev.target.value, filterIndex);
            }}
          />
        </div>
        <div>
          <button onClick={() => dispatch(removeFilter(filterIndex))}>
            Poista ehto
          </button>
        </div>
      </div>
    );
  }
}
