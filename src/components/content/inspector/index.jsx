import React from 'react';

import { fetchAuthorByName } from '../../../redux/actions/author';
import AutocompleteField from '../../ui/autocompletefield/index.jsx';
import Publication from '../publication/index.jsx';

export default (props) => {
  const { dispatch, author = {}, publications: allPublications } = props;
  const { publications = [] } = author;

  return (
    <div>
      <section>
        <AutocompleteField
          path="authornames"
          categoryName="flat"
          onChange={selected => dispatch(fetchAuthorByName(selected.value))}
        />
      </section>
      <section>
        <ul>
          {publications.map(pub => (
            <li>
              <Publication
                details={pub}
                publications={allPublications}
                dispatch={dispatch}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
