Lab 6 - node.js, tweets.json to CSV
Name: Sicong Zhao
RCS: zhaos4

To run the app,
1. Installed node.js, (package.json provided, run npm install to download node_modules, which is also already provided in the file)
2. In command line go to directory then do : npm start
3. In browser go to : localhost:3000
4. Input the name of csv file, and click the “Get CSV file” button to download the converted file, which will be in the default folder of your download path. The web page will tell users that the new file is downloading included the created file name.
5. Tested with error handlings:
a. As a “test.csv” file is already included in given folder, so if input is “test”, then an alert will show telling users that “Whoops, the tweets csv file already exists. Overwriting it…”, then the “test.csv” file will be overwritten.
b. If in the main.js file line 11 we change get(“tweets.json”) into get(“tweets2.json”), which is not exists in the given folder, then another alert will show telling users that “Whoops, the json file tried to convert does not exist.”, and the following conversion will not be executed.
6. Added Show Header in csv file as a checkbox to see if the converted file concludes a header. 

References:
http://www.stackoverflow.com
http://www.w3schools.com
http://expressjs.com
https://www.npmjs.com/package/twitter
https://nodejs.org/api/fs.html#fs_file_system
http://jsfiddle.net/hybrid13i/JXrwM/
https://docs.angularjs.org/api/ng/input/input%5Bcheckbox%5D
