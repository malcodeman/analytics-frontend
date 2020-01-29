import React from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";
import { useTheme } from "styled-components";

function Select(props) {
  const theme = useTheme();
  const { onChange, options } = props;
  const styles = {
    control: base => ({
      ...base,
      fontFamily: "'Roboto', sans-serif",
      backgroundColor: theme.colors.inputFill,
      borderColor: theme.colors.inputFill
    }),
    singleValue: base => ({
      ...base,
      color: theme.colors.foreground
    }),
    menu: base => ({
      ...base,
      backgroundColor: theme.colors.backgroundPrimary
    }),
    option: base => ({
      ...base,
      fontFamily: "'Roboto', sans-serif",
      color: theme.colors.foreground
    }),
    noOptionsMessage: base => ({
      ...base,
      fontFamily: "'Roboto', sans-serif"
    })
  };

  return (
    <ReactSelect
      {...props}
      onChange={onChange}
      options={options}
      styles={styles}
    />
  );
}

Select.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array
};

export default Select;
