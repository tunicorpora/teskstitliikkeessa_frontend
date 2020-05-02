import PropTypes from 'prop-types';
import React from 'react';

import { editReceptions } from '../../../../redux/actions/links';
import { selectProps, formatReceptionValues } from '../../../../utils/misc';
import AutoCompleteField from '../../../ui/autocompletefield/index';

const receptionAdder = props => {
  const { label, labelInDatabase, publications, dispatch, receptionIds } = props;

  const values = receptionIds.map(id => formatReceptionValues(id, publications));

  return (
    <div>
      <div>{label}</div>
      <div>
        <AutoCompleteField
          {...selectProps}
          isMulti
          value={values}
          path="searchpublication"
          onChange={selected => dispatch(editReceptions(labelInDatabase, selected, publications))}
          noOptionsMessage="Kirjoita teoksen nimi..."
        />
      </div>
    </div>
  );
};

receptionAdder.propTypes = {
  label: PropTypes.string.isRequired,
  labelInDatabase: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  publications: PropTypes.objectOf(PropTypes.object).isRequired,
  receptionIds: PropTypes.arrayOf(PropTypes.string),
};

receptionAdder.defaultProps = {
  receptionIds: []
};

export default receptionAdder;
