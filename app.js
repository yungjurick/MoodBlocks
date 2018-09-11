//Set up requirements
var express = require("express");
var Request = require('request');
var bodyParser = require('body-parser');
var _ = require('underscore');
var MobileDetect = require('mobile-detect');

//Create an 'express' object
var app = express();

//Set up the views directory
app.set("views", __dirname + '/views');
//Set EJS as templating language WITH html as an extension
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
//Add connection to the public folder for css & js files
app.use(express.static(__dirname + '/public'));

// Enable json body parsing of application/json
app.use(bodyParser.json());

/*---------------
//DATABASE CONFIG
----------------*/
var cloudant_USER = 'eea7206c-d25d-42af-a6c2-50af642e73cd-bluemix';
var cloudant_DB = 'emotions';
var cloudant_KEY = 'proomentleectonliverepre';
var cloudant_PASSWORD = 'a46d248029d60be182bab517ae41c8024ece4fc7';

var cloudant_URL = "https://" + cloudant_USER + ".cloudant.com/" + cloudant_DB;

/*-----
ROUTES
-----*/

//Main Page Route - Show ALL data via Clientside Request
app.get("/", function(req, res){
	var userAgent = req.headers['user-agent'];
	var md = new MobileDetect(userAgent);
	if (md.mobile() === null) {
		console.log("Desktop Page");
		res.render('index', {page: 'good to go!'});
	} else {
		console.log("Mobile Page");
		res.render('index-mobile', {page: 'good to go!'});
	}
});

app.get("/dataPage", function(req, res){
	res.render('data-page', {page: 'good to go!'});
});

app.get("/mobile-page", function(req, res){
	res.render('index-mobile');
});

app.get("/about", function(req, res){
	res.render('about');
});


//SAVE an object to the db
app.post("/save", function(req,res){
	console.log("A POST!!!!");
	//Get the data from the body
	var data = req.body;
	console.log(data);
	//Send the data to the db
	Request.post({
		url: cloudant_URL,
		auth: {
			user: cloudant_KEY,
			pass: cloudant_PASSWORD
		},
		json: true,
		body: data
	},
	function (error, response, body){
		if (response.statusCode == 201){
			console.log("Saved!");
			res.json(body);
		}
		else{
			console.log("Uh oh...");
			console.log("Error: " + res.statusCode);
			res.send("Something went wrong...");
		}
	});
});

//JSON Serving route - ALL Data
app.get("/api/all", function(req,res){
	console.log('Making a db request for all entries');
	//Use the Request lib to GET the data in the CouchDB on Cloudant
	Request.get({
		url: cloudant_URL+"/_all_docs?include_docs=true",
		auth: {
			user: cloudant_KEY,
			pass: cloudant_PASSWORD
		},
		json: true
	},
	function (error, response, body){
		console.log(body);
		var theRows = body.rows;
		//Send the data
		res.json(theRows);
	});
});

//Catch All Route
app.get("*", function(req, res){
	res.send('Sorry, nothing doing here.');
});

// Start the server
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started on port ' + port);
