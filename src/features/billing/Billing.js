import React from "react";
import styled from "styled-components";

import BillingForm from "./BillingForm";

const Wrapper = styled.div`
  margin: 1rem;
`;

function Billing() {
  return (
    <Wrapper>
      <BillingForm />
    </Wrapper>
  );
}

export default Billing;
