import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  fetchContributions,
  deleteContribution,
} from '../../../redux/actions/contribution';

export default class Contributionlist extends Component {
  componentDidMount() {
    this.props.dispatch(fetchContributions());
  }

  render() {
    let colnames = [],
      tbody = [];
    const { dispatch } = this.props;

    if (this.props.list.length) {
      colnames = Object.keys(this.props.list[0])
        .map(col => {
          // Note: skipping the author column
          if (col.indexOf('_') !== 0 && col !== 'author') {
            return col;
          }
        })
        .filter(item => item !== undefined);
      tbody = this.props.list;
    }

    return (
      <div>
        <h2>Kontribuutiot</h2>
        <p>
          Kontribuutioilla tarkoitetaan tässsä kaikkia "kirjallisia tekoja":
          kirjoja, käännöksiä, artikkeleita, mainintoja...
        </p>
        <table>
          <thead>
            <tr>
              <th key={`header_utils`} />
              <th key={`header_author`}>Toimija</th>
              {colnames.map(colname => (
                <th key={`header_${colname}`}>{colname}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tbody.map((row, idx) => (
              <tr key={row._id}>
                <td key={`td_${idx}_utils`}>
                  <button onClick={() => dispatch(deleteContribution(row._id))}>
                    Poista
                  </button>
                  <button>Muokkaa</button>
                </td>
                <td key={`td_${idx}_author`}>{row.author.name}</td>
                {colnames.map(colname => (
                  <td key={`td_${idx}_${colname}`}>{row[colname]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
