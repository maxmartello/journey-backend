import { loadGTFS } from "./journeyPlanner.js";

const GTFS = loadGTFS("./gtfs/dublinbus");

console.log("Stops loaded:", Object.keys(GTFS.stops).length);
console.log("Routes loaded:", Object.keys(GTFS.routes).length);
console.log("Trips loaded:", Object.keys(GTFS.trips).length);
console.log("Stop times loaded:", Object.keys(GTFS.stopTimes).length);
