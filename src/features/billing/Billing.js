import React from "react";
import styled from "styled-components";

import BillingForm from "./BillingForm";
import constants from "../../constants";

const Wrapper = styled.div`
  padding: 1rem 0;
  width: 100%;
  max-width: ${constants.BREAKPOINTS.SMALL_DEVICES};
`;

function Billing() {
  return (
    <Wrapper>
      <BillingForm />
    </Wrapper>
  );
}

export default Billing;
