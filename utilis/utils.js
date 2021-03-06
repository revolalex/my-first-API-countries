// stock the json file
var jsonData = require("../data/country.json");

// module
const jsonfile = require("jsonfile");

// variable
const dataPath = "./data/country.json";

//Model import - Country class
const Country = require("../model/country.js");

class Utils {
  // static method is accesible directly without instance of the class
  static getAll() {
    return jsonData;
  }
  /**
   *@summary this function make a loop inside jsonData and return an array of Country's names (nomPays)
   */
  static getCountriesNames() {
    let countryName = [];
    for (let i = 0; i < jsonData.length; i++) {
      countryName.push(jsonData[i].name);
    }
    return countryName;
  }

  /**
   *@summary this function make a loop inside jsonData and return an array of Capital (countryCapitals)
   */
  static getCapitalOfCountry() {
    let countryCapitals = [];
    for (let i = 0; i < jsonData.length; i++) {
      countryCapitals.push(jsonData[i].capital);
    }
    return countryCapitals;
  }

  /**
   * @summary helper function make a loop inside jsonData and return an array of countries inside the region
   * @param {*} input =>region
   */
  static getCountriesHelper(input) {
    let countriesOfRegion = [];
    for (let i = 0; i < jsonData.length; i++) {
      if (jsonData[i].region == input) {
        countriesOfRegion.push(jsonData[i].name);
      }
    }
    return countriesOfRegion;
  }

  /**
   * @summary get all keys as an array, if sent key is inside this array, update it
   * @param {*} country to modify
   * @param {*} data sent by the user
   * @returns the updated country
   */
  static updateCountry(country, data) {
    Object.keys(country).forEach((key) => {
      var value = data[key];
      if (value != undefined) {
        country[key] = value;
      }
    });
    return country;
  }

  /**
   * @returns all the countries using .map()
   */
  static getCountriesNamesMap() {
    return jsonData.map((pays) => {
      return pays.name;
    });
  }

  /**
   * @returns all the capitals using .map()
   */
  static getCapitalsMap() {
    return jsonData.map((capital) => {
      return capital.capital;
    });
  }

  /**
   * @summary looking for a country by using forEach()
   * @returns the information of a choosen country
   * @param {*} countryName 
   */
  static getCountryByName(countryName) {
    var myitem = null;
    jsonData.forEach((item) => {
      if (item.name.toLowerCase() == countryName.toLowerCase()) {
        myitem = item;
      }
    });
    return myitem;
  }

  /**
   * @summary loop through jsonData and stock in an array the countries inside a choosen region
   * @returns the coutries inside a choosen region
   * @param {*} regionName 
   */
  static getCountriesByRegion(regionName) {
    // first letter is upper the other lower
    const inputSensitiveRegionName =
      regionName.charAt(0).toUpperCase() + regionName.slice(1).toLowerCase();
    let countriesOfRegion = [];

    for (let i = 0; i < jsonData.length; i++) {
      if (jsonData[i].region == inputSensitiveRegionName) {
        countriesOfRegion.push(jsonData[i].name);
      }
    }
    return countriesOfRegion;
  }

  /**
   * @summary loop through jsonData and stock in an array the countries inside a choosen subregion
   * @return the coutries inside a choosen subregion
   * @param {*} subregionName 
   */
  static getCountriesBySubregion(subregionName) {
    var subregionArray = [];
    // check in jsonData if the user input exist if yes add the country to subregionArray
    jsonData.forEach((item) => {
      if (item.subregion.toLowerCase() == subregionName.toLowerCase()) {
        subregionArray.push(item.name);
      }
    });
    return subregionArray;
  }

  /**
   * @returns all the coutries using the choosen currencies
   * @param {*} currency 
   */
  static getCountriesByCurrency(currency) {
    let currencyUpper = currency.toUpperCase();
    var currenciesArray = [];
    // check in jsonData if the user input exist if yes add the country to subregionArray
    jsonData.forEach((item) => {
      if (item.currencies[0].code == currencyUpper) {
        currenciesArray.push(item.name);
      }
    });
    return currenciesArray;
  }

  /**
   * @summary loop inside jsonData for find the country to modify then affect the new data
   * @return the modify country
   * @param {*} countryName 
   * @param {*} data 
   */
  static updateCountryDetail(countryName, data) {
    // use to stock the country target
    var tempCountry = null;
    //loop inside jsonData to find the country
    jsonData.forEach((item) => {
      if (item.name.toLowerCase() == countryName.toLowerCase()) {
        tempCountry = this.updateCountry(item, data);
        item = tempCountry;
      }
    });
    if (tempCountry != null) {
      jsonfile.writeFile(dataPath, jsonData, { spaces: 2 });
    }
    return tempCountry;
  }
  /**
   * @summary found a country in jsonData splice it and write
   * @param {*} countryName 
   */
  static deleteCountry(countryName) {
    // const inputUser = req.params.countryName;
    //searching for the input in the json
    let found = jsonData.find(
      (item) => item.name.toLowerCase() == countryName.toLowerCase()
    );
    // index of the country that the user want to delete in json
    var index = jsonData.indexOf(found);
    if (index > -1 && index < jsonData.length) {
      // remove the country by the index (2 parameter start and end)
      jsonData.splice(index, 1);
      jsonfile.writeFile(dataPath, jsonData, { spaces: 2 });
    }
    // ternaire => condition ? if true : if false
    return found ? true : false;
  }


  /**
   * @summary use to sort json file
   * @param {*} json 
   * @param {*} param 
   */
  static sortJsonByName(json, param) {
    function predicateBy(prop) {
      return function (a, b) {
        if (a[prop] > b[prop]) {
          return 1;
        } else if (a[prop] < b[prop]) {
          return -1;
        }
        return 0;
      };
    }
    json.sort(predicateBy(param));
  }

  /**
   * @throws err if any of required field of Country class is missing
   * @param {*} data
   */
  static createCountry(data) {
    console.log(data);

    var country = Country.create(
      data.name,
      data.alpha2Code,
      data.alpha3Code,
      data.capital,
      data.region,
      data.subregion,
      data.population,
      data.demonym,
      data.nativeName,
      data.flag
    );
    // add the new country to jsonData
    jsonData.push(country);

    this.sortJsonByName(jsonData, "name");

    jsonfile.writeFile(dataPath, jsonData, { spaces: 2 });
  }
}

module.exports = Utils;
