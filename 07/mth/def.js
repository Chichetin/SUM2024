import vec3 from "./vec3";
import mat4 from "./mat4";
import camera from "./cam";

export { vec3, mat4, camera };

export function R2D(degree) {
  return (degree * 180) / Math.PI;
}

export function D2R(radian) {
  return (radian * Math.PI) / 180;
}
