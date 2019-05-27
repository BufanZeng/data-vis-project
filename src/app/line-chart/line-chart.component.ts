import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    d3.select(window).on('resize',resize)
    function resize(){
      d3.select("#linechart").selectAll("*").remove(); //needed. otherwise, have to refresh page to resize effect
      var margin={top:100,bottom:20,left:80,right:50};
      var width=parseInt(d3.select("#linechart").style('width'))-margin.left-margin.right;
      var height=560-margin.top-margin.bottom;

      var parseData = d3.timeParse("%m")//.parse;
      var color= d3.scaleOrdinal(d3.schemeCategory10);
      var x=d3.scaleTime().range([0,width]);
      var y=d3.scaleLinear().range([height,0]);
      //axes codes
      var xAxis = d3.axisBottom(x)
                    // .tickFormat(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])
                    .ticks(d3.timeMonth.every(1)) //every(1) for every month; if every(2) stands for Jan, Mar
                    .tickFormat(d3.timeFormat("%b")); //%b stands for month; if %a stands for Mon to Sun
      //.ticks and .tickFormat needed to show month names for x axis. Otherwise, January could not be shown out. 
      var yAxis = d3.axisLeft(y).ticks(20);

      var line = d3.line()
                   .defined(function(d) { return d['fertirate'] != 0; }) //not cosider non-documented 2018 Nov&Dec
                   .x(function(d) { return x(d['month']);})
                   .y(function(d) { return y(d['fertirate']);});
	
      var svg = d3.select("#linechart").append("svg")  //#linechart
                  .attr("width",width+margin.left+margin.right)
                  .attr("height",height+margin.top+margin.bottom)
                  .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      //read tsv
      d3.tsv("./assets/new.tsv").then(function(data) {
        var dnames=[];
        color.domain(d3.keys(data[0])
             .filter(function(key) {
               if(key!="month"){
                    dnames.push(key);
					return key;}		
			 })); //filter end bracket

        // spacing for the legend
        var legendSpace = width/10 //9 years plus 1	

        var month = [];
        data.forEach(function(d: any) {
           d['month'] = parseData(d['month']);
          // month.push(parseData(d['month']));
        });
        // console.log(month)

        var years = color.domain()
			             .map(function (name) {
			                return {
			                    name : name,
			                    values : data.map(function (d) {
			                        return {month: d.month, fertirate: +d[name]};})
			                };
	                     });

        x.domain(d3.extent(data, function(d: any) { return d['month']; }));
        // x.domain(month);
        y.domain([3300,5300]);
        svg.append("g")
           .attr("class", "x axis")
           .attr("transform", "translate(0,"+ height + ")")
           .call(xAxis)

        svg.append("g")
           .attr("class", "y axis")
           .call(yAxis)
           .append("text")
           .attr("transform", "rotate(-90)")
           .attr("x",16) //vertical; larger number upper-not-seen
           .attr("y", 10) //horizontal
           .attr("dy", ".35em")
           .style("text-anchor", "end")
           .style("fill","black") //needed since set fill to none for other code upper
           .style("font-size","10px")
           .text("Number of Traffic Collision");
        years.forEach(function(d:any, i) {
          //legend         
	        svg.append("text") //x,y,font-size---> if width<=460, no header legend show
               .attr("x", function(){ if (width>460){
                var a=(legendSpace/2)+i*legendSpace;
                return a;} else {return 0;}
                })  // space legend
               .attr("y", function(){ if (width>460){ 
                 return margin.top-140;} else {return 0;}
               })
               .attr("class", "legend")   // style the legend
               .style("font-size",function(){ if (width>460){
                return "23px";} else {return 0;}
                })
               .style("fill", function() { // Add colors to header legends
                return d['color'] = color(d.name); 
               })
			        .attr("text-decoration","underline")
	           .on("click", function(){
                // Determine if current line is visible 
                var active   = d['active'] ? false : true,
                newOpacity = active ? 0.2: 1;
				var color = active ? "grey" : d['color'];
				var circleradius=active ? 0 : 4.5;
				
				d3.selectAll(".tooltip").remove();
				 
				 d3.select(this).transition().duration(100)
                    .style("opacity", newOpacity);
				
                // Hide or show the elements based on the ID
                d3.select("#tag"+d.name.replace(/\s+/g, ''))
                    .transition().duration(100) 
                    .style("opacity", newOpacity); 

	            d3.selectAll("g")
		          .selectAll(".series"+d.name.replace(/\s+/g, ''))
		          .selectAll("circle")
		          .attr("r",circleradius); //needed so that when hiding line, points also hidden
		
		        d3.selectAll("g").selectAll("circle").style("stroke-width",0); 

                // Update whether or not the elements are active
                d['active'] = active;
              }) //.on(click) end bracket 
               .text(d.name); 
            svg.append("path")
               .attr("class", "line")
               .attr("d", line(d.values))
               .style("stroke", d['color'])
               .style("fill", "none")
             .attr("id", 'tag'+d.name.replace(/\s+/g, '')); // assign ID 
 
        }); //years.forEach end bracket
        ///}); read once tsv

        //points code
        var z = d3.scaleOrdinal(d3.schemeCategory10);
        ///d3.tsv("new.tsv").then(function(data) {

        var seriesNames = d3.keys(data[0])
                            .filter(function(key) { 
                              if(key!="month"){
		                        return key;
                              } 
                            });

        // Map the data to an array of arrays of {x, y} tuples.
        var series = seriesNames.map(function(series) {
            return data.map(function(d, i) {
                return {x: +d.month, y: +d[series], yname: seriesNames[i]};
            });
        });

        var yname1 = 0;
        var nnt = 0;

        // Add points
        svg.selectAll(".series")
           .data(series)
           .enter().append("g")
           .attr("class", function(d, i) { 
               var yname1=seriesNames[i];
               return "series"+yname1.replace(/\s+/g, ''); 
            })
           .style("fill", function(d, i:any) { return z(i); })
           .selectAll(".points")
           .data(function(d) { return d; })
           .enter().append("circle")
           .attr("id", function(d, i) {var temp = "points" + nnt; nnt = nnt + 1; return temp;  })
    
           .attr("cx", function(d) { return x(d.x); })
           .attr("cy", function(d) {return y(d.y)})
           .attr("r", 4)
	       .style("stroke","black")
	       .style("stroke-width",0)
	       .on("click", function(d){
		       var active   = d['active'] ? false : true,
               newOpacity = active ? 0 : 1;
		       var strokeWidth = active? 2:0;
		       d3.select(this).transition().duration(300).style("stroke-width",strokeWidth);
		       var id = (this['id'])
		
		      if(active == true) {			
		        //append div for tooltip
		        var div= d3.select("#linechart").append("div")	
				            .attr("class", "tooltip")				
				            .attr("id", "div" + id)
				            .style("opacity", 1);
				
                // div.html("month: "+d.x+"<br>"+"Incident Number: " + d.y)	
                //must read tsv again to call d.x; code upper
                div.html(d['y'].toString())
                   .style("left", (d3.event.pageX) + "px")		
                   .style("top", (d3.event.pageY-24) + "px");		
	          }
		      else{
			    var temp = "#div" + id.replace(/ +/g,"");
                d3.selectAll(temp).remove(); 
              }
			  d['active'] = active;
	       }); //on click end bracket
      });  //read tsv end bracket


    } //function resize() end bracket
    resize()

  }//ngOnInit end bracket

}
