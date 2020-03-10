import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Pill = styled.div`
  display: flex;
  height: 20px;
  width: 32px;
  padding: 2px;
  border-radius: 16px;
  cursor: pointer;
  justify-content: ${props => (props.state ? "flex-end" : "flex-start")};
  background-color: ${props =>
    props.state ? props.theme.colors.accent : "hsla(0, 0%, 0%, 0.5)"};
`;

const Circle = styled.div`
  background-color: hsl(0, 0%, 100%);
  border-radius: 50%;
  width: 16px;
`;

function Switch(props) {
  const { state, onClick } = props;

  return (
    <Pill state={state} onClick={onClick}>
      <Circle />
    </Pill>
  );
}

Switch.propTypes = {
  state: PropTypes.bool,
  onClick: PropTypes.func
};

Switch.defaultProps = {
  state: false,
  onClick: () => {}
};

export default Switch;
