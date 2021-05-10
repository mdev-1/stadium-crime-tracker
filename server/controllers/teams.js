import { CrimePrettyNames } from "../data/CrimePrettyNames.js";
import api from "../services/api.js";
import config from "config";

let teamData;

const getTeamData = async () => {
  const options = {
    headers: { "X-Auth-Token": config.get("footballApiKey") },
  };

  await api
    .get("https://api.football-data.org/v2/competitions/2021/teams", options)
    .then(async function (response) {
      teamData = response.data.teams.map((team) => {
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

  await Promise.all(
    teamData.map(async (team) => {
      team.latLong = await getLatLong(team.formattedPostcode);

      return team;
    })
  );
};

const getLatLong = async (postcode) => {
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

const getCrimes = async (latLong, year) => {
  let crimes;
  let minMonth = 1;
  let maxMonth = 12;
  let currentDate = new Date();
  let apiRequests = [];

  if (year == currentDate.getFullYear() - 3) {
    minMonth = currentDate.getMonth();
  }

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

  await Promise.all(apiRequests)
    .then((responses) => {
      crimes = responses.map((resp) => resp.data || []);
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

export const getTeams = async (req, res) => {
  try {
    if (!teamData) await getTeamData();

    res.status(200).json(teamData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTeam = async (req, res) => {
  if (!teamData) await getTeamData();

  let team = teamData.find((team) => team.slug === req.params.teamSlug);

  if (!team) res.status(404).json("Team not found");

  let crimes = await getCrimes(
    {
      lat: team.latLong.lat,
      long: team.latLong.long,
    },
    req.params.crimeYear
  );

  team.crimes = crimes.map((crime) => {
    return {
      id: crime.id,
      category: crime.category,
      outcomeStatus: crime.outcome_status
        ? crime.outcome_status.category
        : "Unknown",
      outcomeDate: crime.outcome_status ? crime.outcome_status.date : "N/A",
      month: crime.month,
    };
  });

  res.status(200).json(team);
};
