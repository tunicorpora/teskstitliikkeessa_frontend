import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { fetchContributions } from '../../../redux/actions/contribution';

export default class Contributionlist extends Component {
  componentDidMount() {
    this.props.dispatch(fetchContributions());
  }

  render() {
    let colnames = [],
      tbody = [];

    if (this.props.list.length) {
      colnames = Object.keys(this.props.list[0])
        .map(col => {
          if (col.indexOf('_') !== 0) {
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
              {colnames.map(colname => (
                <th key={`header_${colname}`}>{colname}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tbody.map((row, idx) => (
              <tr key={idx}>
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
