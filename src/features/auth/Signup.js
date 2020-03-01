import React from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";

import SignupForm from "./SignupForm";
import {
  ParagraphMedium,
  ParagraphSmall,
  HeadingLarge
} from "../../components/typography";
import constants from "../../constants";
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

function Signup() {
  const history = useHistory();

  function onSignupSuccess(data) {
    history.push(`/signin?email=${data.email}`);
  }

  return (
    <Container>
      <Header>
        <Logo />
      </Header>
      <Main>
        <HeadingWrapper>
          <StyledHeadingLarge>A little bit about you</StyledHeadingLarge>
          <ParagraphMedium>Let’s get your account set up!</ParagraphMedium>
          <ParagraphSmall>
            Already have an account?{" "}
            <StyledLink to="/signin">Sign in here</StyledLink>
          </ParagraphSmall>
        </HeadingWrapper>
        <SignupForm onSuccess={onSignupSuccess} />
      </Main>
    </Container>
  );
}

export default Signup;
