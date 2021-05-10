import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TeamListItem from "./TeamListItem";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

const TeamList = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios
      .get("/api/teams")
      .then((res) => {
        setTeams(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div>
      <h1>Stadium Crime Tracker</h1>
      <p>
        Created by Matt Gannon. Select the team and stadium for which you would
        like to view crime data:
      </p>
      <Grid container spacing={3}>
        {teams.map((team) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={team.slug}>
              <Card>
                <CardActionArea>
                  <Link to={`/team/${team.slug}`} className="team-link">
                    <CardContent>
                      <TeamListItem
                        name={team.name}
                        venue={team.venue}
                        address={team.address}
                        key={team.slug}
                      />
                    </CardContent>
                  </Link>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default TeamList;
