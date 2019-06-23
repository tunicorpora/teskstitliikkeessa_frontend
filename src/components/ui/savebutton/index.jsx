import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class SaveButton extends Component {
  state = { pending: false, saved: false };

  launch() {
    const { onClick } = this.props;
    onClick();
    this.setState({ saved: true });
  }

  render() {
    const { saved, pending } = this.state;

    return (
      <div className={styles.container}>
        <button type="button" onClick={() => this.launch()}>
          Tallenna
        </button>
        {saved && <div className={styles.msg}>Tiedot tallennettu</div>}
      </div>
    );
  }
}

SaveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SaveButton;
