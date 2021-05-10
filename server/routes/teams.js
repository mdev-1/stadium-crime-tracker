import express from "express";
import { getTeams, getTeam } from "../controllers/teams.js";

const router = express.Router();

router.get("/teams", getTeams);
router.get("/team/:teamSlug/crime-year/:crimeYear", getTeam);

export default router;
