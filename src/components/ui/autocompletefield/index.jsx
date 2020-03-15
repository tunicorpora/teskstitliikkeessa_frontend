import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import React, { Component } from 'react';
import Tooltip from '@atlaskit/tooltip';

import { getTooltip } from '../../../utils/misc';
import styles from './autocompletefield.scss';

const selectStyle = {
  container: provided => ({
    ...provided,
    minWidth: '10em'
  })
};

const Option = props => (
  <Tooltip content={props.data.tooltip}>
    <components.Option {...props} />
  </Tooltip>
);

export default class AutoCompleteField extends Component {
  getOptions(inputValue) {
    const { categoryName, tooltipName, path, labelName } = this.props;
    // if no input, load nothing
    const maxEntries = 400;
    const url = `${process.env.API_URL}/${path}?search=${inputValue}`;
    return fetch(url, { mode: 'cors' })
      .then(response => response.json())
      .then(options =>
        options
          .slice(0, maxEntries)
          .map(option => {
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
          .filter(option => option.label)
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
      defaultOptions = false,
      value,
      noOptionsMessage,
      creatable,
      label
    } = this.props;

    let select;
    const outProps = {
      id,
      isMulti,
      onChange,
      loadOptions: inputValue => this.getOptions(inputValue),
      defaultOptions,
      styles: selectStyle,
      noOptionsMessage: () => noOptionsMessage || 'Kirjoita jotain hakukenttään...'
    };
    if (value !== undefined && label !== undefined) {
      outProps.value = { label, value };
    }

    return creatable ? (
      <AsyncCreatableSelect {...outProps} components={{ Option }} />
    ) : (
      <AsyncSelect {...outProps} components={{ Option }} />
    );
  }
}
