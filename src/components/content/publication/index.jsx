import React, { Component } from 'react';

import { fetchReceptions } from '../../../redux/actions/author';
import FoldableBox from '../../ui/foldablebox/index.jsx';

export default class Publication extends Component {
  render() {
    const { details, dispatch, publications } = this.props;
    const {
      title, receptions, receptionOf, _id, ...fields
    } = details;
    console.log('rENDERING publication');
    console.log('deteils:');
    console.log(details);
    return (
      <FoldableBox launchertype="heading" header={title}>
        <FoldableBox header="Reseptiot">
          {receptions.translations.map(
            translationId => publications[translationId] && (
            <Publication
              details={publications[translationId]}
              publications={publications}
              dispatch={dispatch}
            />
            ),
          )}
          <button onClick={() => dispatch(fetchReceptions(_id))} type="button">
            Hae
          </button>
        </FoldableBox>
        <FoldableBox header="Tarkemmat tiedot">
          <ul>
            {Object.keys(fields)
              .filter(field => fields[field])
              .map(field => (
                <li>
                  <strong>{field}</strong>
                  <span>{fields[field]}</span>
                </li>
              ))}
          </ul>
        </FoldableBox>
      </FoldableBox>
    );
  }
}
