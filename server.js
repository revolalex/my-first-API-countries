// launch => npm start
// module
const express = require("express");
const bodyParser = require("body-parser"); // use to parse the body in Json Format

const app = express();

// import helper class containing all functions CRUD (Create(post) Read(get) Update(put) Delete)
const Utils = require("./utilis/utils.js");

// middlewear allows  us to support different format
app.use(bodyParser.json()); // use by req.body property (to have key value)
app.use(express.urlencoded({ extended: true }));

// this is router where we handle our various routes, we pass app and Utils modules to it
require("./routes/routes.js")(app, Utils);

app.listen(8080);

console.log("http://localhost:8080/"); // step 1
console.log("http://localhost:8080/teachersName"); // step 2
console.log("http://localhost:8080/country/"); // step 4 and step 9
console.log("http://localhost:8080/names/all"); // step 5
console.log("http://localhost:8080/names/allMap"); // step 6
console.log("http://localhost:8080/capitals/all"); // step 7
console.log("http://localhost:8080/capitals/allMap"); // step 8
console.log("http://localhost:8080/regions/"); // step 10
console.log("http://localhost:8080/subregions/"); // step 11
console.log("http://localhost:8080/currencies/"); // step 12
console.log("http://localhost:8080/countries/"); // step 14
