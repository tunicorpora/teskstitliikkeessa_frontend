import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  startContributionEdit,
  saveContributionEdit,
  makeContributionEdit,
  changeColState
} from '../../../redux/actions/contribution';
import { performSearch } from '../../../redux/actions/publications';
import { isAuthenticated } from '../../auth/utils';
import ContributionlistRow from './contributionListRow';
import FilterSet from '../filterset';

class Contributionlist extends Component {
  handleEdit(id, colname, newval) {
    const { dispatch } = this.props;
    dispatch(makeContributionEdit(id, colname, newval));
  }

  handleColumnActivity(colname, checked) {
    const { dispatch } = this.props;
    dispatch(changeColState(colname, checked));
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
      editUtils: { lastEdit },
      textTypeFilter
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
        <FilterSet
          action={() => dispatch(performSearch(filters, {}))}
          filters={filters}
          dispatch={dispatch}
          textTypeFilter={textTypeFilter}
        />
        <table>
          <thead>
            <tr>
              <th key="dummy_id" />
              <th
                key="header_utils"
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

Contributionlist.propTypes = {
  dispatch: PropTypes.func.isRequired
};

Contributionlist.defaultProps = {
  list: []
};

export default Contributionlist;
