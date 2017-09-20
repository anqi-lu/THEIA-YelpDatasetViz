# WebwareFinalProject


Yelp Dataset Visualization
For WPI CS4241 Final Project
Group Member: Anqi Lu, Ziyan Ding
Purpose of learning how to utilize D3.js and data processing

=====================================================================
### completed tasks:
- [x] Use express framework to route the files
- [x] Use Bootstrap template to create a clean and model UI
- [x] Connect to Yelp API and extract data
- [x] Used D3 for visualization
- [x] Display the extracted data
- [x] Read and parse cities and business categories
- [x] Implement zoomable treemap for city and categories
- [x] Count checkin data for given city, category and return top 10
- [x] Programmatically write checkin data for each subcategory into files
- [x] Implement bubble chart from top 10 businesses
- [x] Implement zoom to domain diagram from each business's checkin data

###Usage:
- [x] Navigation Bar:
		- Jump to the matched session
- [x] Search:
		- Input a location to do simple search
		- It generates 20 top best matched businesses
		- Then you can add up to three business to comparing list(choosing more will cause an alert)
		- Then it will generates the table with multiple businesses' features
- [x] Advanced Search:
		- Input a location
		- Input term like food, restaurants
		- Input price from 1 to 5 (cheapest to most expensive)
		- Choose how you want the list to be sorted
		- Then it is same as simple search
		- Both search pull the data through Yelp API. Through "search", "business search" and "review search" which grouped by business ID to get full list of
		business infomation and three reviews
- [x] Treemap:
		- Shows the category distribution in 6 cities, data provided by Yelp dataset
		- Zoomin by clicking on subrectangle
		- Zoomout by clicking on top bar
- [x] Bubble Chart:
		- When reaching the last level of Treemap(no subgroup anymore), clicking on the rectangle will generate the top 10 individual business in bubble chart
		- Click on bubble chart will generate the chart with checkin distribution
		- The checkin distribution chart can be zoom in from weekday to hours
