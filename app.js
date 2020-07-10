// module
var express = require("express");
var bodyParser = require("body-parser"); // use to parse the body in Json Format
var app = express();

// middlewear allows  us to support different format
app.use(bodyParser.json()); // use by req.body property (to have key value)
app.use(express.urlencoded({ extended: true }));

// stock the json file
const jsonData = require("./country.json");

/**
 *@summary this function make a loop inside jsonData and return an array of Country (nomPays)
 */
function nameOfCountry() {
  let countryName = [];
  for (i = 0; i < jsonData.length; i++) {
    countryName.push(jsonData[i].name);
  }
  return countryName;
}

/**
 *@summary this function make a loop inside jsonData and return an array of Capital (countryCapitals)
 */
function capitalOfCountry() {
  let countryCapitals = [];
  for (i = 0; i < jsonData.length; i++) {
    countryCapitals.push(jsonData[i].capital);
  }
  return countryCapitals;
}

/**
 * @summary this function make a loop inside jsonData and return an array of country inside the region
 * @param {*} input =>region
 */
function regionsName(input) {
  let regionsOfcountry = [];
  for (i = 0; i < jsonData.length; i++) {
    if (jsonData[i].region == input) {
      regionsOfcountry.push(jsonData[i].name);
    }
  }
  return regionsOfcountry;
}

/**
 * @param {*} country to modify
 * @param {*} data sent by the user
 * @returns the updated country
 */
function updateCountry(country, data) {
  Object.keys(country).forEach((key) => {
    var value = data[key];
    if (value != undefined) {
      country[key] = value;
    }
  });
  return country;
}

//step 1  => create a route that returns text
app.get("/", function (req, res) {
  res.status(200).send("Vous êtes à laccueil");
});

// step 2 => create a route that returns json format
app.get("/teachersName", function (req, res) {
  // res.status(200).send({ thomas: "Thomas Jamais", alban: "Alban Meurice" });
  res.status(200).json({ thomas: "Thomas Jamais", alban: "Alban Meurice" });
});

// step 4 => create a route that returns json data
app.get("/country", function (req, res) {
  res.status(200).send(jsonData);
});

// step 5 => create a route that returns  all the countries using for loop
app.get("/names/all", function (req, res) {
  res.status(200).json(nameOfCountry());
});

// step 6 => create a route that returns all the countries using map()
app.get("/names/allMap", function (req, res) {
  const paysMap = jsonData.map((pays) => {
    return pays.name;
  });
  res.json(paysMap);
});

// step 7 => create a route that returns all the capital using for loop
app.get("/capitals/all", function (req, res) {
  res.status(200).json(capitalOfCountry());
});

//step 8 => create a route that returns all the capital using map()
app.get("/capitals/allMap", function (req, res) {
  const capitalMap = jsonData.map((capital) => {
    return capital.capital;
  });
  res.status(200).json(capitalMap);
});

//step 9 => create a route that returns the information of a choosen country
app.get("/country/:countryName", function (req, res) {
  let userInput = req.params.countryName;
  console.log(userInput);

  var myitem = null;
  jsonData.forEach((item) => {
    console.log(item.name);
    if (item.name.toLowerCase() == userInput.toLowerCase()) {
      myitem = item;
    }
  });
  if (myitem == null) {
    res.status(404).send("it's not a country");
  } else {
    res.status(200).json(myitem);
  }
});

//step 10 => create a route that returns the coutries inside a choosen region
app.get("/regions/:regionName", function (req, res) {
  let userInput = req.params.regionName;
  // first letter is upper the other lower
  const inputSensitive =
    userInput.charAt(0).toUpperCase() + userInput.slice(1).toLowerCase();
  const regionArray = ["Africa", "Asia", "Europe", "Oceania", "Americas"];
  if (regionArray.includes(inputSensitive) == true) {
    res.status(200).json(regionsName(inputSensitive));
  } else {
    res.status(404).send("it's not a region");
  }
});

// step 11 => need to handle space    => dont work(Southern Europe)  => work(polynesia)
app.get("/subregions/:subregionsName", function (req, res) {
  let userInput = req.params.subregionsName;
  var subregionArray = [];
  // check in jsonData if the user input exist if yes add the country to subregionArray
  jsonData.forEach((item) => {
    if (item.subregion.toLowerCase() == userInput.toLowerCase()) {
      subregionArray.push(item.name);
    }
  });
  // handle error
  if (subregionArray.length > 0) {
    res.status(200).send(subregionArray);
  } else {
    res.status(404).send("it's not a subregion");
  }
});

// step 12 => create a route that returns all the coutries using the same currencies
app.get("/currencies/:currency", function (req, res) {
  let userInput = req.params.currency;
  let userInputUpper = userInput.toUpperCase();
  var currenciesArray = [];
  // check in jsonData if the user input exist if yes add the country to subregionArray
  jsonData.forEach((item) => {
    if (item.currencies[0].code == userInputUpper) {
      currenciesArray.push(item.name);
    }
  });

  if (currenciesArray.length > 0) {
    res.status(200).send(currenciesArray);
  } else {
    res.status(404).send("it's not a currencies");
  }
});

// step 14 => create a route that allows to update the data (put)
app.put("/countries/:countryName", function (req, res) {
  const inputUser = req.params.countryName;
  const data = req.body;
  // use to stock the country target
  var tempCountry = null;
  //loop inside jsonData to find the country
  jsonData.forEach((item) => {
    if (item.name.toLowerCase() == inputUser.toLowerCase()) {
      tempCountry = updateCountry(item, data);
    }
  });
  // handle error
  if (tempCountry != null) {
    res.status(200).json(tempCountry);
  } else {
    res.status(400).send("it's not a country");
  }
});
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
