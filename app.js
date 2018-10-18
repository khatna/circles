var express = require("express");
var app     = express();

// serving favicon
var favicon = require('serve-favicon');

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(favicon(__dirname + '/public/imgs/favicon.ico'));

app.get("/", function(req, res) {
	res.render("circles");	
});

// redirect to main page
app.get("/*", function(req, res) {
	res.redirect("/");	
});

app.listen(process.env.PORT, process.env.IP);
