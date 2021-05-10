import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";

const Team = () => {
  const { slug } = useParams();
  const [team, setTeam] = useState({ crimes: [] });
  const [showLoading, setShowLoading] = useState(false);
  const [displayingYear, setDisplayingYear] = useState(2021);
  const history = useHistory();

  const loadCrimes = (year) => {
    setShowLoading(true);
    setDisplayingYear(year);

    axios
      .get(`/api/team/${slug}/crime-year/${year}`)
      .then((res) => {
        setTeam(res.data);
        setShowLoading(false);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    loadCrimes(displayingYear);
  }, []);

  return (
    <div>
      <Button onClick={() => history.goBack()} startIcon={<ArrowBack />}>
        Back to teams
      </Button>
      <h1>Stadium crime for {team.name}</h1>
      <h2>Stadium details</h2>
      <div>Venue: {team.venue}</div>
      <div>Address: {team.address}</div>
      <h2>Crime data</h2>
      <div class="crime-year-selector">
        Crime for year:
        <span
          className={
            "crime-year-link" + (displayingYear === 2018 ? " active" : "")
          }
          onClick={() => loadCrimes(2018)}
        >
          2018
        </span>
        <span
          className={
            "crime-year-link" + (displayingYear === 2019 ? " active" : "")
          }
          onClick={() => loadCrimes(2019)}
        >
          2019
        </span>
        <span
          className={
            "crime-year-link" + (displayingYear === 2020 ? " active" : "")
          }
          onClick={() => loadCrimes(2020)}
        >
          2020
        </span>
        <span
          className={
            "crime-year-link" + (displayingYear === 2021 ? " active" : "")
          }
          onClick={() => loadCrimes(2021)}
        >
          2021
        </span>
      </div>
      {showLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="Crime data table">
            <TableHead>
              <TableRow>
                <TableCell>Crime</TableCell>
                <TableCell>Crime Date</TableCell>
                <TableCell>Outcome Status</TableCell>
                <TableCell>Outcome Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {team.crimes.map((crime) => {
                return (
                  <TableRow key={crime.id}>
                    <TableCell component="th" scope="row">
                      {crime.category}
                    </TableCell>
                    <TableCell>{crime.month}</TableCell>
                    <TableCell>{crime.outcomeStatus}</TableCell>
                    <TableCell>{crime.outcomeDate}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Team;
