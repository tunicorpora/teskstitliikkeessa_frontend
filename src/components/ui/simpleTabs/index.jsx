import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class SimpleTabs extends Component {
  state = { activeTabIdx: 0 };

  render() {
    const { children, headings } = this.props;
    const { activeTabIdx } = this.state;
    return (
      <div>
        <ul className={styles.tabList}>
          {headings.map((heading, idx) => (
            <li
              key={heading}
              className={idx === activeTabIdx ? styles.activeTabheading : styles.inactiveTabHeading}
            >
              <button type="button" onClick={() => this.setState({ activeTabIdx: idx })}>
                {heading}
              </button>
              <div className={styles.tabHeadingBottom}></div>
            </li>
          ))}
        </ul>
        <section className={styles.container}>
          <article className={styles.innerContainer}>{children[activeTabIdx]}</article>
        </section>
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  children: PropTypes.node.isRequired,
  headings: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default SimpleTabs;
