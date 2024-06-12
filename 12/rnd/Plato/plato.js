import { D2R, vec3 } from "../mth/mth_def";
import { autoNormals, prim, vertex } from "../rnd/prim/prim";

class _figure {
  constructor(verts) {
    this.vertexes = [];
  }

  setCube() {
    this.vertexes = [
      [vec3(-1, -1, -1), vec3(-1, 1, -1), vec3(1, 1, -1), vec3(1, -1, -1)],
      [vec3(-1, -1, 1), vec3(-1, 1, 1), vec3(1, 1, 1), vec3(1, -1, 1)],
      [vec3(-1, -1, -1), vec3(-1, -1, 1), vec3(-1, 1, 1), vec3(-1, 1, -1)],
      [vec3(1, -1, -1), vec3(1, -1, 1), vec3(1, 1, 1), vec3(1, 1, -1)],
      [vec3(-1, -1, -1), vec3(-1, -1, 1), vec3(1, -1, 1), vec3(1, -1, -1)],
      [vec3(-1, 1, -1), vec3(-1, 1, 1), vec3(1, 1, 1), vec3(1, 1, -1)],
    ];
  }

  setTetra() {
    let sq3 = Math.sqrt(3.0),
      sq2 = Math.sqrt(2.0);

    let top = vec3(0, sq2 / sq3, 0).mul(2),
      front = vec3(0, 0, sq3 / 3).mul(2),
      left = vec3(-0.5, 0, -sq3 / 6.0).mul(2),
      right = vec3(0.5, 0, -sq3 / 6).mul(2);

    this.vertexes = [
      [left, front, top],
      [front, right, top],
      [right, left, top],
      [front, right, left],
    ];
  }

  setOcta() {
    let sq3 = Math.sqrt(3),
      sq2 = Math.sqrt(2);

    let top = vec3(0, sq2 / 2, 0).mul(2),
      bot = top.mul(-1),
      lf = vec3(-0.5, 0, 0.5).mul(2),
      lb = vec3(-0.5, 0, -0.5).mul(2),
      rf = vec3(0.5, 0, 0.5).mul(2),
      rb = vec3(0.5, 0, -0.5).mul(2);

    this.vertexes = [
      [bot, lf, rf],
      [bot, lf, lb],
      [bot, lb, rb],
      [bot, rf, rb],
      [top, lf, rf],
      [top, lf, lb],
      [top, lb, rb],
      [top, rf, rb],
    ];
  }

  setIco() {
    this.vertexes = [];

    let a = D2R(72);
    let co = Math.cos(a),
      si = Math.sin(a),
      co2 = Math.cos(2 * a),
      si2 = Math.sin(2 * a),
      x = Math.sqrt(1 - 2 * co);

    let p00 = vec3(0, 0.5 + x, 0).mul(1.5),
      p10 = vec3(1, 0.5, 0).mul(1.5),
      p11 = vec3(co, 0.5, -si).mul(1.5),
      p12 = vec3(co2, 0.5, -si2).mul(1.5),
      p13 = vec3(co2, 0.5, si2).mul(1.5),
      p14 = vec3(co, 0.5, si).mul(1.5),
      p20 = p10.mul(-1),
      p21 = p11.mul(-1),
      p22 = p12.mul(-1),
      p23 = p13.mul(-1),
      p24 = p14.mul(-1),
      p30 = p00.mul(-1);

    this.vertexes = [
      [p14, p13, p00],
      [p13, p12, p00],
      [p12, p11, p00],
      [p11, p10, p00],
      [p10, p14, p00],

      [p23, p10, p11],
      [p23, p22, p10],
      [p22, p14, p10],
      [p22, p21, p14],
      [p21, p13, p14],
      [p21, p20, p13],
      [p20, p12, p13],
      [p20, p24, p12],
      [p24, p11, p12],
      [p24, p23, p11],

      [p23, p30, p22],
      [p22, p30, p21],
      [p21, p30, p20],
      [p20, p30, p24],
      [p24, p30, p23],
    ];
  }

  setDode() {
    this.vertexes = [];

    let r = Math.sqrt(50 + 10 * Math.sqrt(5)) / 10,
      R = 0.25 * (1 + Math.sqrt(5)) * Math.sqrt(3),
      r0 = r * 2 * Math.cos(D2R(36));

    let ed1 = [],
      ed2 = [],
      lay1 = [],
      lay2 = [];

    let d = Math.sqrt(R * R - r * r),
      d0 = Math.sqrt(R * R - r0 * r0);

    for (let i = 0; i < 360; i += 72) {
      let a1 = D2R(i),
        a2 = D2R(i + 36);

      let p1 = vec3(r * Math.sin(a1), r * Math.cos(a1), d),
        p2 = vec3(r * Math.sin(a2), r * Math.cos(a2), -d),
        l1 = vec3(r0 * Math.sin(a1), r0 * Math.cos(a1), d0),
        l2 = vec3(r0 * Math.sin(a2), r0 * Math.cos(a2), -d0);

      ed1.push(p1);
      ed2.push(p2);
      lay1.push(l1);
      lay2.push(l2);
    }

    this.vertexes.push(ed1);
    this.vertexes.push(ed2);

    for (let i = 0; i < 5; i++) {
      let sur1 = [
        ed1[i],
        lay1[i],
        lay2[i],
        lay1[(i + 1) % 5],
        ed1[(i + 1) % 5],
      ];
      let sur2 = [
        ed2[i],
        lay2[i],
        lay1[i],
        lay2[(i + 4) % 5],
        ed2[(i + 4) % 5],
      ];
      this.vertexes.push(sur1);
      this.vertexes.push(sur2);
    }
  }

  makePrim(rnd) {
    let indexes = [];
    let vertexes = [];
    let j = 0;

    for (let edge of this.vertexes) {
      for (let v of edge) vertexes.push(vertex(v, vec3()));

      for (let i = 2; i < edge.length; i++) {
        indexes.push(j);
        indexes.push(j + i - 1);
        indexes.push(j + i);
      }

      j += edge.length;
    }

    return prim(rnd, vertexes, indexes);
  }
}

function figure() {
  return new _figure();
}
export default figure;
