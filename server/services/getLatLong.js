import api from "../services/api.js";

/**
 * Gets LatLong for a stadium
 *
 * @param {string} postcode The postcode for the stadium
 * @return {Object} Object with the lat and long for the stadium
 */
export const getLatLong = async (postcode) => {
  let lat, long;

  await api
    .get(`https://api.postcodes.io/postcodes/${postcode}`)
    .then(async function (response) {
      lat = response.data.result.latitude;
      long = response.data.result.longitude;
    })
    .catch(function (error) {
      console.log("Error getting LatLong data: " + error.message);
    });

  return { lat, long };
};
