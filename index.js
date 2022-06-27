/*const express = require('express');
const hbs = require('hbs');
const routes = require('./routes/routes.js');
const db = require('./models/db.js');
const app = express();
const port = 9090;
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/', routes);
app.use(function (req, res) {
    res.render('error');
});
db.connect();
app.listen(port, function () {
    console.log('app listening at port ' + port);
});*/

const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./routes/routes.js");
const db = require("./models/db.js");
const app = express();
const port = 3000;
app.set("view engine", "hbs");
app.engine("hbs", exphbs.engine({extname: "hbs"}));
//exphbs.registerPartials(__dirname + "/views/partials");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use("/", routes);
/*app.use(function (req, res) {
    res.render('error');
});*/
db.connect();
app.listen(port, function() {
    console.log("Listening to port " + port);
});