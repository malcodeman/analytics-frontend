import React from "react";
import styled from "styled-components";

import PlusIcon from "../../icons/Plus";
import { ParagraphSmall } from "../../components/typography";

const StyledButton = styled.button`
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 1rem;
  cursor: pointer;
  margin-bottom: 0.5rem;
  transition: 0.085s all ease-in;
  color: ${props => props.theme.colors.contentPrimary};
  border-radius: ${props => props.theme.borders.radius200};
  background-color: ${props => props.theme.colors.backgroundSecondary};
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const StyledParagraphSmall = styled(ParagraphSmall)`
  margin-left: 0.5rem;
`;

function AddSiteButtonList(props) {
  return (
    <StyledButton {...props}>
      <PlusIcon size={20} />
      <StyledParagraphSmall>Add new site</StyledParagraphSmall>
    </StyledButton>
  );
}

export default AddSiteButtonList;
