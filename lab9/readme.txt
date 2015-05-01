Lab 9 – Putting it all together
Name: Sicong Zhao
RCS: zhaos4

To run the app,
1. Installed node.js, (package.json provided, run npm install to download node_modules, which is also already provided in the file)
2. Run mongodb first, do: mongod --dbpath /Users/Amy/node_modules/mongo, (where you installed mongodb).
3. In command line go to directory then do : npm start
4. In browser go to : localhost:3000
5. You will see the landing page in the index.html
6. Click the Build button above to go to the build mongo db page.(Notice that for the first time login, you will always need to build mongo db first. Otherwise you will get an alert from the server.)
7. Click the Read button above to go to the read tweets page. Input the number of tweets you want to read, the page will redirect to the tweet ticker which is involved from lab1.(CSS file still have a little issue at the first 1 sec when tweets appears. Then seems to be okay after 1sec. It may be caused by using bootstrap framework later in this lab while in lab1 I didn’t use that.)
8. Click the Create button above to go to the create csv file page. If the given name is already exists in the server, you will get an alert that the file is overwritten now.（ You can test this error handling by input “test”, which is already given in the folder.)


Notes:
1. Used the bootstrap landing page template, referenced from http://startbootstrap.com/template-overviews/business-casual
2. All pages are responsive, and the hashtags will go below when screen is less than 400px.
3. In the show tweets page, all tweets and functions are reloaded every 60 secs. It re-built the mongo db by re-reading the data from twitter api and re-building the json file.


References:
http://www.stackoverflow.com
http://www.w3schools.com
