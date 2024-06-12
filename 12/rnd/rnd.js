import { vec3, camera } from "../mth/def";
import { timer } from "../scripts/timer";

class _render {
  loadShader(shaderType, shaderSource) {
    const shader = this.gl.createShader(shaderType);
    this.gl.shaderSource(shader, shaderSource);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      let buf = this.gl.getShaderInfoLog(shader);
      console.log("Shader compile fail: " + buf);
    }
    return shader;
  }

  render() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
  }

  constructor(canvas) {
    let width = canvas.width;
    let height = canvas.height;

    this.timer = new timer();

    this.gl = canvas.getContext("webgl2");
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clearColor(1.0, 0.99, 0.6, 1);

    this.camera = camera(width, height, vec3(5), vec3(0), vec3(0, 1, 0));
  }
}

function render(canvas) {
  return new _render(canvas);
}

export default render;
