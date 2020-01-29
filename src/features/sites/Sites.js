import React from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { HeadingSmall, ParagraphMedium } from "../../components/typography";

import queries from "../../api/queries";
import mutations from "../../api/mutations";

import AddSiteForm from "./AddSiteForm";
import Table from "../../components/table/Table";
import { Button } from "../../components/button";

const Wrapper = styled.div`
  padding: 1rem;
`;

const FormWrapper = styled.div`
  padding: 1rem 0;
`;

function Sites() {
  const findMySites = useQuery(queries.FIND_MY_SITES_QUERY);
  const [destroySite, destroySiteResult] = useMutation(mutations.DESTROY_SITE);

  function renderButton(data) {
    const siteId = data.row.values.siteId;

    return (
      <Button onClick={() => destroySite({ variables: { siteId } })}>
        <span>Delete</span>
      </Button>
    );
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Site ID",
        accessor: "siteId"
      },
      {
        Header: "Delete",
        Cell: renderButton
      }
    ],
    []
  );

  function renderTable() {
    return (
      <>
        <ParagraphMedium>
          Here is a list of all the sites you have created in your account.
        </ParagraphMedium>
        {findMySites.error && (
          <ParagraphMedium>{findMySites.error.message}</ParagraphMedium>
        )}
        {findMySites.data && (
          <Table
            columns={columns}
            data={findMySites.data && findMySites.data.findMySites}
          />
        )}
      </>
    );
  }

  return (
    <Wrapper>
      <HeadingSmall>Sites</HeadingSmall>
      <FormWrapper>
        <AddSiteForm />
      </FormWrapper>
      {findMySites.data &&
        findMySites.data.findMySites &&
        findMySites.data.findMySites.length > 0 &&
        renderTable()}
    </Wrapper>
  );
}

export default Sites;
