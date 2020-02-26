import React from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { useApolloClient } from "@apollo/react-hooks";

import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import {
  ParagraphMedium,
  ParagraphSmall,
  HeadingLarge
} from "../../components/typography";
import LogoIcon from "../../icons/Logo";
import constants from "../../constants";

const Container = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.backgroundPrimary};
`;

const Header = styled.header`
  padding: 2rem 2rem 1rem 2rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.primary};
`;

const StyledLogoIcon = styled(LogoIcon)`
  margin-right: 0.5rem;
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
  color: ${props => props.theme.colors.accent};
`;

function Signup() {
  const client = useApolloClient();
  const history = useHistory();
  const [showLoginForm, setShowLoginForm] = React.useState(false);
  const [email, setEmail] = React.useState("");

  function onSignupSuccess(data) {
    setEmail(data.email);
    setShowLoginForm(true);
  }

  function onLoginSuccess(data) {
    localStorage.setItem("token", data.token);
    client.writeData({ data: { isLoggedIn: true } });
    history.push("/");
  }

  return (
    <Container>
      <Header>
        <LogoWrapper>
          <StyledLogoIcon />
          <ParagraphMedium>{constants.NAME}</ParagraphMedium>
        </LogoWrapper>
      </Header>
      <Main>
        <HeadingWrapper>
          <StyledHeadingLarge>A little bit about you</StyledHeadingLarge>
          <ParagraphMedium>Let’s get your account set up!</ParagraphMedium>
          <ParagraphSmall>
            Already have an account?{" "}
            <StyledLink to="/login">Sign in here</StyledLink>
          </ParagraphSmall>
        </HeadingWrapper>
        {showLoginForm ? (
          <LoginForm email={email} onSuccess={onLoginSuccess} />
        ) : (
          <SignupForm onSuccess={onSignupSuccess} />
        )}
      </Main>
    </Container>
  );
}

export default Signup;
