import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";

import queries from "../../api/queries";

import AddSiteButton from "./AddSiteButton";
import { Spinner } from "../../components/spinner";
import AddSiteModal from "./AddSiteModal";
import Sidebar from "./Sidebar";
import { VIEWS } from "./constants";
import constants from "../../constants";
import SiteGrid from "./SiteGrid";
import SiteList from "./SiteList";

const Wrapper = styled.div`
  padding: 1rem 0;
  display: grid;
  grid-gap: 1rem;
  @media (min-width: ${constants.BREAKPOINTS.MEDIUM_DEVICES}) {
    grid-template-columns: 1fr 3fr;
  }
`;

const SidebarWrapper = styled.div``;

const Grid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: ${props =>
    props.view === VIEWS.grid
      ? "repeat(auto-fill, minmax(256px, 1fr))"
      : "repeat(auto-fill, minmax(128px, 1fr))"};
`;

function Sites() {
  const findMySites = useQuery(queries.FIND_MY_SITES_QUERY);
  const [modal, setModal] = React.useState(false);
  const [view, setView] = React.useState(VIEWS.grid);

  return (
    <Wrapper>
      <SidebarWrapper>
        <Sidebar view={view} setView={setView} />
      </SidebarWrapper>
      <Grid view={view}>
        {findMySites.loading && <Spinner />}
        {findMySites.data &&
          findMySites.data.findMySites &&
          findMySites.data.findMySites.map(site => {
            if (view === VIEWS.grid) {
              return (
                <SiteGrid
                  key={site.siteId}
                  siteId={site.siteId}
                  name={site.name}
                  domain={site.domain}
                  uniqueVisits={site.uniqueVisits}
                  pageViews={site.pageViews}
                  bounceRate={site.bounceRate}
                />
              );
            }
            return (
              <SiteList
                key={site.siteId}
                siteId={site.siteId}
                name={site.name}
              />
            );
          })}
        <AddSiteButton onClick={() => setModal(true)} />
      </Grid>
      <AddSiteModal
        isOpen={modal}
        onClose={() => setModal(false)}
        refetch={findMySites.refetch}
      />
    </Wrapper>
  );
}

export default Sites;
