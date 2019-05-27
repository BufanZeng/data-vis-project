# INF 554 Project

## Presentation transcript

### 1. Team information
- Project name: Traffic Collision Visualization

- Team name: Team OWL

- Members
  - Bufan Zeng (bzeng@usc.edu)
  - Wing Wa Leung (wingwale@usc.edu)
  - Yunwei Zhang (yunweizh@usc.edu)

### 2. Introduction
- Our project is about the traffic collisions in Los Angeles. As the traffic is heavy in this city, we wish to use the information visualization skills learned from this course to explore the trend and gain insight about the traffic collision.

- We will demonstrate the story of our data using several types of charts and from various perspectives.

### 3. Datasets
- Our dataset is from [**Los Angeles Open Data**](https://data.lacity.org/) and the specific dataset is **Traffic Collision Data from 2010 to Present**.

- We used the time, geographical and demographical attributes from this dataset to implement our visualizations.

- We also used GeoJSON file of L.A. county map from [**Los Angeles Times**](http://boundaries.latimes.com/sets/), which is **"L.A. County Neighborhoods (V6)"**.

### 4. Related work
- Others have visualized traffic accidents data in [New York City](https://interworks.com/blog/modonnell/2015/08/26/exploring-nyc-vehicle-crash-data-tableau/) and [across the nation](https://towardsdatascience.com/what-i-learned-from-analyzing-and-visualizing-traffic-accidents-data-7cd080a15c15).

- They have used chart formats such as choropleth map, proportional symbol map and bar chart.

- Since most of them are static, and little work have been found on visualizing similar data in Los Angeles, we are motivated to implement interactive visualizations in our project.

### 5. Originality
- From other's work, we also notice the lack of interconnectivity between visualization forms.

- Therefore, we integrated more chart forms so that we can present more perspectives to audiences at once. 

- Interactive charts also facilitate them to freely and fully explore analyzed data.

### 6. Design process
- We start with an overview, which is a line chart expressing the total count of each month's traffic collisions.

- Then we have choropleth maps with small multiples and a slope graph to show the trend of each day's collisions.

- Lastly, we have a bar chart and an alluvial diagram to show some demographic findings.

### 7. Line chart 1
- The line chart shows the number of traffic collisions for each month, from January 2010 to October 2018. 
(It gives audiences a general idea about traffic collisions in Los Angeles.)

- Each year is a line. From the line chart, it shows that the number of traffic collisions generally increases by year. 

### 8. Line chart 2
- The line chart also shows that March and October of each year tend to have more traffic collisions than other months and Feburary usually has the least number of accidents among all months in a year.

- (Users can click the data points to show or hide values. )

### 9. Choropleth maps 1
- The big choropleth map on the left shows the total count of collisions for each city. We used diverging color scheme with 4 discrete colors to express the difference. 

- The dataset has some ambiguous locations but we tried our best to use "uszipcode" Python library to work out the cities. It turns out many accidents are located in "Los Angeles city" so we can see most part of L.A. is marked red.  

### 10. Choropleth maps 2
- We further divide the data into 4 periods of time and present them as small multiples. The right-hand side shows the hourly accident by rank.

- We can clearly see that the peak hours have more hourly accidents than other times and the evening peak has the most severe accident rate.

### 11. Slope graph
- The slope graph compares different time periods during the day. We divided the data into two parts. First one is the two rush hours' comparison and the second one is for the rest hours.

- From the graph we can see for most cities, the evening peak has more accidents than morning peak. Daytime has more accidents than nighttime.

### 12. Bar chart 1
- Now we have some broad idea and trends of the traffic, we are also interested in some demographic info. We choose the gender and age groups as our attributes and made a bar chart like this.

- The buttons at top can help audiences navigate the different age groups, and the bar chart itself is stacked with gender info. Again, the data is the cumulative count.

### 13. Bar chart 2
- From the bar chart, we can observe that at age group 20-30, people tend to involve significantly more in accidents. Meanwhile, males always have higher amount than females does.

### 14. Alluvial diagram
- We also put an alluvial diagram in the end showing some relations about some features, like gender, age groups, accident time and locations.

### 15. Visualization Implementations
- To let audiences better interact with our charts. We implemented some features like highlighting, tooltips, transitions of axis, diverging color scheme and font sizes to better deliver the visualization findings.

### 16. Technologies used
- Python
- Microsoft Excel
- D3
- Bootstrap
- Angular
- CSS
- HTML
- JavaScript

### 17. Possible improvements
- If there's more time for improvements, we may try to add more layers to our charts to make them more complex and informative. Besides layers, we could also integrate some animations that relates to time series to make the change of trends more straightforward to audiences. (Moreover, we can import more datasets)

### 18. Challenges
- Data quality for some charts are not as expected, for example, the dataset doesn't have a city attribute but the GeoJson requires it to implement.

- Data cleaning and engineering takes a lot of time because we need different datasets for each perspective. Furthermore, integrating other features is time consuming.

### 19. Divison of work
- Bufan Zeng: data cleaning and engineering, bar chart and allusive diagram, report

- Wing Wa Leung: choropleth maps, slope graphs, setting up project schema (Angular)

- Yunwei Zhang: using Excel to get the number of traffic collisions for each month of each year and use a tsv document to draw the line chart with interactive actions and responsive effect

### 20. What we have learned
- After completing this project, we learned both the techinical skills to build charts for information visualization with design considerations and some interesting facts about traffic collisions in Los Angeles.
