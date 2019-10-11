import React from 'react';
import PropTypes from 'prop-types';
import Filter from '../filter';
import styles from './filterset.scss';
import { addFilter } from '../../../redux/actions/filter';
import BasicButton from '../../ui/buttons/BasicButton';
import TextTypeFilter from '../textTypeFilter';

const FilterSet = props => {
  const { dispatch, filters, action, textTypeFilter } = props;
  const colnames = [
    'publisher',
    'title',
    'language',
    'author',
    'publish location',
    'publication name',
    'year',
    'source'
  ];
  return (
    <div>
      <section className={styles.optionContainer}>
        <h2 className={styles.boxHeader}>Hae tekstejä</h2>
        <div>
          {filters.map((_, idx) => (
            <Filter
              allfilters={filters}
              colnames={colnames}
              dispatch={dispatch}
              key={idx}
              idx={idx}
            />
          ))}
          <section className={styles.addButtonCont}>
            <BasicButton
              text="Lisää ehto"
              onClick={() => dispatch(addFilter(filters))}
              iconName="faPlus"
            />
          </section>

          <section>
            <ul className={styles.additionalConditions}>
              {Object.entries({
                original: 'Alkuperäisteksti',
                translations: 'Käännökset',
                reviews: 'Arvostelut',
                articles: 'Muut artikkelit / uutiset / blogitekstit',
                adaptations: 'Adaptaatiot',
                other: 'Muut reseptiot'
              }).map(([value, text]) => (
                <li key={value}>
                  <TextTypeFilter
                    textTypeFilter={textTypeFilter}
                    text={text}
                    value={value}
                    dispatch={dispatch}
                  />
                </li>
              ))}
            </ul>
          </section>

          <div className={styles.sbContainer}>
            <BasicButton
              onClick={action}
              text="Hae"
              iconName="faSearch"
              customClass={styles.searchButton}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

FilterSet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
  filters: PropTypes.objectOf(PropTypes.object).isRequired
};

export default FilterSet;
