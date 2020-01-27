import React from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";

function Select(props) {
  const { onChange, options } = props;
  const styles = {
    control: base => ({
      ...base,
      fontFamily: "'Roboto', sans-serif"
    }),
    option: base => ({
      ...base,
      fontFamily: "'Roboto', sans-serif"
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
