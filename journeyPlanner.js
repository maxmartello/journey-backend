import fs from "fs";
import path from "path";

// This will hold all GTFS data once loaded
const GTFS = {
  stops: {},
  routes: {},
  trips: {},
  stopTimes: {}
};

// Load a CSV file and return an array of objects
function loadCSV(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const lines = text.split("\n").filter(l => l.trim().length > 0);
  const headers = lines[0].split(",");

  return lines.slice(1).map(line => {
    const values = line.split(",");
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = values[i];
    });
    return obj;
  });
}

// Load GTFS from a folder (e.g. ./gtfs/dublinbus)
export function loadGTFS(folder) {
  GTFS.stops = {};
  GTFS.routes = {};
  GTFS.trips = {};
  GTFS.stopTimes = {};

  // Load stops
  const stops = loadCSV(path.join(folder, "stops.txt"));
  stops.forEach(s => {
    GTFS.stops[s.stop_id] = s;
  });

  // Load routes
  const routes = loadCSV(path.join(folder, "routes.txt"));
  routes.forEach(r => {
    GTFS.routes[r.route_id] = r;
  });

  // Load trips
  const trips = loadCSV(path.join(folder, "trips.txt"));
  trips.forEach(t => {
    GTFS.trips[t.trip_id] = t;
  });

  // Load stop_times
  const stopTimes = loadCSV(path.join(folder, "stop_times.txt"));
  stopTimes.forEach(st => {
    if (!GTFS.stopTimes[st.trip_id]) GTFS.stopTimes[st.trip_id] = [];
    GTFS.stopTimes[st.trip_id].push(st);
  });

  // Sort stop_times by stop_sequence
  Object.values(GTFS.stopTimes).forEach(list => {
    list.sort((a, b) => Number(a.stop_sequence) - Number(b.stop_sequence));
  });

  console.log("GTFS loaded from:", folder);
  return GTFS;
}
