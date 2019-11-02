import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Publication from '../publication';
import pubStyles from '../inspector/inspector.scss';
import FilterSet from '../filterset';
import { performSearch, exportResults } from '../../../redux/actions/publications';
import { resetRouteState } from '../../../redux/actions/utils';
import BasicButton from '../../ui/buttons/BasicButton';
import Loader from '../../ui/CustomLoader';
import styles from './styles.scss';

class SearchPage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(resetRouteState());
  }

  render() {
    const {
      dispatch,
      searchResults,
      publications,
      filters,
      textTypeFilter,
      uploadStatus
    } = this.props;

    return (
      <div>
        <FilterSet
          dispatch={dispatch}
          filters={filters}
          action={() => dispatch(performSearch(filters, textTypeFilter))}
          textTypeFilter={textTypeFilter}
        />
        {uploadStatus.match('progress') && (
          <div class={styles.indicatorContainer}>
            <Loader />
          </div>
        )}
        {searchResults.length > 0 && (
          <section>
            {false && (
              <div>
                <BasicButton
                  text="vie tulokset json-muodossa"
                  onClick={() => dispatch(exportResults(searchResults))}
                />
              </div>
            )}
            <h2>Löytyneet tekstit ({searchResults.length})</h2>
            <ul className={pubStyles.receptionList}>
              {searchResults.map(pub => (
                <li>
                  <Publication details={pub} publications={publications} dispatch={dispatch} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }
}

SearchPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  publications: PropTypes.objectOf(PropTypes.object).isRequired,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  uploadStatus: PropTypes.oneOfType([Array, PropTypes.string]).isRequired
};

export default SearchPage;
