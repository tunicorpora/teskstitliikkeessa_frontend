import React, { Component } from 'react';

import { fetchReceptions } from '../../../redux/actions/author';
import FoldableBox from '../../ui/foldablebox/index.jsx';
import RaisableBox from '../../ui/raisableBox/index.jsx';
import styles from './publications.scss';

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
        {Object.entries(receptions).map(([receptionType, reception]) =>
          reception.map(
            rId =>
              publications[rId] && (
                <Publication
                  key={reception._id}
                  pretitle={receptionType.replace(/s$/, '')}
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
};

export default Publication;

