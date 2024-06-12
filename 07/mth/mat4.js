function D2R(radian) {
  return (radian * Math.PI) / 180;
}

class _mat4 {
  constructor(m) {
    if (m == undefined) {
      this.m = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ];
      return;
    }
    if (m == null) {
      this.m = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ];
      return;
    }
    if (typeof m == "object" && m.length == 4) this.m = m;
    else this.m = m.m;
  }

  determ() {
    return (
      this.m[0][0] *
        mat3Determ(
          this.m[1][1],
          this.m[1][2],
          this.m[1][3],
          this.m[2][1],
          this.m[2][2],
          this.m[2][3],
          this.m[3][1],
          this.m[3][2],
          this.m[3][3],
        ) +
      -this.m[0][1] *
        mat3Determ(
          this.m[1][0],
          this.m[1][2],
          this.m[1][3],
          this.m[2][0],
          this.m[2][2],
          this.m[2][3],
          this.m[3][0],
          this.m[3][2],
          this.m[3][3],
        ) +
      this.m[0][2] *
        mat3Determ(
          this.m[1][0],
          this.m[1][1],
          this.m[1][3],
          this.m[2][0],
          this.m[2][1],
          this.m[2][3],
          this.m[3][0],
          this.m[3][1],
          this.m[3][3],
        ) +
      -this.m[0][3] *
        mat3Determ(
          this.m[1][0],
          this.m[1][1],
          this.m[1][2],
          this.m[2][0],
          this.m[2][1],
          this.m[2][2],
          this.m[3][0],
          this.m[3][1],
          this.m[3][2],
        )
    );
  } // End of 'determ' function

  /**
   * Matrix multiply function group
   */

  mul(m) {
    let r = mat4();

    r.m[0][0] =
      this.m[0][0] * m.m[0][0] +
      this.m[0][1] * m.m[1][0] +
      this.m[0][2] * m.m[2][0] +
      this.m[0][3] * m.m[3][0];
    r.m[0][1] =
      this.m[0][0] * m.m[0][1] +
      this.m[0][1] * m.m[1][1] +
      this.m[0][2] * m.m[2][1] +
      this.m[0][3] * m.m[3][1];
    r.m[0][2] =
      this.m[0][0] * m.m[0][2] +
      this.m[0][1] * m.m[1][2] +
      this.m[0][2] * m.m[2][2] +
      this.m[0][3] * m.m[3][2];
    r.m[0][3] =
      this.m[0][0] * m.m[0][3] +
      this.m[0][1] * m.m[1][3] +
      this.m[0][2] * m.m[2][3] +
      this.m[0][3] * m.m[3][3];

    r.m[1][0] =
      this.m[1][0] * m.m[0][0] +
      this.m[1][1] * m.m[1][0] +
      this.m[1][2] * m.m[2][0] +
      this.m[1][3] * m.m[3][0];
    r.m[1][1] =
      this.m[1][0] * m.m[0][1] +
      this.m[1][1] * m.m[1][1] +
      this.m[1][2] * m.m[2][1] +
      this.m[1][3] * m.m[3][1];
    r.m[1][2] =
      this.m[1][0] * m.m[0][2] +
      this.m[1][1] * m.m[1][2] +
      this.m[1][2] * m.m[2][2] +
      this.m[1][3] * m.m[3][2];
    r.m[1][3] =
      this.m[1][0] * m.m[0][3] +
      this.m[1][1] * m.m[1][3] +
      this.m[1][2] * m.m[2][3] +
      this.m[1][3] * m.m[3][3];

    r.m[2][0] =
      this.m[2][0] * m.m[0][0] +
      this.m[2][1] * m.m[1][0] +
      this.m[2][2] * m.m[2][0] +
      this.m[2][3] * m.m[3][0];
    r.m[2][1] =
      this.m[2][0] * m.m[0][1] +
      this.m[2][1] * m.m[1][1] +
      this.m[2][2] * m.m[2][1] +
      this.m[2][3] * m.m[3][1];
    r.m[2][2] =
      this.m[2][0] * m.m[0][2] +
      this.m[2][1] * m.m[1][2] +
      this.m[2][2] * m.m[2][2] +
      this.m[2][3] * m.m[3][2];
    r.m[2][3] =
      this.m[2][0] * m.m[0][3] +
      this.m[2][1] * m.m[1][3] +
      this.m[2][2] * m.m[2][3] +
      this.m[2][3] * m.m[3][3];

    r.m[3][0] =
      this.m[3][0] * m.m[0][0] +
      this.m[3][1] * m.m[1][0] +
      this.m[3][2] * m.m[2][0] +
      this.m[3][3] * m.m[3][0];
    r.m[3][1] =
      this.m[3][0] * m.m[0][1] +
      this.m[3][1] * m.m[1][1] +
      this.m[3][2] * m.m[2][1] +
      this.m[3][3] * m.m[3][1];
    r.m[3][2] =
      this.m[3][0] * m.m[0][2] +
      this.m[3][1] * m.m[1][2] +
      this.m[3][2] * m.m[2][2] +
      this.m[3][3] * m.m[3][2];
    r.m[3][3] =
      this.m[3][0] * m.m[0][3] +
      this.m[3][1] * m.m[1][3] +
      this.m[3][2] * m.m[2][3] +
      this.m[3][3] * m.m[3][3];

    return mat4(r);
  } // End of 'mul' fucntion.

  mul3(m1, m2) {
    return this.mul(m1.mul(m2));
  }

  mul4(m1, m2, m3) {
    return this.mul(m1.mul3(m2, m3));
  }

  mul5(m1, m2, m3, m4) {
    return this.mul(m1.mul4(m2, m3, m4));
  }

  mul6(m1, m2, m3, m4, m5) {
    return this.mul(m1.mul5(m2, m3, m4, m5));
  }

  /**
   * Matrix inverse function.
   * ARGUMENTS: None.
   * RETURNS: None.
   */
  inverse() {
    let r = mat4();
    let det = this.determ();

    if (det == 0) return r;

    r.m[0][0] =
      +mat3Determ(
        this.m[1][1],
        this.m[1][2],
        this.m[1][3],
        this.m[2][1],
        this.m[2][2],
        this.m[2][3],
        this.m[3][1],
        this.m[3][2],
        this.m[3][3],
      ) / det;
    r.m[1][0] =
      -mat3Determ(
        this.m[1][0],
        this.m[1][2],
        this.m[1][3],
        this.m[2][0],
        this.m[2][2],
        this.m[2][3],
        this.m[3][0],
        this.m[3][2],
        this.m[3][3],
      ) / det;
    r.m[2][0] =
      +mat3Determ(
        this.m[1][0],
        this.m[1][1],
        this.m[1][3],
        this.m[2][0],
        this.m[2][1],
        this.m[2][3],
        this.m[3][0],
        this.m[3][1],
        this.m[3][3],
      ) / det;
    r.m[3][0] =
      +mat3Determ(
        this.m[1][0],
        this.m[1][1],
        this.m[1][2],
        this.m[2][0],
        this.m[2][1],
        this.m[2][2],
        this.m[3][0],
        this.m[3][1],
        this.m[3][2],
      ) / det;

    r.m[0][1] =
      +mat3Determ(
        this.m[0][1],
        this.m[0][2],
        this.m[0][3],
        this.m[2][1],
        this.m[2][2],
        this.m[2][3],
        this.m[3][1],
        this.m[3][2],
        this.m[3][3],
      ) / det;
    r.m[1][1] =
      -mat3Determ(
        this.m[0][0],
        this.m[0][2],
        this.m[0][3],
        this.m[2][0],
        this.m[2][2],
        this.m[2][3],
        this.m[3][0],
        this.m[3][2],
        this.m[3][3],
      ) / det;
    r.m[2][1] =
      +mat3Determ(
        this.m[0][0],
        this.m[0][1],
        this.m[0][3],
        this.m[2][0],
        this.m[2][1],
        this.m[2][3],
        this.m[3][0],
        this.m[3][1],
        this.m[3][3],
      ) / det;
    r.m[3][1] =
      +mat3Determ(
        this.m[0][0],
        this.m[0][1],
        this.m[0][2],
        this.m[2][0],
        this.m[2][1],
        this.m[2][2],
        this.m[3][0],
        this.m[3][1],
        this.m[3][2],
      ) / det;

    r.m[0][2] =
      +mat3Determ(
        this.m[0][1],
        this.m[0][2],
        this.m[0][3],
        this.m[1][1],
        this.m[1][2],
        this.m[1][3],
        this.m[3][1],
        this.m[3][2],
        this.m[3][3],
      ) / det;
    r.m[1][2] =
      -mat3Determ(
        this.m[0][0],
        this.m[0][2],
        this.m[0][3],
        this.m[1][0],
        this.m[1][2],
        this.m[1][3],
        this.m[3][0],
        this.m[3][2],
        this.m[3][3],
      ) / det;
    r.m[2][2] =
      +mat3Determ(
        this.m[0][0],
        this.m[0][1],
        this.m[0][3],
        this.m[1][0],
        this.m[1][1],
        this.m[1][3],
        this.m[3][0],
        this.m[3][1],
        this.m[3][3],
      ) / det;
    r.m[3][2] =
      +mat3Determ(
        this.m[0][0],
        this.m[0][1],
        this.m[0][2],
        this.m[1][0],
        this.m[1][1],
        this.m[1][2],
        this.m[3][0],
        this.m[3][1],
        this.m[3][2],
      ) / det;

    r.m[0][3] =
      +mat3Determ(
        this.m[0][1],
        this.m[0][2],
        this.m[0][3],
        this.m[1][1],
        this.m[1][2],
        this.m[1][3],
        this.m[2][1],
        this.m[2][2],
        this.m[2][3],
      ) / det;
    r.m[1][3] =
      -mat3Determ(
        this.m[0][0],
        this.m[0][2],
        this.m[0][3],
        this.m[1][0],
        this.m[1][2],
        this.m[1][3],
        this.m[2][0],
        this.m[2][2],
        this.m[2][3],
      ) / det;
    r.m[2][3] =
      +mat3Determ(
        this.m[0][0],
        this.m[0][1],
        this.m[0][3],
        this.m[1][0],
        this.m[1][1],
        this.m[1][3],
        this.m[2][0],
        this.m[2][1],
        this.m[2][3],
      ) / det;
    r.m[3][3] =
      +mat3Determ(
        this.m[0][0],
        this.m[0][1],
        this.m[0][2],
        this.m[1][0],
        this.m[1][1],
        this.m[1][2],
        this.m[2][0],
        this.m[2][1],
        this.m[2][2],
      ) / det;

    return r;
  } // End of 'inverse' function

  /**
   * Matrix transpose function.
   * ARGUMENTS: None.
   * @returns transposed matrix.
   */
  transpose() {
    return mat4([
      [this.m[0][0], this.m[1][0], this.m[2][0], this.m[3][0]],
      [this.m[0][1], this.m[1][1], this.m[2][1], this.m[3][1]],
      [this.m[0][2], this.m[1][2], this.m[2][2], this.m[3][2]],
      [this.m[0][3], this.m[1][3], this.m[2][3], this.m[3][3]],
    ]);
  }
} // End of '_mat4' class.

