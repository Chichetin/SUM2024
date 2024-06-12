class _vec3 {
  constructor(x, y, z) {
    if (x == undefined) return vec3(0, 0, 0);
    else if (typeof x == "object")
      if (x.length == 3) (this.x = x[0]), (this.y = x[1]), (this.z = x[2]);
      else (this.x = x.x), (this.y = x.y), (this.z = x.z);
    else if (y == undefined || z == undefined)
      (this.x = x), (this.y = x), (this.z = x);
    else (this.x = x), (this.y = y), (this.z = z);
  }

  add(v) {
    if (v == undefined) return vec3(this);
    else if (typeof v == "number")
      return vec3(this.x + v, this.y + v, this.z + v);
    else return vec3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  add3(u, v) {
    return this.add(u.add(v));
  }

  add4(u, v, n) {
    return this.add(u.add3(v, n));
  }

  sub(v) {
    if (v == undefined) return vec3(this);
    else if (typeof v == "number")
      return vec3(this.x - v, this.y - v, this.z - v);

    return vec3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  mul(x) {
    if (x == undefined) return vec3(this);
    else if (typeof x == "number")
      return vec3(this.x * x, this.y * x, this.z * x);
    else if (typeof x == "object")
      return vec3(this.x * x[0], this.y * x[0], this.z * x[0]);
  }

  div(x) {
    if (x == undefined) return vec3(this);
    else if (typeof x == "number")
      return vec3(this.x / x, this.y / x, this.z / x);
    else if (typeof x == "object")
      return vec3(this.x / x[0], this.y / x[0], this.z / x[0]);
  }

  neg() {
    return vec3(-this.x, -this.y, -this.z);
  }

  dot(v) {
    if (v == undefined) return this.dot(this);

    if (typeof v == "number") return this.x * v + this.y * v + this.z * v;

    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  len() {
    let l = this.dot();

    if (l == 1 || l == 0) return l;

    return Math.sqrt(l);
  }

  normalize() {
    let l = this.len();

    if (l == 1 || l == 0) return vec3(this);

    return this.div(l);
  }

  cross(v) {
    if (v == undefined) return vec3(this);
    if (typeof v == "number") {
      return this.cross(vec3(v));
    }

    return vec3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x,
    );
  }

  transform(m) {
    return vec3(
      this.x * m.m[0][0] + this.y * m.m[1][0] + this.z * m.m[2][0],
      this.x * m.m[0][1] + this.y * m.m[1][1] + this.z * m.m[2][1],
      this.x * m.m[0][2] + this.y * m.m[1][2] + this.z * m.m[2][2],
    );
  }

  mulMatr(m) {
    let w =
      this.x * m.m[0][3] + this.y * m.m[1][3] + this.z * m.m[2][3] + m.m[3][3];

    return vec3(
      this.x * m.m[0][0] + this.y * m.m[1][0] + this.z * m.m[2][0] + m.m[3][0],
      this.x * m.m[0][1] + this.y * m.m[1][1] + this.z * m.m[2][1] + m.m[3][1],
      this.x * m.m[0][2] + this.y * m.m[1][2] + this.z * m.m[2][2] + m.m[3][2],
    ).div(w);
  }

  pointTransform(m) {
    return vec3(
      this.x * m.m[0][0] + this.y * m.m[1][0] + this.z * m.m[2][0] + m.m[3][0],
      this.x * m.m[0][1] + this.y * m.m[1][1] + this.z * m.m[2][1] + m.m[3][1],
      this.x * m.m[0][2] + this.y * m.m[1][2] + this.z * m.m[2][2] + m.m[3][2],
    );
  }
}

function vec3(...args) {
  return new _vec3(...args);
}

export default vec3;
