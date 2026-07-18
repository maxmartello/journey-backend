import express from "express";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

const dublinBus = JSON.parse(fs.readFileSync("./routes.json", "utf8"));
const busEireann = JSON.parse(fs.readFileSync("./busEireann.json", "utf8"));
const expressway = JSON.parse(fs.readFileSync("./expressway.json", "utf8"));
const irishRail = JSON.parse(fs.readFileSync("./irishRail.json", "utf8"));

app.get("/journey", (req, res) => {
  const { origin, destination } = req.query;

  const match = (list) =>
    list.filter(
      (r) =>
        r.origin.toLowerCase() === origin.toLowerCase() &&
        r.destination.toLowerCase() === destination.toLowerCase()
    );

  res.json({
    dublinBus: match(dublinBus),
    busEireann: match(busEireann),
    expressway: match(expressway),
    irishRail: match(irishRail)
  });
});

app.listen(PORT, () => {
  console.log("Journey planner running on port", PORT);
});

