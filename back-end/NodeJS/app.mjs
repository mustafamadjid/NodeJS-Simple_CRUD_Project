import http from "http";
import { DataService } from "./service.mjs";

const service = new DataService();

const server = http.createServer((req, res) => {
  // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Allow specific methods
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  // Allow specific headers
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  res.setHeader("Content-Type", "application/json");
  if (req.method === "GET") {
    service.getDataFromDatabase(req, res);
  } else if (req.method === "POST") {
    service.createDataToDatabase(req, res);
  } else if (req.method === "PUT") {
    service.updateDataInDatabase(req, res);
  } else if (req.method === "DELETE") {
    service.deleteDataFromDatabase(req, res);
  } else if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000 : http://localhost:3000");
});
