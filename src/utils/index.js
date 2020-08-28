/**
 * gets all the returned companies and filters by the filters in the filters array
 * @param {array} companies
 * @param {array} queryStrings
 * @returns {array} filtered companies
 */
export const filterCompanies = (companies, queryStrings) => {
	const queryStringsArray = extractQueryStrings(queryStrings);

	if (queryStrings["location"] || queryStrings["name"]) {
		//   if user wants to filter by both location and name
		companies = companies.filter((company) => {
			const locationArray = queryStringsArray["location"];
			const nameArray = queryStringsArray["name"];

			if (nameArray[0] !== "" && locationArray[0] !== "") {
				return (
					locationArray.includes(
						company.location.replace(/\s/g, "").toLowerCase()
					) && nameArray.includes(company.name.replace(/\s/g, "").toLowerCase())
				);
			} else if (nameArray[0] !== "") {
				//   if user wants to filter by name alone
				return nameArray.includes(
					company.name.replace(/\s/g, "").toLowerCase()
				);
			} else {
				//   if user wants to filter by location alone
				return locationArray.includes(
					company.location.replace(/\s/g, "").toLowerCase()
				);
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
export const extractQueryStrings = (queryStrings) => {
	let locationQueryStrings = queryStrings["location"];
	let nameQueryStrngs = queryStrings["name"];

	if (nameQueryStrngs === undefined) {
		nameQueryStrngs = "";
	}
	if (locationQueryStrings === undefined) {
		locationQueryStrings = "";
	}

	return {
		location: locationQueryStrings.replace(/\s/g, "").toLowerCase().split(","),
		name: nameQueryStrngs.replace(/\s/g, "").toLowerCase().split(","),
	};
};
