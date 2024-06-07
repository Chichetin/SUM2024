class _vec3 {
  constructor(x, y, z) {
    if (x == undefined) (this.x = 0), (this.y = 0), (this.z = 0);
    else if (typeof x == "object")
      if (x.length == 3) (this.x = x[0]), (this.y = x[1]), (this.z = x[2]);
      else (this.x = x.x), (this.y = x.y), (this.z = x.z);
    else if (y == undefined && z == undefined)
      (this.x = x), (this.y = x), (this.z = x);
    else (this.x = x), (this.y = y), (this.z = z);
  }

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  add(v) {
    if (typeof v == "number") return vec3(this.x + v, this.y + v, this.z + v);
    return vec3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  sub(v) {
    if (typeof v == "number") return vec3(this.x - v, this.y - v, this.z - v);
    return vec3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  normalize() {
    let len = this.x * this.x + this.y * this.y + this.z * this.z;

    if (len != 0 && len != 1) {
      len = Math.sqrt(len);
      return vec3(this.x / len, this.y / len, this.z / len);
    }
    return vec3(this);
  }

  mul(v) {
    return vec3(this.x * v, this.y * v, this.z * v);
  }

  cross(v) {
    return vec3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x,
    );
  }

  MatrRotate(AngleInDegree, V) {
    let a = vec3(V).normalize;
    let c = Math.cos((AngleInDegree * pi) / 180);
    let s = Math.sin((AngleInDegree * pi) / 180);

    return MatrSet(
      c + a.X * a.X * (1 - c),
      a.X * a.Y * (1 - c) + a.Z * s,
      a.X * a.Z * (1 - c) - a.Y * s,
      0,
      -a.Z * s + a.Y * a.X * (1 - c),
      a.Y * a.Y * (1 - c) + c,
      a.Y * a.Z * (1 - c) + a.X * s,
      0,
      s * a.Y + a.Z * a.X * (1 - c),
      a.Z * a.Y * (1 - c) - a.X * s,
      a.Z * a.Z * (1 - c) + c,
      0,
      0,
      0,
      0,
      1,
    );
  }
  MatrRotate(AngleInDegree, V) {
    let a = vec3(V).normalize;
    let c = Math.cos((AngleInDegree * pi) / 180);
    let s = Math.sin((AngleInDegree * pi) / 180);

    return MatrSet(
      c + a.X * a.X * (1 - c),
      a.X * a.Y * (1 - c) + a.Z * s,
      a.X * a.Z * (1 - c) - a.Y * s,
      0,
      -a.Z * s + a.Y * a.X * (1 - c),
      a.Y * a.Y * (1 - c) + c,
      a.Y * a.Z * (1 - c) + a.X * s,
      0,
      s * a.Y + a.Z * a.X * (1 - c),
      a.Z * a.Y * (1 - c) - a.X * s,
      a.Z * a.Z * (1 - c) + c,
      0,
      0,
      0,
      0,
      1,
    );
  }

  MatrRotate(AngleInDegree) {
    let a = this.normalize;
    let c = Math.cos((AngleInDegree * pi) / 180);
    let s = Math.sin((AngleInDegree * pi) / 180);

    return [
      [
        c + a.X * a.X * (1 - c),
        a.X * a.Y * (1 - c) + a.Z * s,
        a.X * a.Z * (1 - c) - a.Y * s,
        0,
      ],
      [
        -a.Z * s + a.Y * a.X * (1 - c),
        a.Y * a.Y * (1 - c) + c,
        a.Y * a.Z * (1 - c) + a.X * s,
        0,
      ],
      [
        s * a.Y + a.Z * a.X * (1 - c),
        a.Z * a.Y * (1 - c) - a.X * s,
        a.Z * a.Z * (1 - c) + c,
        0,
      ],
      [0, 0, 0, 1],
    ];
  }
}

export default function vec3(...args) {
  return new _vec3(...args);
}
