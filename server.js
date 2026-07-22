import express from "express";
import fs from "fs";
import path from "path";

const app = express();

// Load routes from repo root
const routes = JSON.parse(fs.readFileSync(path.join(process.cwd(), "routes.json")));

// Build graph: stop name -> array of { to, operator, route }
const graph = new Map();

for (const r of routes) {
  for (let i = 0; i < r.stops.length - 1; i++) {
    const from = r.stops[i];
    const to = r.stops[i + 1];

    if (!graph.has(from)) graph.set(from, []);
    if (!graph.has(to)) graph.set(to, []);

    graph.get(from).push({ to, operator: r.operator, route: r.route });
    graph.get(to).push({ to: from, operator: r.operator, route: r.route }); // bidirectional
  }
}

// BFS to find path between two stop names
function findPath(origin, destination) {
  origin = origin.trim();
  destination = destination.trim();

  if (!graph.has(origin) || !graph.has(destination)) return null;

  const queue = [origin];
  const visited = new Set([origin]);
  const parent = new Map(); // child -> { parent, operator, route }

  while (queue.length > 0) {
    const current = queue.shift();
    if (current === destination) break;

    const edges = graph.get(current) || [];
    for (const edge of edges) {
      if (!visited.has(edge.to)) {
        visited.add(edge.to);
        parent.set(edge.to, { parent: current, operator: edge.operator, route: edge.route });
        queue.push(edge.to);
      }
    }
  }

  if (!visited.has(destination)) return null;

  // Reconstruct edge path
  const edgesPath = [];
  let cur = destination;
  while (cur !== origin) {
    const info = parent.get(cur);
    edgesPath.push({
      from: info.parent,
      to: cur,
      operator: info.operator,
      route: info.route
    });
    cur = info.parent;
  }
  edgesPath.reverse();

  // Group edges into legs by route/operator
  const legs = [];
  if (edgesPath.length === 0) return legs;

  let currentLeg = {
    operator: edgesPath[0].operator,
    route: edgesPath[0].route,
    origin: edgesPath[0].from,
    destination: edgesPath[0].to
  };

  for (let i = 1; i < edgesPath.length; i++) {
    const e = edgesPath[i];
    if (e.route === currentLeg.route && e.operator === currentLeg.operator) {
      currentLeg.destination = e.to;
    } else {
      legs.push({ ...currentLeg });
      currentLeg = {
        operator: e.operator,
        route: e.route,
        origin: e.from,
        destination: e.to
      };
    }
  }
  legs.push({ ...currentLeg });

  return legs;
}

// Journey endpoint
app.get("/journey", (req, res) => {
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({ error: "origin and destination are required" });
  }

  const path = findPath(origin, destination);
  if (!path) {
    return res.json({ legs: [], message: "No journey found" });
  }

  res.json({ legs: path });
});

// Railway port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Journey planner running on port ${PORT}`);
});
