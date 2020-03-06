import React from "react";
import styled from "styled-components";

import constants from "../../constants";
import Map from "./Map";
import Tile from "./Tile";

const Wrapper = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 256px;
  grid-gap: 1rem;
  @media (min-width: ${constants.BREAKPOINTS.MEDIUM_DEVICES}) {
    grid-template-columns: 1fr 3fr;
  }
`;

const Tiles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
`;

function Dashboard() {
  return (
    <Wrapper>
      <Tiles>
        <Tile label="Unique visits" value="33k" />
        <Tile label="Average time on site" value="02:20" />
        <Tile label="Page views" value="210k" />
        <Tile label="Bounce rate" value="67%" />
      </Tiles>
      <Map />
    </Wrapper>
  );
}

export default Dashboard;
