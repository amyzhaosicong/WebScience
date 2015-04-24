Lab 8 – node.js SPARQL & RDF
Name: Sicong Zhao
RCS: zhaos4

To run the app, 
1. Installed node.js. (package.json file provided, run npm install to download node_modules, which is also already included in the file)
2. In command line go to directory then do : npm start
3. In browser go to : localhost:3000
4. Input the tested query: 
	a. In the Select field, input *
	b. In the From field, input <http://dbpedia.org> 
	c. In the Where field, input { ?book <http://dbpedia.org/ontology/literaryGenre> ?genre. ?book <http://dbpedia.org/property/author> ?author} LIMIT 10
	d. So that the input query shown in the page should be like this:
	SELECT * FROM <http://dbpedia.org> WHERE { ?book <http://dbpedia.org/ontology/literaryGenre> ?genre. ?book <http://dbpedia.org/property/author> ?author} LIMIT 10
5. Then click the Execute the query button
6. You will get the results data each with a link in a table shown below in the page. 
7. In the example query, it returned a list of books including their genres and authors.
(Note: Few links are default because the returned data from web is literal type instead of uri type.)

Notes:
Used JQuery Mobile in the front-end to make the page mobile and responsive, 
Used AngularJS in the middle tier including ng-repeat function so that the output data could always fit in the page.
Used sparql-client API to connect Sparql data and execute input query.

Collabrators:
TA: Ahmed Eleish; Classmates: Luying Wen

References:
http://www.stackoverflow.com
http://www.w3schools.com
https://github.com/thomasfr/node-sparql-client
https://angularjs.org
https://jquerymobile.com