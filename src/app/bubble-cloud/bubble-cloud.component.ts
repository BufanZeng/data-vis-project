import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bubble-cloud',
  templateUrl: './bubble-cloud.component.html',
  styleUrls: ['./bubble-cloud.component.css']
})
export class BubbleCloudComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    d3.csv("./assets/data_bubble.csv", function(d) {
      return {
        descent: d.descent,
        count: +d.count,
        parent: d.parent
      };
    }).then(function(data) {
      const stratify = d3.stratify<BubbleType>()
        .id(function(d) { return d.descent; })
        .parentId(function(d) { return d.parent; });

      var margin = {top: 20, right: 0, bottom: 0, left: 0};
      var width = 700 - margin.left - margin.right;
      var height = 500 - margin.top - margin.bottom;

      var svg = d3.select("#bubble_cloud")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.append("text")
        .attr("x", (width+margin.left)/2-margin.left)
        .attr("y", -margin.top)
        .style("text-anchor", "middle")
        .style("alignment-baseline", "hanging")
        .text("Total number of victims of top 5 descents");

      var root = stratify(data)
        .sum(function(d) { return d['count']; })
        .sort(function(a:any, b:any) { return b['count'] - a['count']; });

      d3.pack()
        .size([width, height])
        .padding(5)
        (root);

      var color = d3.scaleOrdinal()
        .domain(data.map(function(d) { return d.descent; }))
        .range(['#9A6324', '#3cb44b', '#8e24aa', '#3949ab', '#039be5']);

      var font_size = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d['count']; })])
        .range([12, 35]);

      var node = svg.selectAll("g")
        .data(root.descendants())
        .enter()
        .filter(function(d) { return !d.children; })
        .append("g")
        .attr("transform", function(d) { return "translate(" + d['x'] + "," + d['y'] + ")"; });

      node.append("circle")
        .attr("r", function(d) { return d['r']; })
        .style("fill", function(d) { return color(d['data']['descent']).toString(); });

      node.append("text")
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .style("font-size", function(d) { return font_size(d['data']['count']); })
        .style("fill", "white")
        .text(function(d) { return d['data']['descent']; });

      node.on('mouseover', function(d) {
        var chart = document.getElementById("chart5");

        d3.select('#tooltip1')
          .style("left", (chart.offsetLeft + parseInt(d['x']) + parseInt(d['r'])) + "px")
          .style("top", (chart.offsetTop + parseInt(d['y']) - parseInt(d['r'])) + "px")
          .select('#tooltip_text1')
          .html('<h4>' + d['data']['descent'] + '</h4>' + 'Total number of victims: ' + d['data']['count']);

        d3.select('#tooltip1').classed('hidden', false);
      })
      .on('mouseout', function(d) {
        d3.select('#tooltip1').classed('hidden', true);
      });
    });
  }
}
export interface BubbleType { descent: string; count: number; parent: string; }