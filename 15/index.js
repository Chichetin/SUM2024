function algo(imgData, w) {
  let arr = [];

  for (let i = 0; i < imgData.length; i += 4)
    arr[i / 4] = imgData[i] + imgData[i + 1] + imgData[i + 2] > 200 ? 255 : 0;

  let otv = [];

  for (let j = 0; j < imgData.length / w; j++) {
    otv[j] = [];
    let z = [],
      f = [],
      znow,
      fnow;
    for (let i = 0; i < w; i++) {}
  }

  //end
  for (let i = 0; i < arr.length; i++)
    imgData[i * 4] = imgData[i * 4 + 1] = imgData[i * 4 + 2] = arr[i];
}

window.addEventListener("load", () => {
  $("#imggetter").on("change", () => {
    const canvas = document.getElementById("pic");
    const ctx = document.getElementById("pic").getContext("2d");
    const img = new Image();
    const selectedFile = $("#imggetter").get(0).files[0];
    img.src = URL.createObjectURL(selectedFile);
    img.onload = () => {
      canvas.height = img.height * 2;
      canvas.width = img.width * 2;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      let imgData = ctx.getImageData(0, 0, img.width, img.height);

      algo(imgData.data, img.width);

      ctx.putImageData(imgData, 0, img.height);
    };
  });
});
