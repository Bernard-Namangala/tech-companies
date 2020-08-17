"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractQueryStrings = exports.filterCompanies = void 0;

/**
 * gets all the returned companies and filters by the filters in the filters array
 * @param {array} companies
 * @param {array} queryStrings
 * @returns {array} filtered companies
 */
var filterCompanies = function filterCompanies(companies, queryStrings) {
  var queryStringsArray = extractQueryStrings(queryStrings);

  if (queryStrings["location"] || queryStrings["name"]) {
    //   if user wants to filter by both location and name
    companies = companies.filter(function (company) {
      var locationArray = queryStringsArray["location"];
      var nameArray = queryStringsArray["name"];

      if (nameArray[0] !== "" && locationArray[0] !== "") {
        return locationArray.includes(company.location.toLowerCase()) && nameArray.includes(company.name.toLowerCase());
      } else if (nameArray[0] !== "") {
        //   if user wants to filter by name alone
        return nameArray.includes(company.name.toLowerCase());
      } else {
        //   if user wants to filter by location alone
        return locationArray.includes(company.location.toLowerCase());
      }
    });
  }

  return companies;
};
/**
 *
 * @param {object} queryStrings
 * @returns {object} cleaned query strings
 */


exports.filterCompanies = filterCompanies;

var extractQueryStrings = function extractQueryStrings(queryStrings) {
  var locationQueryStrings = queryStrings["location"];
  var nameQueryStrngs = queryStrings["name"];

  if (nameQueryStrngs === undefined) {
    nameQueryStrngs = "";
  }

  if (locationQueryStrings === undefined) {
    locationQueryStrings = "";
  }

  return {
    location: locationQueryStrings.replace(/\s/g, "").toLowerCase().split(","),
    name: nameQueryStrngs.replace(/\s/g, "").toLowerCase().split(",")
  };
};

exports.extractQueryStrings = extractQueryStrings;