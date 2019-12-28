import React from "react";
import styled from "styled-components";

import AddSiteForm from "./AddSiteForm";

const Container = styled.div`
  margin: 1rem;
`;

function Sites() {
  return (
    <Container>
      <AddSiteForm />
    </Container>
  );
}

export default Sites;
