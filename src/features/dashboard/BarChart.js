import React from "react";
import PropTypes from "prop-types";
import { VictoryChart, VictoryBar } from "victory";

function BarChart(props) {
  const { padding, data, alignment, horizontal, x, y } = props;

  if (!data) {
    return null;
  }

  return (
    <VictoryChart padding={padding}>
      <VictoryBar
        data={data}
        alignment={alignment}
        horizontal={horizontal}
        x={x}
        y={y}
      />
    </VictoryChart>
  );
}

BarChart.propTypes = {
  padding: PropTypes.number,
  data: PropTypes.array,
  alignment: PropTypes.string,
  horizontal: PropTypes.bool,
  x: PropTypes.string,
  y: PropTypes.string
};

BarChart.defaultProps = {
  alignment: "middle"
};

export default BarChart;
