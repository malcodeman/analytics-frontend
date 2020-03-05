import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";

import queries from "../../api/queries";

import Site from "./Site";
import AddSiteButton from "./AddSiteButton";
import { Spinner } from "../../components/spinner";
import AddSiteModal from "./AddSiteModal";
import Sidebar from "./Sidebar";
import { VIEWS } from "./constants";
import constants from "../../constants";

const Wrapper = styled.div`
  padding: 1rem 0;
  @media (min-width: ${constants.BREAKPOINTS.MEDIUM_DEVICES}) {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 1rem;
  }
`;

const SidebarWrapper = styled.div`
  display: none;
  @media (min-width: ${constants.BREAKPOINTS.MEDIUM_DEVICES}) {
    display: block;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
  grid-gap: 1rem;
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
      <Grid>
        {findMySites.loading && <Spinner />}
        {findMySites.data &&
          findMySites.data.findMySites &&
          findMySites.data.findMySites.map(site => {
            return (
              <Site
                key={site.siteId}
                siteId={site.siteId}
                name={site.name}
                domain={site.domain}
                uniqueVisits={site.uniqueVisits}
                pageViews={site.pageViews}
                bounceRate={site.bounceRate}
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
