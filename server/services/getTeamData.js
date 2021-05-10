import api from "../services/api.js";
import config from "config";
import { getLatLong } from "../services/getLatLong.js";

/**
 * Gets team information and associated LatLongs for their stadiums
 */
export const getTeamData = async () => {
  let teamData;

  const options = {
    headers: { "X-Auth-Token": config.get("footballApiKey") },
  };

  // get list of teams, ID 2021 maps to the Premier League
  await api
    .get("https://api.football-data.org/v2/competitions/2021/teams", options)
    .then(async function (response) {
      teamData = response.data.teams.map((team) => {
        // assumption: the postcode is always the last two space-separated elements of the address string
        let formattedPostcode = team.address.split(" ").slice(-2).join("");
        let slug = team.name
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");

        return {
          name: team.name,
          venue: team.venue,
          address: team.address,
          formattedPostcode,
          slug,
        };
      });
    })
    .catch(function (error) {
      console.log("Error getting team data: " + error.message);
    });

  // get the LatLong for each team
  await Promise.all(
    teamData.map(async (team) => {
      team.latLong = await getLatLong(team.formattedPostcode);

      return team;
    })
  );

  return teamData;
};
