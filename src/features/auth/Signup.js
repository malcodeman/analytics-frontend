import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { LOGIN_SUCCESS } from "./constants";
import bg from "./bg.jpg";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  min-height: 100vh;
  @media (min-width: 576px) {
    grid-template-columns: 146px auto;
  }
`;

const Image = styled.div`
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  height: 100%;
  display: none;
  @media (min-width: 576px) {
    display: block;
  }
`;

const FormWrapper = styled.div`
  margin: 1rem;
  max-width: 576px;
`;

function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showLoginForm, setShowLoginForm] = React.useState(false);
  const [email, setEmail] = React.useState("");

  function onSignupSuccess(data) {
    setEmail(data.email);
    setShowLoginForm(true);
  }

  function onLoginSuccess(data) {
    localStorage.setItem("token", data.token);
    dispatch({
      type: LOGIN_SUCCESS
    });
    history.push("/");
  }

  return (
    <Container>
      <Image />
      <FormWrapper>
        {showLoginForm ? (
          <LoginForm email={email} onSuccess={onLoginSuccess} />
        ) : (
          <SignupForm onSuccess={onSignupSuccess} />
        )}
      </FormWrapper>
    </Container>
  );
}

export default Signup;
