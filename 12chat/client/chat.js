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

  $("#user").val(sessionStorage.getItem("namename"));
  socket.onopen = (event) => {
    $("#message").on("focusin", () => {
      let user = $("#user").val();
      if (user == "") user = "anonymos";
      let message = {
        name: user,
        type: "userIsWriting",
      };
      socket.send(JSON.stringify(message));
    });

    $("#message").on("focusout", () => {
      let message = {
        name: "",
        type: "endUserIsWriting",
      };
      socket.send(JSON.stringify(message));
    });

    $("#send").on("click", () => {
      console.log("aboba");
      let message = {
        user: $("#user").val(),
        text: $("#message").val(),
        type: "mess",
      };
      if (message["user"] == "") message["user"] = "anonymos";
      if (message["text"] == "") message["text"] = "default";
      // alert("Пожалуйста, напишите ваше сообщение");
      //else {
      socket.send(JSON.stringify(message));
      //}
    });

    console.log("Socket open");
    document.addEventListener("keydown", (e) => {
      if (e.code == "F5") {
        e.preventDefault();
        location.reload(true);
        window.location.href = "./index.html";
      } else if (e.code == "F4") {
        e.preventDefault();
        window.location.href = "./na_f4.html";
      }
    });
  };

  let div = document.getElementById("text");

  socket.onmessage = (event) => {
    let info = JSON.parse(event.data.toString());

    if (info["type"] == "message") {
      let us = $("#user").val() == "" ? "anonymos" : $("#user").val();

      let infus = info.mess.name;
      let inftxt = info.mess.text;

      let msg = document.createElement("p");
      msg.className = "pdiv";
      if (infus == us) msg.style = "float:right";
      else msg.style = "float:left";

      let upper = document.createElement("b");
      upper.innerText = infus;
      upper.className = "writerName";

      let down = document.createElement("span");
      down.innerText = inftxt;
      msg.appendChild(upper);
      msg.innerHTML += "<br/>";
      msg.appendChild(down);

      div.appendChild(msg);
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

initiaizeCommunication();
