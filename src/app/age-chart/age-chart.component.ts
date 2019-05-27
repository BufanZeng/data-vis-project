import { Component, OnInit, APP_BOOTSTRAP_LISTENER } from '@angular/core';
import * as d3 from 'd3';
import * as bootstrap from 'bootstrap';
import * as $ from 'jquery';
@Component({
  selector: 'app-age-chart',
  templateUrl: './age-chart.component.html',
  styleUrls: ['./age-chart.component.css']
})
export class AgeChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var data1 = d3.csv("./assets/age_by_year_gender.csv", function(d) {  
      return {  
        'Year': d['Year'],  
        'y1': +d['10+'],  
        'y2': +d['20+'],  
        'y3': +d['30+'],  
        'y4': +d['40+'],  
        'y5': +d['50+'],  
        'y6': +d['60+'],  
        'y7': +d['70+'],  
        'y8': +d['80+'],  
        'y9': +d['90+'],  
        // 'na': +d['NA'],  
      };  
    }).then(function(data1:any) {
  
      // console.log(data1)
      var dataset, year;
      dataset = data1.map(function(d) {
        return {
          Year: d["Year"],
          values: d["y1"]
        }
      }
      )
      // set up svg
      var margin = {top: 40, right: 55, bottom: 40, left: 40},
        width = 640 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;
  
      var svg = d3.select("#age-gender-chart")
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top +')');
  
      // title
      svg.append('text')
      .attr("x", (width / 2))             
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")  
      .style("font-size", "20px") 
      .text("Count of Victims for Different Age Groups in Each Year");
      
      //legend
      var legend_data = [{"gender": "Female", "color": "lightpink"}, {"gender": "Male", "color": "lightblue"}];
      var legend = svg.selectAll(".legend")
        .data(legend_data, function(d) { return d["gender"];  })
        .enter();

      legend.append("rect")
        .attr("x", width - 55)
        .attr("y", function(d, i) { return i * 25; })
        .attr("width", 25)
        .attr("height", 25)
        .style("fill", function(d) { return d["color"]; });
      legend.append("text")
        .attr("x", width - 25)
        .attr("y", function(d, i) { return (i + 0.5) * 25; })
        .style("text-anchor", "start")
        .style("alignment-baseline", "middle")
        .text(function(d) { return d["gender"]; });
  
      // colorScale
      // var colorScale = d3.scaleOrdinal()
      // .range(["rgb(65,187,197)", "rgb(39,91,82)", "rgb(71,240,163)", "rgb(162,103,111)", "rgb(171,213,51)", "rgb(142,0,73)", "rgb(230,208,194)", "rgb(169,55,5)", "rgb(255,28,93)", "rgb(166,182,249)"])
      // .domain(["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"])
  
      // initial state
      var x = d3.scaleBand()
        .domain(["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"]) 
        .paddingInner(0.05)
        .paddingOuter(0.08)
        .range([0, width]);
      var y = d3.scaleLinear<any>()
        .domain([0, 13000])
        .range([height, 0]);
  
      var xAxis = d3.axisBottom(x);
      svg.append("g")
        .attr("id", "xAxis")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
      var yAxis = d3.axisLeft(y)
        .ticks(5, 'd');
  
      svg.append("g")
        .attr("id", "yAxis")
        .attr("class", "axis")
        .call(yAxis);
  
      // draw bars
      svg.append("g")
        .selectAll(".bar")
        .data(dataset, function (d) { return d["Year"]; })
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d["Year"].substring(0,4)); })
        .attr("y", function (d, i) { 
          if (d["Year"].substring(4,5)=="M") {
            return y(d['values']);
          } else {
            // console.log(data1[i+1].y1)
            return y(d["values"]+dataset[i+1].values)
          }})
        .attr("width", x.bandwidth())
        .attr("height", function (d) { 
          return height - y(d['values']); })
        .attr('fill', function(d) {
          if (d['Year'].substring(4,5)=="M") {
            return "lightblue";
          } else {
            return "lightpink";
          }
  
        })
        
        svg.selectAll(".bar").on("mouseover", function(d, i) {
          var chart = document.getElementById("chart4");
          d3.select(this)
          .attr("stroke-width", 2)
          .attr("stroke", "gray");
          var gender = d["Year"].substring(4,5)=="M"? "Male(&male;)" : "Female(&female;)";
          var y_px;
          var total;
          if (d["Year"].substring(4,5)=="M") {
            y_px = y(d['values']);
            total = d['values'] + dataset[i-1].values
          } else {
            y_px = y(d["values"]+dataset[i+1].values)
            total = d['values'] + dataset[i+1].values
          }

          // console.log(x(d["Year"].substring(0,4)))
          d3.select('#tooltip')
            .style("left", (chart.offsetLeft + margin.left + x(d["Year"].substring(0,4)) + x.bandwidth()) + "px")
            .style("top", (chart.offsetTop + y_px) + "px")
            .select('#tooltip_text')
            .html('<h5>' + gender + ": " + d["values"] + '</h5>' + "Total: " + total);

          d3.select('#tooltip').classed('hidden', false);
        }).on("mouseout", function(d) {
          d3.select(this)
          .attr("stroke-width", 0);
          // .attr("stroke", "gray")
          d3.select('#tooltip').classed('hidden', true);
        });
      // transitions
  
      var delay = function (d, i) {
          return i * 50;
      }
  
      var state = "y1"
      var Y_up = false;
      d3.select("#y1")
        .on("click", function(){
          if (Y_up == true) {
            transYaxis1()
            Y_up = false;
          }
          year = "y1"
          transBars()
        })
      d3.select("#y2")
        .on("click", function(){
          if (Y_up == true) {
            transYaxis1()
            Y_up = false;
          }
          year = "y2"
          transBars()
        })
      d3.select("#y3")
        .on("click", function(){
          if (Y_up == true) {
            transYaxis1()
            Y_up = false;
          }
          year = "y3"
          transBars()
        })
      d3.select("#y4")
        .on("click", function(){
          if (Y_up == true) {
            transYaxis1()
            Y_up = false;
          }
          year = "y4"
          transBars()
        })
      d3.select("#y5")
        .on("click", function(){
          if (Y_up == true) {
            transYaxis1()
            Y_up = false;
          }
          year = "y5"
          transBars()
        })
      d3.select("#y6")
        .on("click", function(){
          if (Y_up == true) {
            transYaxis1()
            Y_up = false;
          }
          year = "y6"
          transBars()
        })
      d3.select("#y7")
        .on("click", function(){
          if (Y_up == false) {
            transYaxis2()
            Y_up = true;
          }
          year = "y7"
          transBars()
        })
      d3.select("#y8")
        .on("click", function(){
          if (Y_up == false) {
            transYaxis2()
            Y_up = true;
          }
          year = "y8"
          transBars()
        })
      d3.select("#y9")
        .on("click", function(){
          if (Y_up == false) {
            transYaxis2()
            Y_up = true;
          }
          year = "y9"
          transBars()
        })
      d3.select("#na")
        .on("click", function(){
          if (Y_up == true) {
            transYaxis1()
            Y_up = false;
          }
          year = "na"
          transBars()
        })
  
  function genDataset () {
    dataset = data1.map(function(d) {
              return {
                Year: d["Year"],
                values: d[year]
              }
            }
            )
  }
  function transBars() {
    if (state != year) {
      genDataset()
      // console.log(dataset)
      var bars = svg.selectAll(".bar")
        .data(dataset)
        // .enter()
        // .append("rect")
        .transition()
        .duration(750)
        // .delay(delay)
        .attr("x", function (d) { return x(d["Year"].substring(0,4)); })
        .attr("y", function (d, i) { 
          if (d["Year"].substring(4,5)=="M") {
            return y(d["values"]);
          } else {
            return y(d["values"]+dataset[i+1].values)
          }})
        .attr("class", "bar")
        .attr('fill', function(d) {
          if (d["Year"].substring(4,5)=="M") {
            return "lightblue";
          } else {
            return "lightpink"
          }
  
        })
        .attr("height", function (d) {return height - y(d["values"]); })
      state = year
  
    }          
  }
      
  function transYaxis1() {
    y.domain([0,13000]);
    yAxis = d3.axisLeft(y)
    svg.select("#yAxis")
      .transition()
      .duration(1000)
      .call(yAxis.bind(this));
  }
  
  function transYaxis2() {
    y.domain([0,1400])
    yAxis = d3.axisLeft(y)
    svg.select("#yAxis")
      .transition()
      .duration(1000)
      .call(yAxis.bind(this));
  }
    })
    } 
  }
