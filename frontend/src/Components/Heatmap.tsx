import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface HeatmapProps {
	data: number[];
}

const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
	const ref = useRef<SVGSVGElement>(null);
	const cellSize = window.innerHeight / 10;

	useEffect(() => {
		const svg = d3.select(ref.current);
		const colorScale = d3.scaleSequential().interpolator(d3.interpolateBlues);

		// Ensure data handling within D3 callbacks is correctly typed
		// This assumes your data is an array of numbers as per HeatmapProps
		svg
			.selectAll('rect')
			.data<number>(data) // Explicitly type data as number array
			.join('rect')
			.attr('y', (_: number, i: number) => (i % 7) * cellSize)
			.attr('x', (_: number, i: number) => Math.floor(i / 7) * cellSize)
			.attr('width', cellSize - 1)
			.attr('height', cellSize - 1)
			.attr('fill', (d: number) => colorScale(d / 10));
	}, [data, cellSize]);

	const numWeeks = Math.ceil(data.length / 7);
	const svgWidth = numWeeks * cellSize;
	const svgHeight = 7 * cellSize;

	return (
		<div style={{ overflow: 'auto', height: '100%' }}>
			<svg ref={ref} width={svgWidth} height={svgHeight} />
		</div>
	);
};

export default Heatmap;
