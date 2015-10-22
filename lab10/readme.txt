Lab 10 – Lets look at some of the data - Visualizations
Name: Sicong Zhao
RCS: zhaos4

To run the app,
1. Installed node.js, (package.json provided, run npm install to download node_modules, which is also already provided in the file)
2. Run mongodb first, do: mongod --dbpath /Users/Amy/node_modules/mongo, (where you installed mongodb).
3. In command line go to directory then do : npm start
4. In browser go to : localhost:3000
5. You will see the landing page in the index.html.
6. Home page, build mongo db page and read tweets page are the same as lab9 (though I fixed some layout bugs in show tweets page from lab9). As before, click build mongo db button first is required before any other steps.
7. Go to the visualize page from sidebar, their are three buttons below:
	a. Bubble Chart, which shows the language of tweets, you can also click each bubble to interact with it.
	b. Calendar View, which shows the dates each tweet was created at, from 2014 to 2015, though not very specific because I don’t have enough tweets in my twitter. 
	c. Map View, which shows the geolocation of each tweet. The size of each cycle reflects the friend counts of each tweet. As you can see, NY has the most friends counts, then comes LA.

Notes:
1. Used D3 library, most examples were referenced from http://bl.ocks.org/mbostock 
2. Used the bootstrap landing page template, referenced from http://startbootstrap.com/template-overviews/business-casual
3. All pages are responsive, and the hashtags will go below when screen is less than 400px.


References:
http://www.stackoverflow.com
http://www.w3schools.com
http://bl.ocks.org/mbostock
