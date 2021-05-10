import { getTeamData } from "../services/getTeamData.js";
import { getCrimes } from "../services/getCrimes.js";

/**
 * Gets list of teams
 */
export const getTeams = async (req, res) => {
  try {
    let teamData = await getTeamData();

    res.status(200).json(teamData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Gets single team with crimes for a given year
 */
export const getTeam = async (req, res) => {
  let teamData = await getTeamData();

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
