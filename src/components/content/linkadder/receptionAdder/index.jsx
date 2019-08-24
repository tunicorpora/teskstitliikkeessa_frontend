import PropTypes from 'prop-types';
import React from 'react';

import { editReceptions } from '../../../../redux/actions/links';
import { getTooltip } from '../../../../utils/misc';
import AutoCompleteField from '../../../ui/autocompletefield/index.jsx';

const receptionAdder = props => {
  const { label, labelInDatabase, publications, dispatch, receptionIds, selectProps } = props;

  const values = receptionIds.map(id => {
    const details = publications[id] || { title: '...', author: '', Language: '' };
    return {
      label: details.title || '...',
      value: id,
      tooltip: getTooltip(selectProps.tooltipName, details)
    };
  });

  return (
    <div>
      <div>{label}</div>
      <div>
        <AutoCompleteField
          {...selectProps}
          isMulti
          value={values}
          onChange={selected => dispatch(editReceptions(labelInDatabase, selected, publications))}
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
  selectProps: PropTypes.shape({
    path: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    tooltipName: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

receptionAdder.defaultProps = {
  receptionIds: []
};

export default receptionAdder;
