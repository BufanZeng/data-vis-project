import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-choropleth-map',
  templateUrl: './choropleth-map.component.html',
  styleUrls: ['./choropleth-map.component.css']
})
export class ChoroplethMapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    d3.json("./assets/map_la.geojson").then(function(json) {
      d3.csv("./assets/data_map.csv", function(d) {
        return {
          city: d.city,
          morning_peak: +d.morning_peak,
          evening_peak: +d.evening_peak,
          daytime: +d.daytime,
          nighttime: +d.nighttime,
          total: +d.total
        };
      }).then(function(data) {
        var margin_map = {top: 30, right: 0, bottom: 10, left: 0};
        var width_map = (parseInt(d3.select("#chart2").style("width")) / 2) - margin_map.left - margin_map.right;
        var height_map = parseInt(d3.select("#chart2").style("height")) - margin_map.top - margin_map.bottom;
        var map = d3.select("#map")
          .attr("width", width_map + margin_map.left + margin_map.right)
          .attr("height", height_map + margin_map.top + margin_map.bottom)
          .append("g")
          .attr("transform", "translate(" + margin_map.left + "," + margin_map.top + ")");

        var margin_smap = {top: 30, right: 0, bottom: 10, left: 0};
        var width_smap = (parseInt(d3.select("#chart2").style("width")) / 4) - margin_smap.left - margin_smap.right;
        var height_smap = (parseInt(d3.select("#chart2").style("height")) / 2) - margin_smap.top - margin_smap.bottom;
        var map1 = d3.select("#map1")
          .attr("width", width_smap + margin_smap.left + margin_smap.right)
          .attr("height", height_smap + margin_smap.top + margin_smap.bottom)
          .append("g")
          .attr("transform", "translate(" + margin_smap.left + "," + margin_smap.top + ")");
        var map2 = d3.select("#map2")
          .attr("width", width_smap + margin_smap.left + margin_smap.right)
          .attr("height", height_smap + margin_smap.top + margin_smap.bottom)
          .append("g")
          .attr("transform", "translate(" + margin_smap.left + "," + margin_smap.top + ")");
        var map3 = d3.select("#map3")
          .attr("width", width_smap + margin_smap.left + margin_smap.right)
          .attr("height", height_smap + margin_smap.top + margin_smap.bottom)
          .append("g")
          .attr("transform", "translate(" + margin_smap.left + "," + margin_smap.top + ")");
        var map4 = d3.select("#map4")
          .attr("width", width_smap + margin_smap.left + margin_smap.right)
          .attr("height", height_smap + margin_smap.top + margin_smap.bottom)
          .append("g")
          .attr("transform", "translate(" + margin_smap.left + "," + margin_smap.top + ")");

        // Add chart title
        map.append("text")
          .attr("x", (width_map+margin_map.left)/2-margin_map.left)
          .attr("y", -margin_map.top)
          .style("font-size", "14px")
          .style("text-anchor", "middle")
          .style("alignment-baseline", "hanging")
          .text("Choropleth map of each city's cumulative accident frequency during 2010-2018");
        map1.append("text")
          .attr("x", (width_smap+margin_smap.left)/2-margin_smap.left)
          .attr("y", -margin_smap.top)
          .style("font-size", "12px")
          .style("text-anchor", "middle")
          .style("alignment-baseline", "hanging")
          .text("Hourly frequency by rank:");
        map1.append("text")
          .attr("x", (width_smap+margin_smap.left)/2-margin_smap.left)
          .attr("y", -margin_smap.top)
          .attr("dy", "1.2em")
          .style("font-size", "12px")
          .style("text-anchor", "middle")
          .style("alignment-baseline", "hanging")
          .text("morning peak (7am - 10am)");
        map2.append("text")
          .attr("x", (width_smap+margin_smap.left)/2-margin_smap.left)
          .attr("y", -margin_smap.top)
          .style("font-size", "12px")
          .style("text-anchor", "middle")
          .style("alignment-baseline", "hanging")
          .text("Hourly frequency by rank:");
        map2.append("text")
          .attr("x", (width_smap+margin_smap.left)/2-margin_smap.left)
          .attr("y", -margin_smap.top)
          .attr("dy", "1.2em")
          .style("font-size", "12px")
          .style("text-anchor", "middle")
          .style("alignment-baseline", "hanging")
          .text("evening peak (4pm - 7pm)");
        map3.append("text")
          .attr("x", (width_smap+margin_smap.left)/2-margin_smap.left)
          .attr("y", -margin_smap.top)
          .style("font-size", "12px")
          .style("text-anchor", "middle")
          .style("alignment-baseline", "hanging")
          .text("Hourly frequency by rank:");
        map3.append("text")
          .attr("x", (width_smap+margin_smap.left)/2-margin_smap.left)
          .attr("y", -margin_smap.top)
          .attr("dy", "1.2em")
          .style("font-size", "12px")
          .style("text-anchor", "middle")
          .style("alignment-baseline", "hanging")
          .text("daytime (10am - 4pm)");
        map4.append("text")
          .attr("x", (width_smap+margin_smap.left)/2-margin_smap.left)
          .attr("y", -margin_smap.top)
          .style("font-size", "12px")
          .style("text-anchor", "middle")
          .style("alignment-baseline", "hanging")
          .text("Hourly frequency by rank:");
        map4.append("text")
          .attr("x", (width_smap+margin_smap.left)/2-margin_smap.left)
          .attr("y", -margin_smap.top)
          .attr("dy", "1.2em")
          .style("font-size", "12px")
          .style("text-anchor", "middle")
          .style("alignment-baseline", "hanging")
          .text("nighttime (7pm - 7am)");

        var morning_peak = new Object();
        var daytime = new Object();
        var evening_peak = new Object();
        var nighttime = new Object();
        var total = new Object();
        data.map(function(d) {
          morning_peak[d["city"]]= d["morning_peak"];
          daytime[d["city"]]= d["daytime"];
          evening_peak[d["city"]]= d["evening_peak"];
          nighttime[d["city"]]= d["nighttime"];
          total[d["city"]]= d["total"];
        });
        var cities = Object.keys(total);
        
        var color_map = d3.scaleQuantile<string>()
          .domain(Object.values(total))
          .range(["#276da1", "#97d0e4", "#fdae61", "#d7191c"]);
        // var color_map = d3.scaleQuantize<string>()
        //   .domain(d3.extent(Object.values(total)))
        //   .range(["#2c7bb6", "#abd9e9", "#fdae61", "#d7191c"]);
        var color_smap = d3.scaleOrdinal<string>()
          .domain(["4", "3", "2", "1"])
          .range(["#276da1", "#97d0e4", "#fdae61", "#d7191c"]);

        // Add legend
        map.append("text")
          .attr("x", 0)
          .attr("y", height_map - 4 * 25 - 10)
          .attr("alignment-baseline", "middle")
          .style("font-size", "14px")
          .style("font-weight", "bold")
          .text("Level of severity");
        // map.append("text")
        //   .attr("x", 0)
        //   .attr("y", height_map - 5 * 25 - 10)
        //   .attr("dy", "1.2em")
        //   .attr("alignment-baseline", "middle")
        //   .style("font-size", "12px")
        //   .text("(in percentiles)");
        
        map.selectAll("rect")
          .data(color_map.range().map(function(d) { return color_map.invertExtent(d); }))
          .enter()
          .append("rect")
          .attr("x", 0)
          .attr("y", function(d, i) { return height_map - ((i+1) * 25); })
          .attr("width", 25)
          .attr("height", 25)
          .attr("fill", function(d) { return color_map(d[0]); });

        map.selectAll(".legend_text")
          // .data([].concat(color_map.range().map(function(d) { return color_map.invertExtent(d)[0]; }), color_map.invertExtent(color_map.range()[color_map.range().length-1])[1]))
          .data(["Minor", "Moderate", "Major", "Severe"])
          .enter()
          .append("text")
          .attr("x", 28)
          .attr("y", function(d, i) { return height_map - ((i+0.5) * 25); })
          .attr("alignment-baseline", "middle")
          .style("font-size", "12px")
          // .text(function(d, i) { 
          //   if (i == 0) {
          //     return "Min (" + d + ")";
          //   } else if (i == 4) {
          //     return "Max (" + d + ")";
          //   } else{
          //     return (i * 25) + "% (" + d + ")"; 
          //   }
          // });
          .text(function(d) { return d; });

        var projection_map = d3.geoMercator()
          .fitSize([width_map, height_map], <d3.ExtendedFeature>json);
        var projection_smap = d3.geoMercator()
          .fitSize([width_smap, height_smap], <d3.ExtendedFeature>json);
        
        var path_map = d3.geoPath()
          .projection(projection_map);
        var path_smap = d3.geoPath()
          .projection(projection_smap);

        map.selectAll("path")
          .data(json["features"])
          .enter()
          .append("path")
          .attr("class", function(d) {
            var city_name;
            if ((cities.indexOf(d["properties"]["name"]) <= -1) && (d["properties"]["metadata"]["city"] == "los-angeles")) {
              city_name = "Los Angeles";
            } else {
              city_name = d["properties"]["name"];
            }

            return "path_"+city_name.replace(/ /g, "_");
          })
          .style("fill", function(d) {
            if (cities.indexOf(d["properties"]["name"]) > -1) {
              return color_map(total[d["properties"]["name"]]);
            } else if (d["properties"]["metadata"]["city"] == "los-angeles") {
              return color_map(total["Los Angeles"]);
            } else {
              return "white";
            }
          })
          .style("stroke", "gray")
          .style("stroke-width", 1)
          .style("fill-opacity", 0.5)
          .attr("d", path_map)
          .on("mouseover", function(d) {
            var has_data = false;
            var city_name;
            if (cities.indexOf(d["properties"]["name"]) > -1) {
              has_data = true;
              city_name = d["properties"]["name"];
            } else if (d["properties"]["metadata"]["city"] == "los-angeles") {
              has_data = true;
              city_name = "Los Angeles";
            }

            if (has_data) {
              d3.selectAll(".path_"+city_name.replace(/ /g, "_"))
                .style("fill-opacity", 1)
                .style("stroke", "black");
            }
          })
          .on("mouseout", function(d) {
            var has_data = false;
            var city_name;
            if (cities.indexOf(d["properties"]["name"]) > -1) {
              has_data = true;
              city_name = d["properties"]["name"];
            } else if (d["properties"]["metadata"]["city"] == "los-angeles") {
              has_data = true;
              city_name = "Los Angeles";
            }

            if (has_data) {
              d3.selectAll(".path_"+city_name.replace(/ /g, "_"))
                .style("fill-opacity", 0.5)
                .style("stroke", "gray");
            }
          })
          .append("title")
          .text(function(d) {
            if (cities.indexOf(d["properties"]["name"]) > -1) {
              return d["properties"]["name"] + ": " + total[d["properties"]["name"]];
            } else if (d["properties"]["metadata"]["city"] == "los-angeles") {
              return "Los Angeles (downtown): " + total["Los Angeles"];
            } else {
              return d["properties"]["name"];
            }
          });

        map1.selectAll("path")
          .data(json["features"])
          .enter()
          .append("path")
          .attr("class", function(d) {
            var city_name;
            if ((cities.indexOf(d["properties"]["name"]) <= -1) && (d["properties"]["metadata"]["city"] == "los-angeles")) {
              city_name = "Los Angeles";
            } else {
              city_name = d["properties"]["name"];
            }

            return "path_"+city_name.replace(/ /g, "_");
          })
          .style("fill", function(d) {
            if (d["properties"]["metadata"]["city"] == "los-angeles") {
              return color_smap(morning_peak["Los Angeles"]);
            } else {
              return (cities.indexOf(d["properties"]["name"]) > -1) ? color_smap(morning_peak[d["properties"]["name"]]) : "white";
            } 
          })
          .style("stroke", "gray")
          .style("stroke-width", 1)
          .style("fill-opacity", 0.5)
          .attr("d", path_smap);
        
        map2.selectAll("path")
          .data(json["features"])
          .enter()
          .append("path")
          .attr("class", function(d) {
            var city_name;
            if ((cities.indexOf(d["properties"]["name"]) <= -1) && (d["properties"]["metadata"]["city"] == "los-angeles")) {
              city_name = "Los Angeles";
            } else {
              city_name = d["properties"]["name"];
            }

            return "path_"+city_name.replace(/ /g, "_");
          })
          .style("fill", function(d) {
            if (d["properties"]["metadata"]["city"] == "los-angeles") {
              return color_smap(evening_peak["Los Angeles"]);
            } else {
              return (cities.indexOf(d["properties"]["name"]) > -1) ? color_smap(evening_peak[d["properties"]["name"]]) : "white";
            } 
          })
          .style("stroke", "gray")
          .style("stroke-width", 1)
          .style("fill-opacity", 0.5)
          .attr("d", path_smap);
        
        map3.selectAll("path")
          .data(json["features"])
          .enter()
          .append("path")
          .attr("class", function(d) {
            var city_name;
            if ((cities.indexOf(d["properties"]["name"]) <= -1) && (d["properties"]["metadata"]["city"] == "los-angeles")) {
              city_name = "Los Angeles";
            } else {
              city_name = d["properties"]["name"];
            }

            return "path_"+city_name.replace(/ /g, "_");
          })
          .style("fill", function(d) {
            if (d["properties"]["metadata"]["city"] == "los-angeles") {
              return color_smap(daytime["Los Angeles"]);
            } else {
              return (cities.indexOf(d["properties"]["name"]) > -1) ? color_smap(daytime[d["properties"]["name"]]) : "white";
            } 
          })
          .style("stroke", "gray")
          .style("stroke-width", 1)
          .style("fill-opacity", 0.5)
          .attr("d", path_smap);
        
        map4.selectAll("path")
          .data(json["features"])
          .enter()
          .append("path")
          .attr("class", function(d) {
            var city_name;
            if ((cities.indexOf(d["properties"]["name"]) <= -1) && (d["properties"]["metadata"]["city"] == "los-angeles")) {
              city_name = "Los Angeles";
            } else {
              city_name = d["properties"]["name"];
            }

            return "path_"+city_name.replace(/ /g, "_");
          })
          .style("fill", function(d) {
            if (d["properties"]["metadata"]["city"] == "los-angeles") {
              return color_smap(nighttime["Los Angeles"]);
            } else {
              return (cities.indexOf(d["properties"]["name"]) > -1) ? color_smap(nighttime[d["properties"]["name"]]) : "white";
            } 
          })
          .style("stroke", "gray")
          .style("stroke-width", 1)
          .style("fill-opacity", 0.5)
          .attr("d", path_smap);

      });
    });
  }

}
