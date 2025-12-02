/*************************************************************************************

**************************************************************************************/

//import modules
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const path = require("path");
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importing routes
const generalController = require('./controllers/general');

app.use('/', generalController);

// not found error
app.use((req, res) => {
    res.redirect('/error?error=not-found');
});
// internal server error
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.redirect('/error?error=internal-server-error');
});

const HTTP_PORT = process.env.PORT || 8080;
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}
app.listen(HTTP_PORT, onHttpStart);