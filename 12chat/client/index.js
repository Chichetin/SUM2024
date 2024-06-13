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
    document.getElementById("message").addEventListener("focusin", () => {
      let user = document.getElementById("user").value;
      if (user == "") user = "anonymos";
      let message = {
        name: user,
        type: "userIsWriting",
      };
      socket.send(JSON.stringify(message));
    });

    document.getElementById("message").addEventListener("focusout", () => {
      let message = {
        name: "",
        type: "endUserIsWriting",
      };
      socket.send(JSON.stringify(message));
    });

    document.getElementById("send").addEventListener("click", () => {
      console.log("aboba");
      let message = {
        user: document.getElementById("user").value,
        text: document.getElementById("message").value,
        type: "mess",
      };
      if (message["user"] == "") message["user"] = "anonymos";
      if (message["text"] == "") alert("Пожалуйста, напишите ваше сообщение");
      else {
        console.log(message);
        socket.send(JSON.stringify(message));
      }
    });

    console.log("Socket open");
  };

  let div = document.getElementById("text");
  socket.onmessage = (event) => {
    let info = JSON.parse(event.data.toString());
    if (info["type"] == "message") {
      let us = $("#user").val() == "" ? "anonymos" : $("#user").val();
      let str = info["text"].replaceAll(
        `float:left\"><b>${us}`,
        `float:right\"><b>${us}`
      );
      div.innerHTML = str;
      div.scroll({
        top: div.scrollHeight,
        behavior: "smooth",
      });
    }
    if (info["type"] == "userIsWriting") {
      $("#isWriting").show();
      $("#isWriting").text(`${info["text"]} пишет...`);
    }
    if (info["type"] == "endUserIsWriting") {
      $("#isWriting").hide();
      $("#isWriting").text(`никто не пишет... и тебя не видят`);
    }
  };

  /* $("#fs").change(() => {
    $("#text").append(this.files[0].name);
    console.log(filename);
  });*/
}

$("#isWriting").hide();
initiaizeCommunication();
