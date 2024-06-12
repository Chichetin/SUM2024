import http from "node:http";
import fs from "node:fs/promises";
import express from "express";
import { WebSocketServer } from "ws";

const app = express();

let counter = 0;

app.get("/", (req, res, next) => {
  counter = counter + 1;
  console.log(counter);
  next();
});

app.get("/getSecretData", (req, res, next) => {
  res.send(`Secret data recieved: ${counter}`);
});

app.use(express.static("client"));

// const requestListener = async (req, res) => {
//   if (req.url == "/") {
//     const contetnts = await fs.readFile(process.cwd() + "/client/index.html");

//     res.setHeader("Content-Type", "text/html");
//     res.writeHead(200);
//     res.end(contetnts);
//   } else {
//     if (req.url.endsWith(".js")) {
//       const contetnts = await fs.readFile(process.cwd() + "/client/" + req.url);

//       res.setHeader("Content-Type", "text/javascript");
//       res.writeHead(200);
//       res.end(contetnts);
//     }
//   }
// };

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log(message.toString());
    ws.send(`Hello, you send me message ${message}`);
  });
  ws.send("Hello");
});

const host = "localhost";
const port = 8008;

server.listen(port, host, () => {
  console.log(`Server started on http://${host}:${port} `);
});
