import React, { Component } from 'react';

import { fetchReceptions } from '../../../redux/actions/author';
import FoldableBox from '../../ui/foldablebox/index.jsx';
import RaisableBox from '../../ui/raisableBox/index.jsx';
import styles from './publications.scss';

const translateReceptionKey = key => {
  switch (key) {
    case 'translations':
      return 'Käännökset';
    case 'reviews':
      return 'Arvostelut';
    case 'adaptations':
      return 'Adaptaatiot';
    case 'articles':
      return 'Muut artikkelit / uutiset / blogit yms.';
    case 'other':
      return 'Muut reseptiot';
    default:
      return key;
  }
};

const Publication = props => {
  const { details, dispatch, publications, pretitle } = props;
  const { title, receptions, receptionOf, _id, ...fields } = details;
  return (
    <RaisableBox header={`${pretitle ? `${pretitle} : ` : ''}${title}`}>
      <div className={styles.idline}>{_id}</div>
      <ul className={styles.details}>
        {Object.entries(fields)
          .filter(([field, val]) => val && !['target', 'reception_type', 'tempId'].includes(field))
          .map(([field, val]) => (
            <li>
              <span>{field}:</span>
              <span>{val}</span>
            </li>
          ))}
      </ul>
      <FoldableBox header="Reseptiot" onOpen={() => dispatch(fetchReceptions(_id))}>
        {Object.keys(receptions).map(key => {
          if (Array.isArray(receptions[key]) && receptions[key].length > 0) {
            return (
              <div>
                <h5 className={styles.receptionHeader}>{translateReceptionKey(key)}</h5>
                {receptions[key].map(
                  rId =>
                    publications[rId] && (
                      <Publication
                        key={rId}
                        details={publications[rId]}
                        publications={publications}
                        dispatch={dispatch}
                      />
                    )
                )}
              </div>
            );
          }
        })}
      </FoldableBox>
    </RaisableBox>
  );
};

export default Publication;

