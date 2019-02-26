import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  fetchContributions,
  deleteContribution,
  startContributionEdit,
  saveContributionEdit,
  makeContributionEdit,
  fetchColNames,
  changeColState,
} from '../../../redux/actions/contribution';
import { addFilter } from '../../../redux/actions/filter';
import { isAuthenticated } from '../../auth/utils';
import Filter from '../filter/index.jsx';
import { range } from 'lodash';

export default class Contributionlist extends Component {
  handleEdit(id, colname, newval, authorId) {
    this.props.dispatch(
      makeContributionEdit({
        [colname]: newval,
        id: id,
        authorId: authorId,
      })
    );
  }

  handleColumnActivity(colname, checked) {
    this.props.dispatch(changeColState(colname, checked));
  }

  editOrSave(id, type) {
    if (type == 'Muokkaa') {
      this.props.dispatch(startContributionEdit(id));
    } else {
      this.props.dispatch(
        saveContributionEdit(this.props.rowEdit, this.props.filters)
      );
    }
  }

  componentDidMount() {
    const { dispatch, filters } = this.props;
    dispatch(fetchColNames());
    dispatch(fetchContributions(filters));
  }

  render() {
    const { dispatch, rowEdit, filters, colnames, list } = this.props,
      showcontrols = isAuthenticated(),
      tbody = list.data.length ? list.data : [];
    // tbody = list.data.length ? list.data : [];

    return (
      <div>
        <h2>Kontribuutiot</h2>
        <p>
          Kontribuutioilla tarkoitetaan tässsä kaikkia "kirjallisia tekoja":
          kirjoja, käännöksiä, artikkeleita, mainintoja...
        </p>

        <h3>Suodata</h3>

        {filters.map((filter, idx) => (
          <Filter
            allfilters={filters}
            colnames={colnames.active}
            dispatch={dispatch}
            key={idx}
            idx={idx}
          />
        ))}

        <button onClick={() => dispatch(addFilter())}>
          Lisää pakollinen ehto
        </button>

        <div>
          Näytettävät kentät
          <ul>
            {colnames.all.map(col => (
              <li>
                <input
                  type="checkbox"
                  onChange={ev =>
                    this.handleColumnActivity(col, ev.target.checked)
                  }
                  checked={colnames.active.indexOf(col) > -1 ? true : false}
                />{' '}
                {col}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ul>
            <li> Yhteensä tuloksia: {list.meta.total}</li>
            {range(1, list.meta.pages).map(no => (
              <li>
                <a
                  href="javascript:void(0)"
                  onClick={() => dispatch(fetchContributions(filters, no))}
                >
                  {no}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <table>
          <thead>
            <tr>
              <th
                key={`header_utils`}
                style={
                  showcontrols ? { display: 'block' } : { display: 'none' }
                }
              />
              {colnames.active.map(colname => (
                <th key={`header_${colname}`}>{colname}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tbody.map((row, idx) => {
              const editText = row._id === rowEdit.id ? 'Tallenna' : 'Muokkaa';
              return (
                <tr key={row._id}>
                  <td
                    key={`td_${idx}_utils`}
                    style={
                      showcontrols ? { display: 'block' } : { display: 'none' }
                    }
                  >
                    <button
                      onClick={() =>
                        dispatch(deleteContribution(row._id, filters))
                      }
                    >
                      Poista
                    </button>
                    <button onClick={() => this.editOrSave(row._id, editText)}>
                      {editText}
                    </button>
                  </td>
                  {colnames.active.map(colname => {
                    const key = `td_${idx}_${colname}`,
                      val =
                        colname == 'Toimija' ? row.author.name : row[colname];
                    if (rowEdit.id === row._id) {
                      return (
                        <td key={key}>
                          <input
                            type="text"
                            defaultValue={val}
                            onChange={ev => {
                              this.handleEdit(
                                row._id,
                                colname,
                                ev.target.value,
                                row.author._id
                              );
                            }}
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
