import React from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { useApolloClient } from "@apollo/react-hooks";

import { ParagraphSmall, HeadingLarge } from "../../components/typography";
import EmailForm from "./EmailForm";
import constants from "../../constants";
import util from "../../util";
import SigninForm from "./SigninForm";
import Logo from "../common/Logo";

const Container = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.backgroundPrimary};
`;

const Header = styled.header`
  padding: 2rem 2rem 1rem 2rem;
`;

const Main = styled.main`
  padding: 1rem;
  @media (min-width: ${constants.BREAKPOINTS.SMALL_DEVICES}) {
    margin: 0 auto;
    max-width: 24rem;
    width: 100%;
  }
`;

const HeadingWrapper = styled.div`
  text-align: center;
`;

const StyledHeadingLarge = styled(HeadingLarge)`
  font-family: Bebas Neue;
`;

const StyledLink = styled(Link)`
  padding-bottom: 0.14rem;
  border-bottom: 2px solid ${props => `${props.theme.colors.accent}7F`};
  color: ${props => props.theme.colors.accent};
`;

function Signin() {
  const client = useApolloClient();
  const history = useHistory();
  const emailParam = util.getParam("email");

  function onSigninSuccess(data) {
    localStorage.setItem("token", data.token);
    client.writeData({ data: { isLoggedIn: true } });
    history.push("/");
  }

  function onEmailSuccess(values) {
    history.push(`/signin?email=${values.email}`);
  }

  return (
    <Container>
      <Header>
        <Logo />
      </Header>
      <Main>
        <HeadingWrapper>
          <StyledHeadingLarge>Sign in</StyledHeadingLarge>
          {!emailParam && (
            <ParagraphSmall>
              Don’t have an account?{" "}
              <StyledLink to="/signup">Sign up here</StyledLink>
            </ParagraphSmall>
          )}
        </HeadingWrapper>
        {emailParam ? (
          <SigninForm email={emailParam} onSuccess={onSigninSuccess} />
        ) : (
          <EmailForm onSuccess={onEmailSuccess} />
        )}
      </Main>
    </Container>
  );
}

export default Signin;
