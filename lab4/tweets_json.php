<?php
require 'tmhOAuth.php'; // Get it from: https://github.com/themattharris/tmhOAuth

// php file used to get twitter api authentication; Get it from:https://gist.github.com/planetoftheweb/5914179
// Use the data from http://dev.twitter.com/apps to fill out this info
// notice the slight name difference in the last two items)

$connection = new tmhOAuth(array(
  'consumer_key' => 'gKpkmA3Eq8PUrGl1zxdD0Wpkk',
	'consumer_secret' => 'OURMDNh466PWn0RCNEzLaw2VMwgclTu9ePt1GmJb9Vo0QU6omQ',
	'user_token' => '2463305354-UC04mClTPzpUQcxcbYFpQ4JrILwmkRfGlJ5rRKb', //access token
	'user_secret' => 'rl00v8q8539Wuq0c2QDM9EAxKdUbNIuH6z3PfdREh8aHD' //access token secret
));

$twitter_path = '1.1/statuses/user_timeline.json';
$http_code = $connection->request('GET', $connection->url($twitter_path) );

if ($http_code === 200) { // if everything's good
	$response = strip_tags($connection->response['response']);
	
	echo $response;	
} else {
	echo "Error ID: ",$http_code, "<br>\n";
	echo "Error: ",$connection->response['error'], "<br>\n";
}

// You may have to download and copy http://curl.haxx.se/ca/cacert.pem