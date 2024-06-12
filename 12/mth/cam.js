import vec3 from "./vec3";
import mat4 from "./mat4";

// Camera class.
class _camera {
  constructor(width, height, loc, at, up) {
    this.projSize = 0.1;
    this.projDist = 0.1;
    this.farClip = 300;

    this.width = width;
    this.height = height;

    let rx = this.projSize,
      ry = this.projSize;

    if (width < height) rx *= width / height;
    else ry *= height / width;

    this.proj = mat4.frustum(
      -rx / 2,
      rx / 2,
      -ry / 2,
      ry / 2,
      this.projDist,
      this.farClip,
    );
    this.setPos(loc, at, up);
  }

  /**
   * Set camera function
   * @param {*vec3} loc
   * @param {*vec3} at
   * @param {*vec3} up
   */
  setPos(loc, at, up) {
    this.matView = mat4.view(loc, at, up);
    this.right = vec3(
      this.matView.m[0][0],
      this.matView.m[1][0],
      this.matView.m[2][0],
    );
    this.up = vec3(
      this.matView.m[0][1],
      this.matView.m[1][1],
      this.matView.m[2][1],
    );
    this.dir = vec3(
      -this.matView.m[0][2],
      -this.matView.m[1][2],
      -this.matView.m[2][2],
    );

    this.loc = loc;
    this.at = at;
    this.matVP = this.matView.mul(this.proj);
  } // End of 'setPos' function
} // end of '_camera' class

function camera(width, height, loc, at, up) {
  return new _camera(width, height, loc, at, up);
}

export default camera;
