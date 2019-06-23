import React from 'react';

import { fetchReceptions } from '../../../redux/actions/author';
import FoldableBox from '../../ui/foldablebox/index.jsx';
import RaisableBox from '../../ui/raisableBox/index.jsx';
import styles from './publications.scss';

const publication = props => {
  const { details, dispatch, publications, pretitle } = props;
  const { title, receptions, receptionOf, _id, ...fields } = details;
  return (
    <RaisableBox header={`${pretitle ? `${pretitle} : ` : ''}${title}`}>
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
                <publication
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
};

export default publication;
