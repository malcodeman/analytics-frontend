import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import constants from "../../constants";
import Logo from "../common/Logo";

const StyledHeader = styled.header`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  box-shadow: rgba(0, 0, 0, 0.03) 0px 2px 0px 0px;
  background-color: ${props => props.theme.colors.headerNavigationFill};
`;

const Container = styled.div`
  padding: 0 2rem;
  margin: 0 auto;
  max-width: ${constants.BREAKPOINTS.EXTRA_LARGE_DEVICES};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  height: 48px;
  width: 100%;
`;

const LogoWrapper = styled.div`
  margin-right: 1rem;
  padding-bottom: 0.14rem;
  border-bottom: 2px solid transparent;
`;

const StyledNavLink = styled(NavLink)`
  margin: 0 1rem;
  color: ${props => `${props.theme.colors.contentPrimary}7F`};
  padding-bottom: 0.14rem;
  border-bottom: 2px solid transparent;
  &.active {
    color: ${props => props.theme.colors.contentPrimary};
    padding-bottom: 0.14rem;
    border-bottom: 2px solid ${props => props.theme.colors.contentPrimary};
  }
  ${props => props.theme.typography.ParagraphSmall};
`;

function Header() {
  return (
    <StyledHeader>
      <Container>
        <Nav>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
          <StyledNavLink exact to="/">
            Dashboard
          </StyledNavLink>
          <StyledNavLink to="/sites">Sites</StyledNavLink>
          <StyledNavLink to="/account">Account</StyledNavLink>
          <StyledNavLink to="/billing">Billing</StyledNavLink>
        </Nav>
      </Container>
    </StyledHeader>
  );
}

export default Header;
