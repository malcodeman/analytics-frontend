import React from "react";
import styled from "styled-components";

import Button from "../button/Button";

const StyledModalButton = styled(Button)`
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

function ModalButton(props) {
  const { children } = props;

  return <StyledModalButton {...props}>{children}</StyledModalButton>;
}

export default ModalButton;
