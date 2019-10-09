import React, { Component } from 'react';

import { fetchReceptions } from '../../../redux/actions/author';
import FoldableBox from '../../ui/foldablebox/index.jsx';
import RaisableBox from '../../ui/raisableBox/index.jsx';
import styles from './publications.scss';

export default class Publication extends Component {
  render() {
    const { details, dispatch, publications, pretitle } = this.props;
    const { title, receptions, receptionOf, _id, ...fields } = details;
    return (
      <RaisableBox header={`${pretitle ? `${pretitle} : ` : ''}${title}`}>
        <div className={styles.idline}>{_id}</div>
        <ul className={styles.details}>
          {Object.keys(fields)
            .filter(field => fields[field])
            .map(field => (
              <li>
                <span>{field}:</span>
                <span>{fields[field]}</span>
              </li>
            ))}
        </ul>
        <FoldableBox header="Reseptiot" onOpen={() => dispatch(fetchReceptions(_id))}>
          {Object.keys(receptions).map(key =>
            receptions[key].map(
              rId =>
                publications[rId] && (
                  <Publication
                    pretitle={key.replace(/s$/, '')}
                    details={publications[rId]}
                    publications={publications}
                    dispatch={dispatch}
                  />
                )
            )
          )}
        </FoldableBox>
      </RaisableBox>
    );
  }
}
