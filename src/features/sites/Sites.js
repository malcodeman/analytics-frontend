import React from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/react-hooks";

import queries from "../../api/queries";
import mutations from "../../api/mutations";

import AddSiteButtonGrid from "./AddSiteButtonGrid";
import AddSiteButtonList from "./AddSiteButtonList";
import { Spinner } from "../../components/spinner";
import AddSiteModal from "./AddSiteModal";
import Sidebar from "./Sidebar";
import { VIEWS } from "./constants";
import constants from "../../constants";
import SiteGrid from "./SiteGrid";
import SiteList from "./SiteList";
import { ParagraphSmall, ParagraphMedium } from "../../components/typography";
import util from "../../util";

const Wrapper = styled.div`
  padding: 1rem 0;
  display: grid;
  grid-gap: 1rem;
  @media (min-width: ${constants.BREAKPOINTS.MEDIUM_DEVICES}) {
    grid-template-columns: 1fr 3fr;
  }
`;

const SidebarWrapper = styled.div``;

const GridHeader = styled.div`
  margin-bottom: 0.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: ${props =>
    props.view === VIEWS.grid
      ? "repeat(auto-fill, minmax(256px, 1fr))"
      : "repeat(auto-fill, minmax(128px, 1fr))"};
`;

function Sites() {
  const [modal, setModal] = React.useState(false);
  const [view, setView] = React.useState(VIEWS.grid);
  const [search, setSearch] = React.useState("");
  const findMySites = useQuery(queries.FIND_MY_SITES_QUERY);
  const sites = util.getData(findMySites, []);
  const filteredSites = sites.filter(site => {
    return (
      site.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
      site.domain.toLowerCase().includes(search.toLocaleLowerCase())
    );
  });
  const [addSite, addSiteResult] = useMutation(mutations.ADD_SITE);
  const [destroySite, destroySiteResult] = useMutation(mutations.DESTROY_SITE);
  const duplicated = util.getData(addSiteResult, false);
  const destroyed = util.getData(destroySiteResult, false);

  React.useEffect(() => {
    if (duplicated || destroyed) {
      findMySites.refetch();
    }
  }, [duplicated, destroyed]);

  return (
    <Wrapper>
      <SidebarWrapper>
        <Sidebar
          search={search}
          setSearch={setSearch}
          view={view}
          setView={setView}
        />
      </SidebarWrapper>
      <div>
        <GridHeader>
          {search && filteredSites.length > 0 && (
            <ParagraphSmall>{`Sites matching "${search}"`}</ParagraphSmall>
          )}
          {search && !filteredSites.length && (
            <ParagraphSmall>No sites found</ParagraphSmall>
          )}
          {!search && <ParagraphMedium>Workspace</ParagraphMedium>}
        </GridHeader>
        <Grid view={view}>
          {findMySites.loading && <Spinner />}
          {filteredSites.map(site => {
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
                  addSite={addSite}
                  destroySite={destroySite}
                />
              );
            }
            return (
              <SiteList
                key={site.siteId}
                siteId={site.siteId}
                name={site.name}
                domain={site.domain}
                addSite={addSite}
                destroySite={destroySite}
              />
            );
          })}
          {view === VIEWS.grid ? (
            <AddSiteButtonGrid onClick={() => setModal(true)} />
          ) : (
            <AddSiteButtonList onClick={() => setModal(true)} />
          )}
        </Grid>
      </div>
      <AddSiteModal
        isOpen={modal}
        onClose={() => setModal(false)}
        refetch={findMySites.refetch}
      />
    </Wrapper>
  );
}

export default Sites;
