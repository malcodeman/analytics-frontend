import React from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { HeadingSmall, ParagraphMedium } from "../../components/typography";

import queries from "../../api/queries";
import mutations from "../../api/mutations";

import AddSiteForm from "./AddSiteForm";
import { Spinner } from "../../components/spinner";
import Table from "../../components/table/Table";
import { Button } from "../../components/button";

const Wrapper = styled.div`
  padding: 1rem;
`;

function Sites() {
  const { loading, error, data } = useQuery(queries.FIND_MY_SITES_QUERY);
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

  return (
    <Wrapper>
      <HeadingSmall>Sites</HeadingSmall>
      <ParagraphMedium>
        Here is a list of all the sites you have created in your account.
      </ParagraphMedium>
      {loading && <Spinner />}
      {error && <ParagraphMedium>{error.message}</ParagraphMedium>}
      {data && <Table columns={columns} data={data && data.findMySites} />}
      <AddSiteForm />
    </Wrapper>
  );
}

export default Sites;
