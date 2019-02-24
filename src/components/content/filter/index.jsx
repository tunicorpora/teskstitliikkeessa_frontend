import React, { Component } from 'react';
import styles from './styles.scss';
import {
  updateFilter,
  filterContributions,
} from '../../../redux/actions/filter';
import { fetchContributions } from '../../../redux/actions/contribution';

export default class Filter extends Component {
  handleChange(field, val, idx) {
    const { dispatch, allfilters } = this.props;
    console.log(allfilters);
    dispatch(updateFilter(field, val, idx, allfilters));
    //dispatch(fetchContributions(allfilters));
  }

  render() {
    const { colnames, idx: filterIndex } = this.props;

    return (
      <div className={styles.cont}>
        <div>
          {/*TODO: MIKÄ TAHANSA kenttä...*/}
          <select
            onChange={ev =>
              this.handleChange('fieldname', ev.target.value, filterIndex)
            }
          >
            <option>Toimija</option>
            {colnames.map((colname, idx) => {
              if (colname) {
                return <option key={`colnameopt _${idx}`}>{colname}</option>;
              }
            })}
          </select>
        </div>
        <div>sisältää</div>
        <div>
          <input
            type="text"
            onChange={ev => {
              this.handleChange('value', ev.target.value, filterIndex);
            }}
          />
        </div>
      </div>
    );
  }
}
