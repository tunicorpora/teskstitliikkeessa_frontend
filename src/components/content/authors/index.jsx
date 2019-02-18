import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { testAuthors } from '../../../redux/actions/author';

export default class Authorlist extends Component {
  componentDidMount() {
    this.props.dispatch(testAuthors());
  }

  render() {
    return (
      <div>
        <h2>Toimijat</h2>
        <ul>
          {this.props.list.map((author, idx) => (
            <li key={idx}>{author}</li>
          ))}
        </ul>
      </div>
    );
  }
}
