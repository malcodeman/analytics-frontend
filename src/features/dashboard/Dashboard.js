import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { format, subMonths } from "date-fns";

import { HeadingSmall, ParagraphMedium } from "../../components/typography";

import queries from "../../api/queries";
import util from "../../util";
import Spinner from "../../components/spinner/Spinner";
import Select from "../../components/select/Select";
import BarChart from "./BarChart";

const Wrapper = styled.div`
  padding: 1rem;
`;

const Data = styled.div`
  padding: 1rem 0;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

function Dashboard() {
  const paramSiteId = util.getParam("siteId");
  const findMySites = useQuery(queries.FIND_MY_SITES_QUERY);
  const [selectedDashboard, setSelectedDashboard] = React.useState({});
  const [startDate, setStartDate] = React.useState(
    subMonths(new Date(), 1).toISOString()
  );
  const [endDate, setEndDate] = React.useState(new Date().toISOString());
  const findDashboard = useQuery(queries.FIND_DASHBOARD_QUERY, {
    skip: util.isEmpty(selectedDashboard),
    variables: { siteId: selectedDashboard.siteId }
  });
  const data =
    findDashboard && findDashboard.data && findDashboard.data.findDashboard;
  const findCharts = useQuery(queries.FIND_CHARTS_QUERY, {
    skip: util.isEmpty(selectedDashboard),
    variables: {
      siteId: selectedDashboard.siteId,
      from: startDate,
      to: endDate
    }
  });
  const history = useHistory();
  const charts =
    findCharts.data &&
    findCharts.data.findCharts.map(item => {
      return {
        x: format(item.date, "dd/MM"),
        y: item.pageViews
      };
    });

  React.useEffect(() => {
    if (
      findMySites.data &&
      findMySites.data.findMySites &&
      findMySites.data.findMySites.length &&
      util.isEmpty(selectedDashboard)
    ) {
      const site = findMySites.data.findMySites.find(
        site => site.siteId === paramSiteId
      );

      setSelectedDashboard(site || findMySites.data.findMySites[0]);
    }
  });

  function getOptionLabel(data) {
    return data.name;
  }

  function getOptionValue(data) {
    return data.siteId;
  }

  function onChange(data) {
    if (paramSiteId) {
      history.push(`/?siteId=${data.siteId}`);
    }

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
        <ChartsGrid>
          <BarChart data={charts} />
        </ChartsGrid>
        <ParagraphMedium>Page views: {data && data.pageViews}</ParagraphMedium>
        <ParagraphMedium>
          Referrers :{" "}
          {data &&
            data.referrers.map(item => {
              return <span key={item}>{item}</span>;
            })}
        </ParagraphMedium>
        <ParagraphMedium>
          Languages :{" "}
          {data &&
            data.languages.map(item => {
              return <span key={item}>{item}</span>;
            })}
        </ParagraphMedium>
      </Data>
    </Wrapper>
  );
}

export default Dashboard;
