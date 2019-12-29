import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { Table, HeadCell, BodyCell, Spinner } from "malcomponents";

import queries from "../../api/queries";
import AddSiteForm from "./AddSiteForm";

const Container = styled.div`
  margin: 1rem;
`;

const TableWrapper = styled.div``;

function Sites() {
  const { loading, error, data } = useQuery(queries.FIND_MY_SITES_QUERY);

  return (
    <Container>
      <TableWrapper>
        <Table gridTemplateColumns="2fr 1fr">
          <HeadCell>Site name</HeadCell>
          <HeadCell>Site ID</HeadCell>
          {data &&
            data.findMySites &&
            data.findMySites.sites &&
            data.findMySites.sites.map(site => {
              return (
                <React.Fragment key={site.id}>
                  <BodyCell>{site.name}</BodyCell>
                  <BodyCell>{site.siteId}</BodyCell>
                </React.Fragment>
              );
            })}
        </Table>
      </TableWrapper>
      <AddSiteForm />
    </Container>
  );
}

export default Sites;
