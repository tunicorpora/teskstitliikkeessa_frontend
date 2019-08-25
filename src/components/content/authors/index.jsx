import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { testAuthors, fetchAuthors } from '../../../redux/actions/author';
import styles from './authors.scss';

export default class Authorlist extends Component {
  componentDidMount() {
    this.props.dispatch(fetchAuthors());
  }

  render() {
    return (
      <div className={styles.container}>
        <h2>Toimijat</h2>
        <ul>
          {this.props.list.map(author => (
            <li key={author._id}>{author.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
