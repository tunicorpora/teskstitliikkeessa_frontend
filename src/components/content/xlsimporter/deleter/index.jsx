import React from 'react';
import PropTypes from 'prop-types';
import { deleteAll } from '../../../../redux/actions/author';

const Deleter = props => {
  const { dispatch } = props;
  return (
    <div>
      <button
        type="button"
        onClick={() =>
          window.confirm('oletko AIVAN varma, että haluat poistaa kaiken?') && dispatch(deleteAll())
        }
      >
        Tyhjennä koko tietokanta
      </button>
    </div>
  );
};

Deleter.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default Deleter;
