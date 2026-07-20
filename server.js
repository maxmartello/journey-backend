import express from "express";
import fs from "fs";
import path from "path";

const app = express();

// Load JSON files from the root of the repo
const dublinBus = JSON.parse(fs.readFileSync(path.join(process.cwd(), "routes.json")));
const busEireann = JSON.parse(fs.readFileSync(path.join(process.cwd(), "busEireann.json")));
const expressway = JSON.parse(fs.readFileSync(path.join(process.cwd(), "expressway.json")));
const irishRail = JSON.parse(fs.readFileSync(path.join(process.cwd(), "irishRail.json")));

// Journey endpoint
app.get("/journey", (req, res) => {
  const { origin, destination } = req.query;

  const result = {
    dublinBus: dublinBus.filter(
      r => r.origin.toLowerCase() === origin.toLowerCase() &&
           r.destination.toLowerCase() === destination.toLowerCase()
    ),
    busEireann: busEireann.filter(
      r => r.origin.toLowerCase() === origin.toLowerCase() &&
           r.destination.toLowerCase() === destination.toLowerCase()
    ),
    expressway: expressway.filter(
      r => r.origin.toLowerCase() === origin.toLowerCase() &&
           r.destination.toLowerCase() === destination.toLowerCase()
    ),
    irishRail: irishRail.filter(
      r => r.origin.toLowerCase() === origin.toLowerCase() &&
           r.destination.toLowerCase() === destination.toLowerCase()
    )
  };

  res.json(result);
});

// Railway port binding
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Journey planner running on port ${PORT}`);
});
