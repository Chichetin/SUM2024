function reg() {
  if ($("#user").val() == "") return;
  sessionStorage.setItem("namename", $("#user").val());
  window.location.href = "./chat.html";
}

$("#user").on("keydown", (e) => {
  if (e.code == "Enter") {
    reg();
  }
});
$("#supress").on("click", () => {
  reg();
});
