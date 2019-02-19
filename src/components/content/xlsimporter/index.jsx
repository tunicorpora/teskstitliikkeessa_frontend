import React from 'react';
import { testUpload, uploadData } from '../../../redux/actions/upload';

export default ({ dispatch }) => (
  <div>
    <form
      id="uploadForm"
      onSubmit={event => {
        event.preventDefault();
        dispatch(uploadData(event.target));
      }}
    >
      <input id="filefield" type="file" name="upload" multiple="multiple" />
      <input type="submit" value="Lataa tiedosto" />
    </form>
  </div>
);