/**
 * Matrix 3x3 determinant count function.
 * @param {*any} A11
 * @param {*any} A12
 * @param {*any} A13
 * @param {*any} A21
 * @param {*any} A22
 * @param {*any} A23
 * @param {*any} A31
 * @param {*any} A32
 * @param {*any} A33
 * @returns {*float} matrix determinant
 */
function mat3Determ(A11, A12, A13, A21, A22, A23, A31, A32, A33) {
  return (
    A11 * A22 * A33 +
    A12 * A23 * A31 +
    A13 * A21 * A32 -
    A11 * A23 * A32 -
    A12 * A21 * A33 -
    A13 * A22 * A31
  );
} // End of 'mat3Determ' function.

/**
 * Matrix 4x4 set function.
 * @param  {...any} mat
 * @returns
 */
function mat4(mat) {
  return new _mat4(mat);
}

mat4.rotate = (angle, vector) => {
  let a = D2R(angle),
    si = Math.sin(a),
    co = Math.cos(a);

  let v = vector.normalize();

  return mat4([
    [
      co + v.x * v.x * (1 - co),
      v.y * v.x * (1 - co) - v.z * si,
      v.z * v.x * (1 - co) + v.y * si,
      0,
    ],
    [
      v.x * v.y * (1 - co) + v.z * si,
      co + v.y * v.y * (1 - co),
      v.z * v.y * (1 - co) - v.x * si,
      0,
    ],
    [
      v.x * v.z * (1 - co) - v.y * si,
      v.y * v.z * (1 - co) + v.x * si,
      co + v.z * v.z * (1 - co),
      0,
    ],
    [0, 0, 0, 1],
  ]);
};

