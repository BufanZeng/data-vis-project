# INF 554 Assignment 5

This assignment is to create a Sozi presentation to present the project proposal.

### 1.	Team information
- Project name: Traffic Collision Visualization
- Team name: Team OWL
- Members
  - Bufan Zeng (bzeng@usc.edu)
  - Wing Wa Leung (wingwale@usc.edu)
  - Yunwei Zhang (yunweizh@usc.edu)

### 2.	Project background
- Living in LA, the traffic is heavy at most times and almost everyone needs to use cars for commuting purpose. There is an average of around 100 car accidents per day.We want to explore this data set to find some insights about the traffic.
- **(Less than) 10 words why we chose this project**: Explore insights about traffic collisions in Los Angeles

### 3.	Why choose this project
- Using data visualization, we can extract the information from the dataset to help us better understand the car collisions in Los Angeles. Hopefully we can let audiences know better about the traffic and let them arrive their destinations safer.

### 4.	Target audiences
- Our target audiences are the commuters. However, basically everyone in this city can gain some insights about the traffic after having our visualization.

### 5.	The dataset
- Our dataset is from https://www.data.gov/ and the specific dataset is [**Traffic Collision Data from 2010 to Present**](https://catalog.data.gov/dataset/traffic-collision-data-from-2010-to-present)
- In the dataset, there are attributes that can be useful for time series like "Date Occurred", "Time Occurred"; some attributes like "Area ID", "Area Name" are good for building up cartograms;
bar charts can be built using "Victim Age", "Victim Sex" and "Victim Descent".
- The data is 435k entries * 18 features.

### 6.	Technologies to be used
- D3
- Bootstrap
- Google Maps Platform
- CSS
- HTML
- JavaScript

### 7.	Others' works
- Others have visualized traffic accidents data in [New York City](https://interworks.com/blog/modonnell/2015/08/26/exploring-nyc-vehicle-crash-data-tableau/) and [across the nation](https://towardsdatascience.com/what-i-learned-from-analyzing-and-visualizing-traffic-accidents-data-7cd080a15c15).
- They have used various chart formats including choropleth map, proportional symbol map and bar chart.
- Since all of them are static, and little works have been found on visualizing car collision data in Los Angeles, we are motivated to implement interactive visualizations for such data.

### 8.	Design considerations
- For the design considerations, we want to design a HTML that presents complex data concisely and can be easily understood by our audiences.
- To serve this purpose, we will adjust our theme, color, interactive tools accordingly and consider accessibility issues.

### 9.	Plans to design, build and evaluate
- We plan to design time series charts, cartograms and bar charts with interactive features.
- We will build robust visualizations using the technologies mentioned before.
- We will evaluate the graphics against the visualization wheel, improving them to more complex and deeper side of the wheel.

### 10.	Use of interactive visuals
- Querying/filtering feature such as using victim gender or descent and years for time series.
- Show numberic values and explanations when moving mouse over the charts.
- Autoplay time series.

### 11.	Potential risks
- Data quality: if the data quality is poor, our visualization might be meaningless.
- Underestimate workload: implementing the interactive features can be difficult.

### 12.	Deliverables
- An HTML webpage
- A video introducing the visualizations
- A paper written in the LNCS format

### 13.	Timeline 
- Week -2 ~ week -1: Clean data prototype with 3 charts
- Week 1 ~ week 2: Interactive features
- Week 3 ~ week 4: Finalizing deliverables

### 14.	Teamwork
- One chart for each member.
- Combine charts into one html and add other features together.

### 15.	Wrap up