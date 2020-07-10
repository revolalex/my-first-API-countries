// module
var express = require("express");
var fs = require("fs");
var app = express();

// step 4
const jsonData = require("./country.json");
// let dataString = JSON.parse(data)

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

function capitalOfCountry() {
  let countryCapitals = [];
  for (i = 0; i < jsonData.length; i++) {
    countryCapitals.push(jsonData[i].capital);
  }
  return countryCapitals;
}

function regionsName(input) {
  let regionsOfcountry = [];
  for (i = 0; i < jsonData.length; i++) {
    if (jsonData[i].region == input) {
      regionsOfcountry.push(jsonData[i].name);
    }
  }
  return regionsOfcountry;
}


//step 1
app.get("/", function (req, res) {
  res.status(200).send("Vous êtes à laccueil");
});

// step 2
app.get("/teachersName", function (req, res) {
  // res.status(200).send({ thomas: "Thomas Jamais", alban: "Alban Meurice" });
  res.status(200).json({ thomas: "Thomas Jamais", alban: "Alban Meurice" });
});

// step 4
app.get("/country", function (req, res) {
  res.status(200).send(jsonData);
});

// step 5
app.get("/names/all", function (req, res) {
  res.status(200).json(nameOfCountry());
});

// step 6
app.get("/names/allMap", function (req, res) {
  const paysMap = jsonData.map((pays) => {
    return pays.name;
  });
  res.json(paysMap);
});

// step 7
app.get("/capitals/all", function (req, res) {
  res.status(200).json(capitalOfCountry());
});

//step 8
app.get("/capitals/allMap", function (req, res) {
  const capitalMap = jsonData.map((capital) => {
    return capital.capital;
  });
  res.status(200).json(capitalMap);
});

//step 9
app.get("/country/:name", function (req, res) {
  let userInput = req.params.name;
  const inputSensitive = userInput.charAt(0).toUpperCase() + userInput.slice(1).toLowerCase();
  var myitem = null;
  jsonData.forEach((item) => {
    if (item.name == inputSensitive) {
      myitem = item;
    }
  });
  if (myitem == null) {
    res.status(404).send("it's not a country");
  } else {
    res.status(200).json(myitem);
  }
});

//step 10
app.get("/regions/:regionName", function (req, res) {
  let userInput = req.params.regionName;
  // first letter is upper the other lower
  const inputSensitive = userInput.charAt(0).toUpperCase() + userInput.slice(1).toLowerCase();
  const regionArray = ["Africa", "Asia", "Europe", "Oceania", "Americas"];
  if (regionArray.includes(inputSensitive) == true) {
    res.status(200).json(regionsName(inputSensitive));
  } else {
    res.status(404).send("it's not a region");
  }
});

// step 11
app.get ("/subregions/:subregionsName", function (req, res){
  let userInput = req.params.subregionsName;
  const inputSensitive = userInput.charAt(0).toLocaleUpperCase() + userInput.slice(1).toLowerCase();
  var subregionArray = [];
  // check in jsonData if the user input exist if yes add the country to subregionArray
  jsonData.forEach((item) =>{
    if (item.subregion == inputSensitive){
      subregionArray.push(item.name)
    }
  });
  if(subregionArray.length > 0){
    res.status(200).send(subregionArray)
  } else{
    res.status(404).send("it's not a subregion")
  }
});

// step 12
app.get ("/currencies/:currency", function (req, res){
  let userInput = req.params.currency;
  let userInputUpper = userInput.toUpperCase()
  var currenciesArray = [];
  // check in jsonData if the user input exist if yes add the country to subregionArray
  jsonData.forEach((item) =>{
    if (item.currencies[0].code == userInputUpper){
      currenciesArray.push(item.name)
    }
  });

  if(currenciesArray.length > 0){
    res.status(200).send(currenciesArray)
  } else{
    res.status(404).send("it's not a currencies")
  }
});

// step 14

app.put("/countries/:countryName", function (req, res){
  const inputUser = req.params.countryName;
  const data = req.body;

  res.json({
    data : hdg

  })

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
console.log("http://localhost:8080/subregions"); // step 11
console.log("http://localhost:8080/currencies/"); // step 12
