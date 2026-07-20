import express from "express";
import fs from "fs";
import path from "path";

const app = express();

// Load JSON data
const dublinBus = JSON.parse(fs.readFileSync(path.join("data", "dublinBus.json")));
const busEireann = JSON.parse(fs.readFileSync(path.join("data", "busEireann.json")));
const expressway = JSON.parse(fs.readFileSync(path.join("data", "expressway.json")));
const irishRail = JSON.parse(fs.readFileSync(path.join("data", "irishRail.json")));

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

// REQUIRED FOR RAILWAY
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Journey planner running on port ${PORT}`);
});
