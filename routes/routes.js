// inport helper class containing all functions CRUD (Create(post) Read(get) Update(put) Delete)
const appRouter = function(app, Utils) {

//step 1  => create a route that returns text
app.get("/", function (req, res) {
    res.status(200).send("Vous êtes à laccueil");
  });
  
  // step 2 => create a route that returns json format
  app.get("/teachersName", function (req, res) {
    res.status(200).json({ thomas: "Thomas Jamais", alban: "Alban Meurice" });
  });
  
  // step 4 => create a route that returns json data
  app.get("/country", function (req, res) {
    res.status(200).send(Utils.getAll());
  });
  
  // step 5 => create a route that returns  all the countries using for loop
  app.get("/names/all", function (req, res) {
    res.status(200).json(Utils.getCountriesNames());
  });
  
  // step 6 => create a route that returns all the countries using map()
  app.get("/names/allMap", function (req, res) {
    res.json(Utils.getCountriesNamesMap());
  });
  
  // step 7 => create a route that returns all the capital using for loop
  app.get("/capitals/all", function (req, res) {
    res.status(200).json(Utils.getCapitalOfCountry());
  });
  
  //step 8 => create a route that returns all the capital using map()
  app.get("/capitals/allMap", function (req, res) {
    res.status(200).json(Utils.getCapitalsMap());
  });
  
  //step 9 => create a route that returns the information of a choosen country
  app.get("/country/:countryName", function (req, res) {
    let userInput = req.params.countryName;
    let myitem = Utils.getCountryByName(userInput);
    if (myitem == null) {
      res.status(404).send("it's not a country");
    } else {
      res.status(200).json(myitem);
    }
  });
  
  //step 10 => create a route that returns the coutries inside a choosen region
  app.get("/regions/:regionName", function (req, res) {
    let userInput = req.params.regionName;
    let countries = Utils.getCountriesByRegion(userInput);
  
    if (countries.length > 0) {
      res.status(200).json(countries);
    } else {
      res.status(404).send("it's not a region");
    }
  });
  
  // step 11 => create a route that returns the coutries inside a choosen subregion
  app.get("/subregions/:subregionsName", function (req, res) {
    let userInput = req.params.subregionsName;
    var subregionArray = Utils.getCountriesBySubregion(userInput);
  
    // handle error
    if (subregionArray.length > 0) {
      res.status(200).send(subregionArray);
    } else {
      res.status(404).send("it's not a subregion");
    }
  });
  
  // step 12 => create a route that returns all the coutries using the choosen currencies
  app.get("/currencies/:currency", function (req, res) {
    let userInput = req.params.currency;
    var currenciesArray = Utils.getCountriesByCurrency(userInput);
  
    if (currenciesArray.length > 0) {
      res.status(200).send(currenciesArray);
    } else {
      res.status(404).send("it's not a currencies");
    }
  });
  
  // step 14 => create a route that allows to update the data (put)
  app.put("/countries/:countryName", function (req, res) {
    let inputUser = req.params.countryName;
    let data = req.body;
    // use to stock the country target
    var tempCountry = Utils.updateCountryDetail(inputUser, data);
  
    // handle error
    if (tempCountry != null) {
      // jsonfile.writeFile(dataPath, jsonData, { spaces: 2 });
      res.status(200).json(tempCountry);
    } else {
      res.status(400).send("it's not a country");
    }
  });
  
  // Step 15 : Create a new route /DELETE on
  //  "/countries/:countryName" which will delete
  //  from the JSON file the specific country you
  //  asked (case insensitive) (if you find it..., status 200)
  //  (if not, you will send a 404 Not Found).
  app.delete("/countries/:countryName", function (req, res) {
    const inputUser = req.params.countryName;
  
    if (Utils.deleteCountry(inputUser)) {
      res.status(200).send("Deleted");
    } else {
      res.status(404).send("Not found :(");
    }
  });
  
  // Step 16 : Create a new route /POST on "countries/:countryName"
  // with at least "name, alpha2Code, alpha3Code, capital, region, subregion,
  //  population, denonym, nativeName, flag" as body to create and insert
  //  the new country on the JSon file.
  app.post("/countries/:countryName", function (req, res) {
    const inputUser = req.params.countryName;
    let data = req.body;
    data.name = inputUser;
    console.log(data);
    try {
      Utils.createCountry(data);
      res.status(200).send("new country created");
    } catch (e) {
      res.status(400).send(e.message);
      console.log(e);
    }
  });
};

module.exports = appRouter;