import express from "express";
import routes from "./routes/teams.js";

const app = express();

app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
