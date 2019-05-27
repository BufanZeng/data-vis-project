import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as bootstrap from 'bootstrap';
import * as $ from 'jquery';

@Component({
  selector: 'app-alluvial-diagram',
  templateUrl: './alluvial-diagram.component.html',
  styleUrls: ['./alluvial-diagram.component.css']
})
export class AlluvialDiagramComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var width = $(window).width();
    var height = $(window).height();
    var svg = d3.select("#alluvial")
      // .attr('width', width)
      // .attr('height', height)
      .attr("viewBox", "0 0 " + width + " "+ height)
      .attr("preserveAspectRatio", "xMidYMid meet");
    
    svg.selectAll("path")
      .style("stroke-opacity", 0.5)
      .on("mouseover", function(d) {
        d3.select(this)
          .style("stroke-opacity", 1);
      })
      .on("mouseout", function(d) {
        d3.select(this)
          .style("stroke-opacity", 0.5);
      });
  }

}
