import { f } from "./b.js";

console.log("ABC");
f();

setTimeout(async () => {
  const response = await fetch("/getSecretData");
  const text = await response.text();

  console.log(text + "aaaaaaaaaaaaa");

  const elem = document.getElementById("SecretDataField");
  elem.textContent = text;
}, 1000);

let socket;

function initiaizeCommunication() {
  socket = new WebSocket("ws://localhost:8008");

  socket.onopen = (event) => {
    document.getElementById("send").addEventListener("click", () => {
      console.log("aboba");
    });

    console.log("Socket open");
    socket.send("Hello from client");
  };

  socket.onmessage = (event) => {
    let elem = document.getElementById("text");
    elem.innerHTML = event.data;
  };
}

function sentMessage() {
  console.log("aoba");
}

initiaizeCommunication();
