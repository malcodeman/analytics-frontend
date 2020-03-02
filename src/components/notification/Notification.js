import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { KIND } from "./constants";

function getBackgroundColor(props) {
  const { kind } = props;

  switch (kind) {
    default:
    case KIND.info:
      return props.theme.colors.notificationInfoBackground;
    case KIND.positive:
      return props.theme.colors.notificationPositiveBackground;
    case KIND.warning:
      return props.theme.colors.notificationWarningBackground;
    case KIND.negative:
      return props.theme.colors.notificationNegativeBackground;
  }
}

function getColor(props) {
  const { kind } = props;

  switch (kind) {
    default:
    case KIND.info:
      return props.theme.colors.notificationInfoText;
    case KIND.positive:
      return props.theme.colors.notificationPositiveText;
    case KIND.warning:
      return props.theme.colors.notificationWarningText;
    case KIND.negative:
      return props.theme.colors.notificationNegativeText;
  }
}

const StyledNofitication = styled.div`
  padding: 1rem;
  background-color: ${getBackgroundColor};
  color: ${getColor};
  ${props => props.theme.typography.font250}
`;

function Notification(props) {
  const { kind, children } = props;

  return (
    <StyledNofitication {...props} kind={kind}>
      {children}
    </StyledNofitication>
  );
}

Notification.propTypes = {
  kind: PropTypes.oneOf([
    KIND.info,
    KIND.positive,
    KIND.warning,
    KIND.negative
  ]),
  children: PropTypes.element
};

Notification.defaultProps = {
  kind: KIND.info
};

export default Notification;
