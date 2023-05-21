import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface MarkerData {
  markerId: string;
  data: {
    date: Date;
    temperature: number;
  }[];
}

const ReferenceTime = new Date('2000-01-23T04:56:10.000+00:00');
let readingTime = new Date(ReferenceTime);
let markerData: MarkerData[] = [
  {
    markerId: '1.1',
    data: [
      {
        date: new Date(readingTime.setHours(ReferenceTime.getHours())),
        temperature: 20,
      },
      {
        date: new Date(readingTime.setHours(ReferenceTime.getHours() + 1)),
        temperature: 20 + 1,
      },
      {
        date: new Date(readingTime.setHours(ReferenceTime.getHours() + 2)),
        temperature: 20 + 2,
      },
      {
        date: new Date(readingTime.setHours(ReferenceTime.getHours() + 3)),
        temperature: 20 + 3,
      },
    ],
  },
  {
    markerId: '1.2',
    data: [
      {
        date: new Date(readingTime.setHours(ReferenceTime.getHours())),
        temperature: 22,
      },
      {
        date: new Date(readingTime.setHours(ReferenceTime.getHours() + 1)),
        temperature: 22 + 1.5,
      },
      {
        date: new Date(readingTime.setHours(ReferenceTime.getHours() + 2)),
        temperature: 22 + 2,
      },
      {
        date: new Date(readingTime.setHours(ReferenceTime.getHours() + 4)),
        temperature: 22 + 3,
      },
    ],
  },
  {
    markerId: '1.3',
    data: [
      {
        date: new Date(readingTime.setHours(ReferenceTime.getHours() + 1.3)),
        temperature: 24 - 1.5,
      },
      {
        date: new Date(readingTime.setHours(ReferenceTime.getHours() + 2)),
        temperature: 24 - 2,
      },
    ],
  },
];

const ChartViewer = () => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const svg = d3.select(chartRef.current);

      // Set the dimensions and margins of the chart
      const margin = { top: 20, right: 30 + 90, bottom: 30, left: 60 };
      const width = +svg.attr('width')! - margin.left - margin.right;
      const height = +svg.attr('height')! - margin.top - margin.bottom;

      // Create scales for x and y axes
      const x = d3.scaleTime().range([0, width]);
      const y = d3.scaleLinear().range([height, 0]);

      // Define line generator functions
      const line = d3
        .line<{ date: Date; temperature: number }>()
        .x((d) => x(d.date))
        .y((d) => y(d.temperature));

      // Define color scale for markers
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      // Clear existing chart content
      svg.selectAll('*').remove();

      // Create a group element for chart content
      const chart = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Set domain for x and y scales based on data
      const dates = markerData.flatMap((marker) =>
        marker.data.map((d) => d.date)
      );
      const temperatures = markerData.flatMap((marker) =>
        marker.data.map((d) => d.temperature)
      );
      // x.domain(d3.extent(dates)!).nice();
      // y.domain(d3.extent(temperatures)!).nice();

      // Set domain for x and y scales based on data

      const minX: Date = d3.min(dates)!;
      const maxX: Date = d3.max(dates)!;
      const minY: number = d3.min(temperatures)!;
      const maxY: number = d3.max(temperatures)!;
      x.domain([minX, maxX]).nice();
      y.domain([minY, maxY]).nice();

      // Add x-axis
      chart
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      // Add y-axis
      chart.append('g').call(d3.axisLeft(y));

      // Add lines for each marker
      markerData.forEach((marker, index) => {
        chart
          .append('path')
          .datum(marker.data)
          .attr('fill', 'none')
          .attr('stroke', color(marker.markerId))
          .attr('stroke-width', 2)
          .attr('d', line);
      });

      // Add tooltip
      const tooltip = d3
        .select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

      // Add circle markers for each data point
      markerData.forEach((marker) => {
        const markerIdClass = `circle-${marker.markerId.replace('.', '-')}`;

        chart
          .selectAll(`.${markerIdClass}`)
          .data(marker.data)
          .enter()
          .append('circle')
          .attr('class', markerIdClass)
          .attr('cx', (d) => x(d.date))
          .attr('cy', (d) => y(d.temperature))
          .attr('r', 5)
          .attr('fill', color(marker.markerId))
          .on('mouseover', (d) => {
            const [xPos, yPos] = d3.pointer(d);
            tooltip.transition().duration(200).style('opacity', 0.9);
            tooltip
              .html(`Temperature: ${d.temperature}`)
              .style('left', `${xPos + margin.left}px`)
              .style('top', `${yPos + margin.top}px`);
          })
          .on('mouseout', () => {
            tooltip.transition().duration(200).style('opacity', 0);
          });
      });

      // Add legend
      const legend = svg
        .append('g')
        .attr('class', 'legend')
        .attr(
          'transform',
          `translate(${width + margin.left + 10},${margin.top})`
        );

      markerData.forEach((marker, index) => {
        const legendItem = legend
          .append('g')
          .attr('class', 'legend-item')
          .attr('transform', `translate(0,${index * 20})`);

        legendItem
          .append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 10)
          .attr('height', 10)
          .attr('fill', color(marker.markerId));

        legendItem
          .append('text')
          .attr('x', 20)
          .attr('y', 8)
          .attr('dy', '0.32em')
          .text(marker.markerId);
      });
    }
  }, [markerData]);

  return <svg ref={chartRef} width="1600" height="800" />;
};

export default ChartViewer;
