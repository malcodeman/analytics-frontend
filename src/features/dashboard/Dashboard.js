import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";

import { HeadingSmall, ParagraphMedium } from "../../components/typography";

import queries from "../../api/queries";
import util from "../../util";
import Spinner from "../../components/spinner/Spinner";
import Select from "../../components/select/Select";

const Wrapper = styled.div`
  padding: 1rem;
`;

const Data = styled.div`
  padding: 1rem 0;
`;

function Dashboard() {
  const findMySites = useQuery(queries.FIND_MY_SITES_QUERY);
  const [selectedDashboard, setSelectedDashboard] = React.useState({});
  const findDashboard = useQuery(queries.FIND_DASHBOARD_QUERY, {
    skip: util.isEmpty(selectedDashboard),
    variables: { siteId: selectedDashboard.siteId }
  });
  const data =
    findDashboard && findDashboard.data && findDashboard.data.findDashboard;

  React.useEffect(() => {
    if (
      findMySites.data &&
      findMySites.data.findMySites &&
      findMySites.data.findMySites.length &&
      util.isEmpty(selectedDashboard)
    ) {
      setSelectedDashboard(findMySites.data.findMySites[0]);
    }
  });

  function getOptionLabel(data) {
    return data.name;
  }

  function getOptionValue(data) {
    return data.siteId;
  }

  function onChange(data) {
    setSelectedDashboard(data);
  }

  function loadingIndicator() {
    return <Spinner />;
  }

  return (
    <Wrapper>
      <HeadingSmall>Dashboard</HeadingSmall>
      {findMySites.error && (
        <ParagraphMedium>{findMySites.error.message}</ParagraphMedium>
      )}
      <Select
        value={selectedDashboard}
        onChange={onChange}
        options={findMySites.data && findMySites.data.findMySites}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        isLoading={findMySites.loading}
        components={{
          LoadingIndicator: loadingIndicator
        }}
      />
      <Data>
        {findDashboard.loading && <Spinner />}
        <ParagraphMedium>Page views: {data && data.pageViews}</ParagraphMedium>
        <ParagraphMedium>
          Referrers :{" "}
          {data &&
            data.referrers.map(item => {
              return <span key={item}>{item}</span>;
            })}
        </ParagraphMedium>
      </Data>
    </Wrapper>
  );
}

export default Dashboard;
