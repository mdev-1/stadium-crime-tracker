import api from "./api.js";
import { CrimePrettyNames } from "../data/CrimePrettyNames.js";

/**
 * Gets crimes for a LatLong
 *
 * @param {Object} latLong The latLong for a given stadium
 * @param {number} year The year of data to retrieve
 * @return {Array} The list of crimes retrieved
 */
export const getCrimes = async (latLong, year) => {
  let crimes;
  let minMonth = 1;
  let maxMonth = 12;
  let currentDate = new Date();
  let apiRequests = [];

  /**
   * The Police API supports data starting from the previous month, 3 years ago.
   * E.g. If the current date is in May 2021, the Police API has data from April 2018.
   * As getMonth() in Javascript is zero-indexed, we use that so that for example May will return 4.
   * However the Police API is not zero indexed, so 4 can be formatted to 04 to retrieve data for April.
   */
  if (year == currentDate.getFullYear() - 3) {
    minMonth = currentDate.getMonth();
  }

  /**
   * The Police API supports data until the previous month of the current year.
   * E.g. If the current date is in May 2021, the Police API has data until April 2021.
   */
  if (year == currentDate.getFullYear()) {
    maxMonth = currentDate.getMonth();
  }

  for (let i = minMonth; i <= maxMonth; i++) {
    let formattedMonth = ("0" + i).slice(-2);
    apiRequests.push(
      api.get(
        `https://data.police.uk/api/crimes-at-location?date=${year}-${formattedMonth}&lat=${latLong.lat}&lng=${latLong.long}`
      )
    );
  }

  /**
   * Extracts out the response data from each API request, flattens it into a single
   * array and then swaps category names out for their pretty names
   */
  await Promise.all(apiRequests)
    .then((responses) => {
      crimes = responses.map((res) => res.data || []);
      crimes = [].concat(...crimes);

      crimes.map((crime) => {
        crime.category = CrimePrettyNames.find(
          (item) => item.category === crime.category
        ).prettyName;
      });
    })
    .catch(function (error) {
      console.log("Error getting police data: " + error.message);
    });

  return crimes;
};
