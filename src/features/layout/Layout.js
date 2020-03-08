import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import constants from "../../constants";
import Header from "../header/Header";

const Main = styled.main`
  margin-top: 48px;
  min-height: calc(100vh - 48px);
  background-color: ${props => props.theme.colors.backgroundPrimary};
`;

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  padding: 0 2rem;
  max-width: ${constants.BREAKPOINTS.EXTRA_LARGE_DEVICES};
`;

function Layout(props) {
  const { children } = props;

  return (
    <>
      <Header />
      <Main>
        <Container>{children}</Container>
      </Main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.element
};

export default Layout;