mat4.rotateX = (angle) => {
  let a = D2R(angle),
    si = Math.sin(a),
    co = Math.cos(a);

  return mat4([
    [1, 0, 0, 0],
    [0, co, si, 0],
    [0, -si, co, 0],
    [0, 0, 0, 1],
  ]);
};
mat4.rotateY = (angle) => {
  let a = D2R(angle),
    si = Math.sin(a),
    co = Math.cos(a);

  return mat4([
    [co, 0, -si, 0],
    [0, 1, 0, 0],
    [si, 0, co, 0],
    [0, 0, 0, 1],
  ]);
};
mat4.rotateZ = (angle) => {
  let a = D2R(angle),
    si = Math.sin(a),
    co = Math.cos(a);

  return mat4([
    [co, si, 0, 0],
    [-si, co, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ]);
};

mat4.translate = (v) => {
  return mat4([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [v.x, v.y, v.z, 1],
  ]);
};
mat4.scale = (v) => {
  return mat4([
    [v.x, 0, 0, 0],
    [0, v.y, 0, 0],
    [0, 0, v.z, 0],
    [0, 0, 0, 1],
  ]);
};
mat4.view = (loc, at, up) => {
  let dir = at.sub(loc).normalize(),
    right = dir.cross(up).normalize(),
    up_real = right.cross(dir).normalize();

  return mat4([
    [right.x, up_real.x, -dir.x, 0],
    [right.y, up_real.y, -dir.y, 0],
    [right.z, up_real.z, -dir.z, 0],
    [-loc.dot(right), -loc.dot(up_real), loc.dot(dir), 1],
  ]);
};
mat4.frustum = (left, right, bottom, top, near, far) => {
  return mat4([
    [(2 * near) / (right - left), 0, 0, 0],
    [0, (2 * near) / (top - bottom), 0, 0],
    [
      (right + left) / (right - left),
      (top + bottom) / (top - bottom),
      -(far + near) / (far - near),
      -1,
    ],
    [0, 0, -(2 * near * far) / (far - near), 0],
  ]);
};
mat4.ortho = (left, right, bottom, top, near, far) => {
  return mat4([
    [2 / (right - left), 0, 0, 0],
    [0, 2 / (top - bottom), 0, 0],
    [0, 0, -2 / (far - near), 0],
    [
      -(right + left) / (right - left),
      -(top + bottom) / (top - bottom),
      -(far + near) / (far - near),
      1,
    ],
  ]);
};

// test
export default mat4;
