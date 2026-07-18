import http from "http";

const server = http.createServer((req, res) => {
  res.end("Backend is running");
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
