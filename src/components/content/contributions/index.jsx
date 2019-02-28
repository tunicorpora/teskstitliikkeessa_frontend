import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { range } from 'lodash';
import download from 'downloadjs';
import {
  fetchContributions,
  deleteContribution,
  startContributionEdit,
  saveContributionEdit,
  makeContributionEdit,
  fetchColNames,
  changeColState,
} from '../../../redux/actions/contribution';
import ToggledBox from '../../ui/ToggledBox';
import { addFilter } from '../../../redux/actions/filter';
import { isAuthenticated } from '../../auth/utils';
import Filter from '../filter/index.jsx';
import styles from './styles.scss';
import generalStyles from '../../main/general_styles.scss';

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

  exportToExcel() {
    const { filters } = this.props;
    let url = `http://localhost:3000/entry/excel`;
    if (filters.length) {
      url += '?filters=' + encodeURIComponent(JSON.stringify(filters));
    }
    fetch(url)
      .then(response => response.blob())
      .then(file => download(file, 'tekstit-liikkeessa_tietokannasta.xlsx'));
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
        <p>
          Kontribuutioilla tarkoitetaan tässsä kaikkia "kirjallisia tekoja":
          kirjoja, käännöksiä, artikkeleita, mainintoja...
        </p>

        <section className={styles.optionContainer}>
          <ToggledBox header="Hakuehdot">
            {filters.map((filter, idx) => (
              <Filter
                allfilters={filters}
                colnames={colnames.all}
                dispatch={dispatch}
                key={idx}
                idx={idx}
              />
            ))}

            <section className={generalStyles.verticalMargin}>
              <button onClick={() => dispatch(addFilter())}>
                Lisää hakuehto
              </button>
            </section>
          </ToggledBox>
          <ToggledBox header="Näytettävät kentät">
            <ul className={styles.fieldList}>
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
          </ToggledBox>
        </section>

        <div>
          <p>
            Näytetään tuloksia: {list.meta.total} ({list.meta.showing} tällä
            sivulla)
          </p>
          <p>
            <button onClick={this.exportToExcel.bind(this)}>
              Vie tulokset exceliin
            </button>
          </p>
          <ul className={styles.pageList}>
            <li>Sivut: </li>
            {range(1, list.meta.pages + 1).map(no => (
              <li>
                <a
                  href="javascript:void(0)"
                  onClick={() => dispatch(fetchContributions(filters, no))}
                >
                  {list.meta.page == no ? <strong>{no}</strong> : no}
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
