import { timer } from "./timer/timer";
import shader from "./rnd/shd/shd";
import { vec3, mat4 } from "./mth/mth_def";
import render from "./rnd/rnd";
import figure from "./Plato/plato";

let rnd, prim, workTime, shd, fig;

const draw = () => {
  workTime.responce();

  rnd.render();

  const date = new Date();
  let t =
    date.getMinutes() * 60 + date.getSeconds() + date.getMilliseconds() / 1000;

  prim.world = mat4
    .rotate(60 * t, vec3(1, 3, 2))
    .mul(mat4.translate(vec3(0, Math.sin(t * 4), 0)));

  shd.apply();

  prim.draw(rnd);

  window.requestAnimationFrame(draw);
};

function main() {
  rnd = render(document.getElementById("Figure"));

  workTime = new timer();
  workTime.responce();

  fig = figure();
  fig.setTetra();

  shd = shader(rnd, "default");

  prim = fig.makePrim(shd);

  let arr = ["cube", "tetra", "octa", "dode", "ico"];
  for (let name of arr) {
    let element = document.getElementById(name);
    element.addEventListener("change", () => radioChange(element));
  }

  draw();
}

export function radioChange(button) {
  switch (button.value) {
    case "cube":
      fig.setCube();
      prim = fig.makePrim(shd);
      break;
    case "tetra":
      fig.setTetra();
      prim = fig.makePrim(shd);
      break;
    case "octa":
      fig.setOcta();
      prim = fig.makePrim(shd);
      break;
    case "dode":
      fig.setDode();
      prim = fig.makePrim(shd);
      break;
    case "ico":
      fig.setIco();
      prim = fig.makePrim(shd);
  }
}

window.addEventListener("load", () => {
  main();
});
