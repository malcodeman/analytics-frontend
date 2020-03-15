import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { subMonths } from "date-fns";

import constants from "../../constants";
import Map from "./Map";
import Tile from "./Tile";
import { ParagraphMedium, ParagraphSmall } from "../../components/typography";
import { useQuery } from "@apollo/react-hooks";
import queries from "../../api/queries";
import util from "../../util";
import image from "../../illustrations/MessageSent.png";
import ImageTile from "./ImageTile";

const Wrapper = styled.div`
  padding: 1rem;
`;

const Header = styled.div`
  margin-bottom: 0.5rem;
`;

const Grid = styled.div`
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
  const params = useParams();
  const siteId = params.siteId;
  const [startDate, setStartDate] = React.useState(
    subMonths(new Date(), 1).toISOString()
  );
  const [endDate, setEndDate] = React.useState(new Date().toISOString());
  const findSite = useQuery(queries.FIND_SITE_QUERY, {
    skip: !siteId,
    variables: { siteId }
  });
  const findTotals = useQuery(queries.FIND_TOTALS_QUERY, {
    skip: !siteId,
    variables: {
      from: startDate,
      to: endDate,
      siteId
    }
  });
  const site = util.getData(findSite, {});
  const totals = util.getData(findTotals, {
    pageViews: 0,
    uniqueVisits: 0,
    avgDuration: 0,
    bounceRate: 0
  });

  return (
    <Wrapper>
      <Header>
        <ParagraphMedium>{site.name}</ParagraphMedium>
        <ParagraphSmall>{site.domain}</ParagraphSmall>
      </Header>
      <Grid>
        <Tiles>
          <Tile
            label="Unique visits"
            value={totals.uniqueVisits}
            isLoading={findTotals.loading}
          />
          <Tile
            label="Average time on site"
            value={totals.avgDuration}
            isLoading={findTotals.loading}
          />
          <Tile
            label="Page views"
            value={totals.pageViews}
            isLoading={findTotals.loading}
          />
          <Tile
            label="Bounce rate"
            value={totals.bounceRate}
            isLoading={findTotals.loading}
          />
        </Tiles>
        <Map />
        <ImageTile label="Inbox" value="23" image={image} />
      </Grid>
    </Wrapper>
  );
}

export default Dashboard;
