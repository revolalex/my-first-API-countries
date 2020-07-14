// class country will be use to create a new country in step 16
class Country {
    constructor(
      name,
      alpha2Code,
      alpha3Code,
      capital,
      region,
      subregion,
      population,
      demonym,
      nativeName,
      flag
    ) {
      this.name = name;
      this.alpha2Code = alpha2Code;
      this.alpha3Code = alpha3Code;
      this.capital = capital;
      this.region = region;
      this.subregion = subregion;
      this.population = population;
      this.demonym = demonym;
      this.nativeName = nativeName;
      this.flag = flag;
    }
  
    /**
     * @summary create a new instance of country or throw an error if any required fiel is missing
     * @throws error if any field is missing
     * @param {*} name 
     * @param {*} alpha2Code 
     * @param {*} alpha3Code 
     * @param {*} capital 
     * @param {*} region 
     * @param {*} subregion 
     * @param {*} population 
     * @param {*} demonym 
     * @param {*} nativeName 
     * @param {*} flag 
     */
  
    // static allow us to acces this method without an insance of country
    static create(name,
      alpha2Code,
      alpha3Code,
      capital,
      region,
      subregion,
      population,
      demonym,
      nativeName,
      flag) {
        // check if the fields have been completed
        if (
          name == null ||
          alpha2Code == null ||
          alpha3Code == null ||
          capital == null ||
          region == null ||
          subregion == null ||
          population == null ||
          demonym == null ||
          nativeName == null ||
          flag == null ) {
          throw new Error("Missing one or several required field.");
        } else{
          // if all the required fields have been completed return a new instance of country
          return new Country(name,
            alpha2Code,
            alpha3Code,
            capital,
            region,
            subregion,
            population,
            demonym,
            nativeName,
            flag)
        }
    }
  }

  module.exports = Country;