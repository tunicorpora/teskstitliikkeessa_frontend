import PropTypes from 'prop-types';
import React from 'react';

import {
  deleteContribution,
  makeContributionEdit,
  saveContributionEdit,
  startContributionEdit,
  addPendingId,
  removePendingId
} from '../../../../redux/actions/contribution';
import BasicButton from '../../../ui/buttons/BasicButton';
import styles from './contributionlistrow.scss';

const contributionListRow = props => {
  const {
    id,
    dispatch,
    showControls,
    rowEdit,
    activeCols,
    filters,
    row,
    lastEdit,
    deletePending
  } = props;
  const editPending = id === rowEdit.id && rowEdit.id !== undefined;
  const batchPending = true;

  return (
    <tr className={lastEdit === row._id ? styles.lastEditedRow : ''}>
      <td>
        <input
          type="checkbox"
          name=""
          checked={deletePending}
          onChange={ev =>
            ev.target.checked ? dispatch(addPendingId(row._id)) : dispatch(removePendingId(row._id))
          }
        />
      </td>
      <td>{row._id}</td>
      {showControls && (
        <td key="controls" className={styles.controls}>
          <BasicButton
            onClick={() =>
              window.confirm('Haluatko varmasti poistaa?') &&
              dispatch(deleteContribution(id, filters))
            }
            noKeyDown
            iconName="faTrash"
            noBackground
            text=""
          />
          {editPending ? (
            <BasicButton
              onClick={() => dispatch(saveContributionEdit(rowEdit, filters))}
              iconName="faSave"
              noBackground
              noKeyDown
              text=""
            />
          ) : (
            <BasicButton
              onClick={() => dispatch(startContributionEdit(id))}
              iconName="faPencilAlt"
              noBackground
              text=""
            />
          )}
        </td>
      )}
      {activeCols.map(colname =>
        editPending ? (
          <td key={colname}>
            <input
              type="text"
              defaultValue={row[colname]}
              onChange={ev => dispatch(makeContributionEdit(colname, ev.target.value))}
            />
          </td>
        ) : (
          <td key={colname}>{row[colname]}</td>
        )
      )}
    </tr>
  );
};

contributionListRow.propTypes = {
  id: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  showControls: PropTypes.bool.isRequired,
  rowEdit: PropTypes.shape({ id: PropTypes.string }).isRequired,
  activeCols: PropTypes.arrayOf(PropTypes.string).isRequired,
  row: PropTypes.objectOf(PropTypes.any).isRequired,
  filters: PropTypes.arrayOf(PropTypes.any).isRequired,
  wasLastEdit: PropTypes.bool,
  deletePending: PropTypes.bool
};

contributionListRow.defaultProps = {
  wasLastEdit: false,
  deletePending: false
};

export default contributionListRow;
