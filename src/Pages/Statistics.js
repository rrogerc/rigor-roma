import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function Statistics() {
  const data = Array.from({ length: 365 }, () =>
    Math.floor(Math.random() * 10)
  );

  const ref = useRef();
  const cellSize = 12;

  useEffect(() => {
    const svg = d3.select(ref.current);
    const colorScale = d3.scaleSequential().interpolator(d3.interpolateBlues);
    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("y", (d, i) => (i % 7) * cellSize)
      .attr("x", (d, i) => Math.floor(i / 7) * cellSize)
      .attr("width", cellSize - 1)
      .attr("height", cellSize - 1)
      .attr("fill", (d) => colorScale(d / 10));
  }, [data]);

  const numWeeks = Math.ceil(data.length / 7);
  const svgWidth = numWeeks * cellSize;
  const svgHeight = 7 * cellSize;

  return (
    <div style={{ overflow: "auto", height: "100%" }}>
      <svg ref={ref} width={svgWidth} height={svgHeight} />
    </div>
  );
}

export default Statistics;
