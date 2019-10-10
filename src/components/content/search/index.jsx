import React from 'react';
import PropTypes from 'prop-types';
import Publication from '../publication';
import pubStyles from '../inspector/inspector.scss';
import FilterSet from '../filterset';
import { performSearch } from '../../../redux/actions/publications';

const SearchPage = props => {
  const { dispatch, searchResults, publications, filters, textTypeFilter } = props;
  return (
    <div>
      <FilterSet
        dispatch={dispatch}
        filters={filters}
        action={() => dispatch(performSearch(filters, textTypeFilter))}
        textTypeFilter={textTypeFilter}
      />
      {searchResults.length > 0 && (
        <section>
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
};

SearchPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  publications: PropTypes.objectOf(PropTypes.object).isRequired,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default SearchPage;
