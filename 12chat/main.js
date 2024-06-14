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

let wsArray = [];
let messages = [];

wss.on("connection", (ws) => {
  wsArray.push(ws);

  for (let st of messages)
    ws.send(
      JSON.stringify({
        mess: st,
        type: "message",
      })
    );

  //На получении сообщения
  ws.on("message", (message) => {
    let convMess = JSON.parse(message.toString()); // само сообщение

    // Получили текстовое сообщение
    if (convMess["type"] == "mess") {
      if (/*convMess["user"] == "admin" && */ convMess["text"] == "clear") {
        messages = [];
      } else
        messages.push({
          name: convMess["user"],
          text: convMess["text"],
        });
      let send = {
        mess: messages[messages.length - 1],
        type: "message",
      };
      for (let sock of wsArray) {
        sock.send(JSON.stringify(send));
      }
    }
    //Получили сообщение: юзер пишет
    else if (convMess["type"] == "userIsWriting") {
      let send = {
        text: convMess["name"],
        type: "userIsWriting",
      };

      for (let sock of wsArray) {
        if (sock == ws) continue;
        sock.send(JSON.stringify(send));
      }
    }
    //Получили сообщение: юзер перестал писать
    else if (convMess["type"] == "endUserIsWriting") {
      let send = {
        text: "",
        type: "endUserIsWriting",
      };

      for (let sock of wsArray) {
        if (sock == ws) continue;
        sock.send(JSON.stringify(send));
      }
    }
  });
});

const host = "localhost";
const port = 8008;

server.listen(port, host, () => {
  console.log(`Server started on http://${host}:${port} `);
});
