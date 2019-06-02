import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import styles from './foldablebox.scss';

export default class FoldableBox extends Component {
  state = {
    open: false,
  };

  onOpenFired = false;

  setVisibilityStyle() {
    const { open } = this.state;
    const { useHack } = this.props;
    if (useHack) {
      return open
        ? { height: 'auto', visibility: 'visible', overflow: 'hidden' }
        : { height: '0', visibility: 'hidden', overflow: 'hidden' };
    }
    return open ? { display: 'block' } : { display: 'none' };
  }

  componentDidUpdate() {
    const { open } = this.state;
    const { onOpen } = this.props;
    if (onOpen && open && !this.onOpenFired) {
      onOpen();
      this.onOpenFired = true;
    }
  }

  render() {
    const {
      items = [],
      header = '',
      children = '',
      headerclass,
      onOpen,
      id,
    } = this.props;
    const { open } = this.state;

    return (
      <div className={styles.container} id={id}>
        <button
          className={styles.orderButton}
          onClick={() => this.setState({ open: !open })}
        >
          <FontAwesomeIcon icon={open ? faCaretDown : faCaretRight} />
          {header}
        </button>
        <div className={styles.dropDown} style={this.setVisibilityStyle()}>
          {children}
        </div>
      </div>
    );
  }
}
