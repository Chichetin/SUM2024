import { f } from "./b.js";

console.log("ABC");
f();

setTimeout(async () => {
  const response = await fetch("/getSecretData");
  const text = await response.text();

  console.log(text);

  const elem = document.getElementById("SecretDataField");
  elem.textContent = text;
}, 1000);

function initiaizeCommunication() {
  let socket = new WebSocket("ws://localhost:8008");

  socket.onopen = (event) => {
    console.log("Socket open");
    socket.send("Hello from client");
  };

  socket.onmessage = (event) => {
    console.log(`Message recieved ${event.data}`);
  };
}

initiaizeCommunication();
