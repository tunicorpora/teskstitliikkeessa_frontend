import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import React, { Component } from 'react';
import Tooltip from '@atlaskit/tooltip';

import { getTooltip } from '../../../utils/misc';
import styles from './autocompletefield.scss';

const selectStyle = {
  container: provided => ({
    ...provided,
    'min-width': '10em'
  })
};

const Option = props => (
  <Tooltip content={props.data.tooltip}>
    <components.Option {...props} />
  </Tooltip>
);

export default class AutoCompleteField extends Component {
  getOptions(inputValue) {
    const { categoryName, tooltipName, path, labelName, maxEntries = 10 } = this.props;
    const url = `${ENV.apiUrl}/${path}?search=${inputValue}`;
    return fetch(url, { mode: 'cors' })
      .then(response => response.json())
      .then(options =>
        options.slice(0, maxEntries).map(option => {
          if (categoryName === 'flat') {
            return {
              label: option,
              value: option,
              tooltip: undefined
            };
          }

          let tooltip;
          if (Array.isArray(tooltipName)) {
            tooltip = getTooltip(tooltipName, option);
          } else {
            tooltip = option[tooltipName];
          }
          return {
            label: option[labelName || categoryName],
            value: option[categoryName],
            tooltip
          };
        })
      );
  }

  render() {
    const {
      handleChange,
      children,
      id,
      isMulti = false,
      onChange,
      fieldname,
      defaultOptions = true,
      value
    } = this.props;

    let select;
    const outProps = {
      id,
      isMulti,
      onChange,
      loadOptions: inputValue => this.getOptions(inputValue),
      defaultOptions,
      styles: selectStyle,
      creatable: false
    };
    if (value !== undefined) {
      outProps.value = value;
    }
    return <AsyncSelect {...outProps} components={{ Option }} />;
  }
}
