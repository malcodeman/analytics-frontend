import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { ParagraphMedium } from "../../components/typography";
import LogoIcon from "../../icons/Logo";
import constants from "../../constants";

const StyledLogoIcon = styled(LogoIcon)`
  margin-right: 0.5rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.primary};
`;

function Logo() {
  return (
    <StyledLink to="/">
      <StyledLogoIcon />
      <ParagraphMedium>{constants.NAME}</ParagraphMedium>
    </StyledLink>
  );
}

export default Logo;
