import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-slopegraph',
  templateUrl: './slopegraph.component.html',
  styleUrls: ['./slopegraph.component.css']
})
export class SlopegraphComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    d3.csv("./assets/data_sg.csv", function(d) {
      return {
        city: d.city,
        morning_peak: +d.morning_peak,
        evening_peak: +d.evening_peak,
        daytime: +d.daytime,
        nighttime: +d.nighttime,
      };
    }).then(function(data) {
      var margin_sg = {top: 75, right: 100, bottom: 15, left: 190};
      var padding_sg = 45;
      var width_sg = (parseInt(d3.select("#chart3").style("width")) / 2) - margin_sg.left - margin_sg.right;
      var height_sg = parseInt(d3.select("#chart3").style("height")) - margin_sg.top - margin_sg.bottom;
      var slopegraph1 = d3.select("#slopegraph1")
        .attr("width", width_sg + margin_sg.left + margin_sg.right)
        .attr("height", height_sg + margin_sg.top + margin_sg.bottom)
        .append("g")
        .attr("transform", "translate(" + margin_sg.left + "," + margin_sg.top + ")");
      var slopegraph2 = d3.select("#slopegraph2")
        .attr("width", width_sg + margin_sg.left + margin_sg.right)
        .attr("height", height_sg + margin_sg.top + margin_sg.bottom)
        .append("g")
        .attr("transform", "translate(" + margin_sg.left + "," + margin_sg.top + ")");

      // Add chart title
      slopegraph1.append("text")
        .attr("x", width_sg/2)
        .attr("y", -margin_sg.top)
        .style("text-anchor", "middle")
        .style("alignment-baseline", "hanging")
        .attr("font-size","12px")
        .text("Slopegraph showing changes in cumulative accident frequency per hour");
      slopegraph1.append("text")
        .attr("x", width_sg/2)
        .attr("y", -margin_sg.top)
        .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .style("alignment-baseline", "hanging")
        .attr("font-size","12px")
        .text("between morning and evening peaks");
      slopegraph1.append("text")
        .attr("x", width_sg/2)
        .attr("y", -margin_sg.top)
        .attr("dy", "2.4em")
        .style("text-anchor", "middle")
        .style("alignment-baseline", "hanging")
        .attr("font-size","12px")
        .text("of 10 cities with the most number accidents during 2010-2018");
      slopegraph2.append("text")
        .attr("x", width_sg/2)
        .attr("y", -margin_sg.top)
        .style("text-anchor", "middle")
        .style("alignment-baseline", "hanging")
        .attr("font-size","12px")
        .text("Slopegraph showing changes in cumulative accident frequency per hour");
      slopegraph2.append("text")
        .attr("x", width_sg/2)
        .attr("y", -margin_sg.top)
        .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .style("alignment-baseline", "hanging")
        .attr("font-size","12px")
        .text("between daytime and nighttime");
      slopegraph2.append("text")
        .attr("x", width_sg/2)
        .attr("y", -margin_sg.top)
        .attr("dy", "2.4em")
        .style("text-anchor", "middle")
        .style("alignment-baseline", "hanging")
        .attr("font-size","12px")
        .text("of 10 cities with the most number accidents during 2010-2018");
      
      // Add legend
      slopegraph1.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("dy", "-1.5em")
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .attr("font-size","12px")
        .style("font-weight", "bold")
        .style("alignment-baseline", "baseline")
        .text("Morning peak (7am-10am)");
      slopegraph1.append("text")
        .attr("x", width_sg)
        .attr("y", 0)
        .attr("dy", "-1.5em")
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .attr("font-size","12px")
        .style("font-weight", "bold")
        .style("alignment-baseline", "baseline")
        .text("Evening peak (4pm-7pm)");
      slopegraph2.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("dy", "-1.5em")
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .attr("font-size","12px")
        .style("font-weight", "bold")
        .style("alignment-baseline", "baseline")
        .text("Daytime (10am-4pm)");
      slopegraph2.append("text")
        .attr("x", width_sg)
        .attr("y", 0)
        .attr("dy", "-1.5em")
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .attr("font-size","12px")
        .style("font-weight", "bold")
        .style("alignment-baseline", "baseline")
        .text("Nighttime (7pm-7am)");

      var la = data.filter(function(d) { return d["city"] == "Los Angeles"; });
      var others = data.filter(function(d) { return d["city"] != "Los Angeles"; });
      
      var scale_la = d3.scaleLinear()
        .domain(d3.extent([].concat(la.map(function(d) { return d["morning_peak"]; }), la.map(function(d) { return d["evening_peak"]; }), la.map(function(d) { return d["daytime"]; }), la.map(function(d) { return d["nighttime"]; }))))
        .range([height_sg/data.length, 0])
      var scale_others = d3.scaleLinear()
        .domain(d3.extent([].concat(others.map(function(d) { return d["morning_peak"]; }), others.map(function(d) { return d["evening_peak"] }), others.map(function(d) { return d["daytime"]; }), others.map(function(d) { return d["nighttime"] }))))
        .range([height_sg, height_sg/data.length+20]);

      var la1 = slopegraph1.selectAll(".city")
        .data(la)
        .enter();
      var other1 = slopegraph1.selectAll(".city")
        .data(others)
        .enter();
      var la2 = slopegraph2.selectAll(".city")
        .data(la)
        .enter();
      var other2 = slopegraph2.selectAll(".city")
        .data(others)
        .enter();

      // la1.append("line")
      //   .attr("x1", -margin_sg.left)
      //   .attr("y1", height_sg/data.length+8)
      //   .attr("x2", width_sg+margin_sg.left+margin_sg.right)
      //   .attr("y2", height_sg/data.length+8)
      //   .style("stroke", "gray")
      //   .style("stroke-width", "1.5px");
      la1.append("text")
        .attr("class", function(d) { return "label_"+d["city"].replace(/ /g, "_"); })
        .attr("x", -50)
        .attr("y", function(d) { return scale_la(d["morning_peak"]); })
        .style("text-anchor", "end")
        .style("alignment-baseline", "middle")
        .style("fill-opacity", 0.5)
        .attr("font-size","12px")
        .style("font-weight", "normal")
        .style("stroke-width", 0.1)
        .text(function(d) { return d["city"]; });
      la1.append("text")
        .attr("class", function(d) { return "text1_"+d["city"].replace(/ /g, "_"); })
        .attr("x", 0)
        .attr("y", function(d) { return scale_la(d["morning_peak"]); })
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .style("fill-opacity", 0.5)
        .attr("font-size","12px")
        .style("font-weight", "normal")
        .style("stroke-width", 0.1)
        .text(function(d) { return d["morning_peak"]; });
      la1.append("text")
        .attr("class", function(d) { return "text2_"+d["city"].replace(/ /g, "_"); })
        .attr("x", width_sg)
        .attr("y", function(d) { return scale_la(d["evening_peak"]); })
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .style("fill-opacity", 0.5)
        .attr("font-size","12px")
        .style("font-weight", "normal")
        .style("stroke-width", 0.1)
        .text(function(d) { return d["evening_peak"]; });
      la1.append("line")
        .attr("class", function(d) { return "line_"+d["city"].replace(/ /g, "_"); })
        .attr("x1", padding_sg)
        .attr("y1", function(d) { return scale_la(d["morning_peak"]); })
        .attr("x2", width_sg-padding_sg)
        .attr("y2", function(d) { return scale_la(d["evening_peak"]); })
        .style("stroke", "black")
        .style("stroke-width", 1);

      // la2.append("line")
      //   .attr("x1", -margin_sg.left)
      //   .attr("y1", height_sg/data.length+8)
      //   .attr("x2", width_sg+margin_sg.left+margin_sg.right)
      //   .attr("y2", height_sg/data.length+8)
      //   .style("stroke", "gray")
      //   .style("stroke-width", "1.5px");
      la2.append("text")
        .attr("class", function(d) { return "label_"+d["city"].replace(/ /g, "_"); })
        .attr("x", -50)
        .attr("y", function(d) { return scale_la(d["daytime"]); })
        .style("text-anchor", "end")
        .style("alignment-baseline", "middle")
        .style("fill-opacity", 0.5)
        .attr("font-size","12px")
        .style("font-weight", "normal")
        .style("stroke-width", 0.1)
        .text(function(d) { return d["city"]; });
      la2.append("text")
        .attr("class", function(d) { return "text1_"+d["city"].replace(/ /g, "_"); })
        .attr("x", 0)
        .attr("y", function(d) { return scale_la(d["daytime"]); })
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .style("fill-opacity", 0.5)
        .attr("font-size","12px")
        .style("font-weight", "normal")
        .style("stroke-width", 0.1)
        .text(function(d) { return d["daytime"]; });
      la2.append("text")
        .attr("class", function(d) { return "text2_"+d["city"].replace(/ /g, "_"); })
        .attr("x", width_sg)
        .attr("y", function(d) { return scale_la(d["nighttime"]); })
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .style("fill-opacity", 0.5)
        .attr("font-size","12px")
        .style("font-weight", "normal")
        .style("stroke-width", 0.1)
        .text(function(d) { return d["nighttime"]; });
      la2.append("line")
        .attr("class", function(d) { return "line_"+d["city"].replace(/ /g, "_"); })
        .attr("x1", padding_sg)
        .attr("y1", function(d) { return scale_la(d["daytime"]); })
        .attr("x2", width_sg-padding_sg)
        .attr("y2", function(d) { return scale_la(d["nighttime"]); })
        .style("stroke", "black")
        .style("stroke-width", 1);
        
      other1.append("text")
        .attr("class", function(d) { return "label_"+d["city"].replace(/ /g, "_"); })
        .attr("x", -50)
        .attr("y", function(d) { return scale_others(d["morning_peak"]); })
        .style("text-anchor", "end")
        .style("alignment-baseline", "middle")
        .style("fill-opacity", 0.5)
        .attr("font-size","12px")
        .style("font-weight", "normal")
        .style("stroke-width", 0.1)
        .text(function(d) { return d["city"]; });
      other2.append("text")
        .attr("class", function(d) { return "label_"+d["city"].replace(/ /g, "_"); })
        .attr("x", -50)
        .attr("y", function(d) { return scale_others(d["daytime"]); })
        .style("text-anchor", "end")
        .style("alignment-baseline", "middle")
        .style("fill-opacity", 0.5)
        .attr("font-size","12px")
        .style("font-weight", "normal")
        .style("stroke-width", 0.1)
        .text(function(d) { return d["city"]; });
      
      other1.append("text")
        .attr("class", function(d) { return "text1_"+d["city"].replace(/ /g, "_"); })
        .attr("x", 0)
        .attr("y", function(d) { return scale_others(d["morning_peak"]); })
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .style("fill-opacity", 0.5)
        .attr("font-size","12px")
        .style("font-weight", "normal")
        .style("stroke-width", 0.1)
        .text(function(d) { return d["morning_peak"]; });
      other1.append("text")
        .attr("class", function(d) { return "text2_"+d["city"].replace(/ /g, "_"); })
        .attr("x", width_sg)
        .attr("y", function(d) { return scale_others(d["evening_peak"]); })
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .style("fill-opacity", 0.5)
        .attr("font-size","12px")
        .style("font-weight", "normal")
        .style("stroke-width", 0.1)
        .text(function(d) { return d["evening_peak"]; });
      
      other2.append("text")
        .attr("class", function(d) { return "text1_"+d["city"].replace(/ /g, "_"); })
        .attr("x", 0)
        .attr("y", function(d) { return scale_others(d["daytime"]); })
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .style("fill-opacity", 0.5)
        .attr("font-size","12px")
        .style("font-weight", "normal")
        .style("stroke-width", 0.1)
        .text(function(d) { return d["daytime"]; });
      other2.append("text")
        .attr("class", function(d) { return "text2_"+d["city"].replace(/ /g, "_"); })
        .attr("x", width_sg)
        .attr("y", function(d) { return scale_others(d["nighttime"]); })
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .style("fill-opacity", 0.5)
        .attr("font-size","12px")
        .style("font-weight", "normal")
        .style("stroke-width", 0.1)
        .text(function(d) { return d["nighttime"]; });

      other1.append("line")
        .attr("class", function(d) { return "line_"+d["city"].replace(/ /g, "_"); })
        .attr("x1", padding_sg)
        .attr("y1", function(d) { return scale_others(d["morning_peak"]); })
        .attr("x2", width_sg-padding_sg)
        .attr("y2", function(d) { return scale_others(d["evening_peak"]); })
        .style("stroke", "black")
        .style("stroke-width", 1);
      other2.append("line")
        .attr("class", function(d) { return "line_"+d["city"].replace(/ /g, "_"); })
        .attr("x1", padding_sg)
        .attr("y1", function(d) { return scale_others(d["daytime"]); })
        .attr("x2", width_sg-padding_sg)
        .attr("y2", function(d) { return scale_others(d["nighttime"]); })
        .style("stroke", "black")
        .style("stroke-width", 1);

      data.forEach(function(datum) {
        slopegraph1.selectAll(".label_"+datum["city"].replace(/ /g, "_"))
          .on("mouseover", function(d) {
            mouseover_effect(d);
          })
          .on("mouseout", function(d) {
            mouseout_effect(d);
          });
        slopegraph1.selectAll(".line_"+datum["city"].replace(/ /g, "_"))
          .on("mouseover", function(d) {
            mouseover_effect(d);
          })
          .on("mouseout", function(d) {
            mouseout_effect(d);
          });
        slopegraph1.selectAll(".text1_"+datum["city"].replace(/ /g, "_"))
          .on("mouseover", function(d) {
            mouseover_effect(d);
          })
          .on("mouseout", function(d) {
            mouseout_effect(d);
          });
        slopegraph1.selectAll(".text2_"+datum["city"].replace(/ /g, "_"))
          .on("mouseover", function(d) {
            mouseover_effect(d);
          })
          .on("mouseout", function(d) {
            mouseout_effect(d);
          });
        slopegraph2.selectAll(".label_"+datum["city"].replace(/ /g, "_"))
          .on("mouseover", function(d) {
            mouseover_effect(d);
          })
          .on("mouseout", function(d) {
            mouseout_effect(d);
          });
        slopegraph2.selectAll(".line_"+datum["city"].replace(/ /g, "_"))
          .on("mouseover", function(d) {
            mouseover_effect(d);
          })
          .on("mouseout", function(d) {
            mouseout_effect(d);
          });
        slopegraph2.selectAll(".text1_"+datum["city"].replace(/ /g, "_"))
          .on("mouseover", function(d) {
            mouseover_effect(d);
          })
          .on("mouseout", function(d) {
            mouseout_effect(d);
          });
        slopegraph2.selectAll(".text2_"+datum["city"].replace(/ /g, "_"))
          .on("mouseover", function(d) {
            mouseover_effect(d);
          })
          .on("mouseout", function(d) {
            mouseout_effect(d);
          });
        
        function mouseover_effect(d) {
          slopegraph1.selectAll(".label_"+d["city"].replace(/ /g, "_"))
            .attr("x", -40)
            .style("font-size", "18px")
            .style("font-weight", "bold")
            .style("fill", "red")
            .style("fill-opacity", 1)
            .style("stroke", "white")
            .raise();
          slopegraph1.selectAll(".line_"+d["city"].replace(/ /g, "_"))
            .style("stroke", "red")
            .style("stroke-width", 3)
            .raise();
          slopegraph1.selectAll(".text1_"+d["city"].replace(/ /g, "_"))
            .attr("x", 10)
            .style("font-size", "18px")
            .style("font-weight", "bold")
            .style("fill", "red")
            .style("fill-opacity", 1)
            .style("stroke", "white")
            .raise();
          slopegraph1.selectAll(".text2_"+d["city"].replace(/ /g, "_"))
            .attr("x", width_sg-10)
            .style("font-size", "18px")
            .style("font-weight", "bold")
            .style("fill", "red")
            .style("fill-opacity", 1)
            .style("stroke", "white")
            .raise();
          slopegraph2.selectAll(".label_"+d["city"].replace(/ /g, "_"))
            .attr("x", -40)
            .style("font-size", "18px")
            .style("font-weight", "bold")
            .style("fill", "red")
            .style("fill-opacity", 1)
            .style("stroke", "white")
            .raise();
          slopegraph2.selectAll(".line_"+d["city"].replace(/ /g, "_"))
            .style("stroke", "red")
            .style("stroke-width", 3)
            .raise();
          slopegraph2.selectAll(".text1_"+d["city"].replace(/ /g, "_"))
            .attr("x", 10)
            .style("font-size", "18px")
            .style("font-weight", "bold")
            .style("fill", "red")
            .style("fill-opacity", 1)
            .style("stroke", "white")
            .raise();
          slopegraph2.selectAll(".text2_"+d["city"].replace(/ /g, "_"))
            .attr("x", width_sg-10)
            .style("font-size", "18px")
            .style("font-weight", "bold")
            .style("fill", "red")
            .style("fill-opacity", 1)
            .style("stroke", "white")
            .raise();
        }

        function mouseout_effect(d) {
          slopegraph1.selectAll(".label_"+d["city"].replace(/ /g, "_"))
            .attr("x", -50)
            .style("font-size", "12px")
            .style("font-weight", "normal")
            .style("fill", "black")
            .style("fill-opacity", 0.5)
            .style("stroke", "black");
          slopegraph1.selectAll(".line_"+d["city"].replace(/ /g, "_"))
            .style("stroke", "black")
            .style("stroke-width", 1);
          slopegraph1.selectAll(".text1_"+d["city"].replace(/ /g, "_"))
            .attr("x", 0)
            .style("font-size", "12px")
            .style("font-weight", "normal")
            .style("fill", "black")
            .style("fill-opacity", 0.5)
            .style("stroke", "black");
          slopegraph1.selectAll(".text2_"+d["city"].replace(/ /g, "_"))
            .attr("x", width_sg)
            .style("font-size", "12px")
            .style("font-weight", "normal")
            .style("fill", "black")
            .style("fill-opacity", 0.5)
            .style("stroke", "black");
          slopegraph2.selectAll(".label_"+d["city"].replace(/ /g, "_"))
            .attr("x", -50)
            .style("font-size", "12px")
            .style("font-weight", "normal")
            .style("fill", "black")
            .style("fill-opacity", 0.5)
            .style("stroke", "black");
          slopegraph2.selectAll(".line_"+d["city"].replace(/ /g, "_"))
            .style("stroke", "black")
            .style("stroke-width", 1);
          slopegraph2.selectAll(".text1_"+d["city"].replace(/ /g, "_"))
            .attr("x", 0)
            .style("font-size", "12px")
            .style("font-weight", "normal")
            .style("fill", "black")
            .style("fill-opacity", 0.5)
            .style("stroke", "black");
          slopegraph2.selectAll(".text2_"+d["city"].replace(/ /g, "_"))
            .attr("x", width_sg)
            .style("font-size", "12px")
            .style("font-weight", "normal")
            .style("fill", "black")
            .style("fill-opacity", 0.5)
            .style("stroke", "black");
        }
      })
    });
  }

}
