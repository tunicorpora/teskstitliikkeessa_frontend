import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  fetchContributions,
  deleteContribution,
  startContributionEdit,
  saveContributionEdit,
  makeContributionEdit,
} from '../../../redux/actions/contribution';

export default class Contributionlist extends Component {
  handleEdit(id, colname, newval) {
    let edited = { id: id };
    edited[colname] = newval;
    this.props.dispatch(makeContributionEdit(edited));
  }

  editOrSave(id, type) {
    if (type == 'Muokkaa') {
      this.props.dispatch(startContributionEdit(id));
    } else {
      this.props.dispatch(saveContributionEdit(this.props.rowEdit));
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchContributions());
  }

  render() {
    let colnames = [],
      tbody = [];
    const { dispatch, rowEdit } = this.props;

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
            {tbody.map((row, idx) => {
              const editText = row._id === rowEdit.id ? 'Tallenna' : 'Muokkaa';
              return (
                <tr key={row._id}>
                  <td key={`td_${idx}_utils`}>
                    <button
                      onClick={() => dispatch(deleteContribution(row._id))}
                    >
                      Poista
                    </button>
                    <button onClick={() => this.editOrSave(row._id, editText)}>
                      {editText}
                    </button>
                  </td>
                  <td key={`td_${idx}_author`}>{row.author.name}</td>
                  {colnames.map(colname => {
                    const key = `td_${idx}_${colname}`,
                      val = row[colname];
                    if (rowEdit.id === row._id) {
                      return (
                        <td key={key}>
                          <input
                            type="text"
                            defaultValue={val}
                            onChange={ev =>
                              this.handleEdit(row._id, colname, ev.target.value)
                            }
                          />
                        </td>
                      );
                    } else {
                      return <td key={key}>{val}</td>;
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
