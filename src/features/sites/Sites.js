import React from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Table, HeadCell, BodyCell, Button } from "malcomponents";

import queries from "../../api/queries";
import mutations from "../../api/mutations";

import AddSiteForm from "./AddSiteForm";

const Container = styled.div`
  margin: 1rem;
`;

const TableWrapper = styled.div``;

function Sites() {
  const { loading, error, data } = useQuery(queries.FIND_MY_SITES_QUERY);
  const [destroySite, destroySiteResult] = useMutation(mutations.DESTROY_SITE);

  return (
    <Container>
      <TableWrapper>
        <Table gridTemplateColumns="2fr 1fr auto">
          <HeadCell>Site name</HeadCell>
          <HeadCell>Site ID</HeadCell>
          <HeadCell>Delete</HeadCell>
          {data &&
            data.findMySites &&
            data.findMySites.sites &&
            data.findMySites.sites.map(site => {
              return (
                <React.Fragment key={site.id}>
                  <BodyCell>{site.name}</BodyCell>
                  <BodyCell>{site.siteId}</BodyCell>
                  <BodyCell>
                    <Button
                      size="compact"
                      onClick={() =>
                        destroySite({ variables: { siteId: site.id } })
                      }
                    >
                      Delete
                    </Button>
                  </BodyCell>
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
