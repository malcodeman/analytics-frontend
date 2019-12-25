import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import OnboardingForm from "./OnboardingForm";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const FormWrapper = styled.div`
  margin: 1rem;
  max-width: 576px;
  width: 100%;
`;

function Onboarding() {
  const history = useHistory();

  return (
    <Container>
      <FormWrapper>
        <OnboardingForm onSuccess={() => history.push("/")} />
      </FormWrapper>
    </Container>
  );
}

export default Onboarding;
