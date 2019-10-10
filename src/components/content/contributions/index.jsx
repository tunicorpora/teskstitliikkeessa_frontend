import { range } from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import download from 'downloadjs';

import { addFilter } from '../../../redux/actions/filter';
import {
  fetchContributions,
  deleteContribution,
  startContributionEdit,
  saveContributionEdit,
  makeContributionEdit,
  changeColState
} from '../../../redux/actions/contribution';
import { isAuthenticated } from '../../auth/utils';
import ContributionlistRow from './contributionListRow';
import Filter from '../filter/index.jsx';
import ToggledBox from '../../ui/ToggledBox';
import generalStyles from '../../main/general_styles.scss';
import styles from './styles.scss';

class Contributionlist extends Component {
  componentDidMount() {
    const { dispatch, filters } = this.props;
    dispatch(fetchContributions(filters));
  }

  handleEdit(id, colname, newval) {
    const { dispatch } = this.props;
    dispatch(makeContributionEdit(id, colname, newval));
  }

  exportToExcel() {
    const { filters } = this.props;
    let url = `${ENV.apiUrl}/entry/excel`;
    if (filters.length) {
      url += '?filters=' + encodeURIComponent(JSON.stringify(filters));
    }
    fetch(url)
      .then(response => response.blob())
      .then(file => download(file, 'tekstit-liikkeessa_tietokannasta.xlsx'));
  }

  handleColumnActivity(colname, checked) {
    this.props.dispatch(changeColState(colname, checked));
  }

  editOrSave(id, type) {
    const { dispatch, rowEdit, filters } = this.props;
    if (type == 'Muokkaa') {
      dispatch(startContributionEdit(id));
    } else {
      dispatch(saveContributionEdit(rowEdit, filters));
    }
  }

  render() {
    const {
      dispatch,
      rowEdit,
      filters,
      list,
      editUtils: { lastEdit }
    } = this.props;
    const showControls = isAuthenticated() !== false;
    const colnames = { all: [], active: [] };
    if (Array.isArray(list) && list.length) {
      const names = Object.keys(list[0]).filter(
        key =>
          !['receptions', 'receptionOf', '_id', 'reception_type', 'tempId', 'target'].includes(key)
      );
      colnames.all = [...names];
      colnames.active = [...names];
      //colnames.active = colnames.all;
    }

    return (
      <div>
        <section className={styles.optionContainer}>
          <ToggledBox header="Hakuehdot">
            {filters.map((_, idx) => (
              <Filter
                allfilters={filters}
                colnames={colnames.all}
                dispatch={dispatch}
                key={idx}
                idx={idx}
              />
            ))}

            <section className={generalStyles.verticalMargin}>
              <button onClick={() => dispatch(addFilter())}>Lisää hakuehto</button>
            </section>
          </ToggledBox>
          <ToggledBox header="Näytettävät kentät">
            <ul className={styles.fieldList}>
              {colnames.all.map(col => (
                <li key={col}>
                  <input
                    type="checkbox"
                    onChange={ev => this.handleColumnActivity(col, ev.target.checked)}
                    checked={colnames.active.indexOf(col) > -1 ? true : false}
                  />
                  {col}
                </li>
              ))}
            </ul>
          </ToggledBox>
        </section>

        <div />

        <table>
          <thead>
            <tr>
              <th
                key={`header_utils`}
                style={showControls ? { display: 'block' } : { display: 'none' }}
              />
              {colnames.active.map(colname => (
                <th key={`header_${colname}`}>{colname}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(list) &&
              list.map(row => (
                <ContributionlistRow
                  dispatch={dispatch}
                  id={row._id}
                  activeCols={colnames.active}
                  filters={filters}
                  rowEdit={rowEdit}
                  row={row}
                  showControls={showControls}
                  key={row._id}
                  lastEdit={lastEdit}
                />
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Contributionlist.defaultProps = {
  list: []
};

export default Contributionlist;
