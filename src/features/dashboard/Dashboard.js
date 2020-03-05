import React from "react";
import styled from "styled-components";

import Map from "./Map";

const Wrapper = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-auto-rows: 256px;
  grid-gap: 1rem;
`;

function Dashboard() {
  return (
    <Wrapper>
      <div></div>
      <Map />
    </Wrapper>
  );
}

export default Dashboard;
