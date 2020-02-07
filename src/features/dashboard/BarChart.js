import React from "react";
import PropTypes from "prop-types";
import { VictoryChart, VictoryBar } from "victory";

function BarChart(props) {
  const { data } = props;

  if (!data) {
    return null;
  }

  return (
    <VictoryChart>
      <VictoryBar data={data} alignment="start" />
    </VictoryChart>
  );
}

BarChart.propTypes = {
  data: PropTypes.array
};

export default BarChart;
