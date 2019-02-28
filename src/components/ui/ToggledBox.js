import React, { Component } from 'react';
import styles from './uistyles.scss';
import generalStyles from '../../components/main/general_styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';

export default class ToggledBox extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  componentDidMount() {
    const { data, openByDefault } = this.props;
    if (data) {
      data();
    }
    if (openByDefault) {
      this.setState({ isOpen: true });
    }
  }

  render() {
    const { isOpen } = this.state,
      { children, header } = this.props;

    return (
      <section className={styles.Box}>
        <article>
          <div
            className={styles.opener}
            onClick={ev => {
              this.setState({ isOpen: !isOpen });
            }}
          >
            <FontAwesomeIcon icon={isOpen ? faCaretDown : faCaretRight} />
            <h3>{header}</h3>
          </div>
          <div className={isOpen ? styles.visible : styles.hidden}>
            {children}
          </div>
        </article>
      </section>
    );
  }
}
