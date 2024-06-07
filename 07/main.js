import { Pane } from "tweakpane/dist/tweakpane.js";

import { f } from "./scripts/scripts.js";
let canvas,
  gl,
  timeLoc,
  mxLoc,
  myLoc,
  mx = 0,
  my = 0,
  isLoupedLoc,
  isLouped = 0,
  blk_loc;
let frameBuffer;
const frameUniformbufferIndex = 5;

// OpenGL initialization function
export function initGL() {
  canvas = document.getElementById("myCan");
  gl = canvas.getContext("webgl2");
  gl.clearColor(0.3, 0.47, 0.8, 1);

  // Shader creation
  let vs_txt = `#version 300 es
  precision highp float;
  in vec3 InPosition;
  
  uniform FrameBuffer
  {
    vec4 Data;
  };

  out vec2 DrawPos;
  uniform float Time;
  uniform float mx, my;
  uniform float isLouped;

  void main( void )
  {
    gl_Position = vec4(InPosition, 1);
    float x = InPosition.x;
    float y = InPosition.y;

   // gl_Position.x += 0.1 * sin(Time);
    //if ((mx - x) * (mx - x) + (my - y) * (my - y) < 0.5){
      //x = (x + mx) / 4.0;
     // y = (y + my) / 4.0;
   // }
    
    DrawPos = vec2(x, y);
  }
  `;
  let fs_txt = `#version 300 es
  precision highp float;
  out vec4 OutColor;
  
  in vec2 DrawPos;
  uniform float Time;
  uniform float mx, my;
  uniform float isLouped;

  uniform FrameBuffer
  {
    vec4 Data;
  };

  void main( void )
  {
    float x = DrawPos.x ;
    float y = DrawPos.y ;
    float perx;
    float n = 1.0;
    if (isLouped == 0.0 && abs(DrawPos.x - mx) < 0.2 && abs(DrawPos.y - my) < 0.2)
    {
      x = mx + (x - mx) / 2.0;
      y = my + (y - my) / 2.0;
    }
    while (sqrt(x * x + y * y) < 2.0 && n < 255.0)
    {
        perx = x * x - y * y + 0.37 + my * 0.10 * cos(Time * 0.6) * sin(Time * 0.2);
        y = 2.0 * x * y + 0.30 + mx * 0.8 * sin(Time * 0.4) * sin(Time * 0.5);
        x = perx;
        n = n + 1.0;
    }
    OutColor = vec4(n / 255.0, n / 100.0 , n / 155.0 , 1);
  }
  `;
  let vs = loadShader(gl.VERTEX_SHADER, vs_txt),
    fs = loadShader(gl.FRAGMENT_SHADER, fs_txt),
    prg = gl.createProgram();
  gl.attachShader(prg, vs);
  gl.attachShader(prg, fs);
  gl.linkProgram(prg);
  if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
    let buf = gl.getProgramInfoLog(prg);
    console.log("Shader program link fail: " + buf);
  }

  // Vertex buffer creation
  const size = 0.8;
  const vertexes = [
    -size,
    size,
    0,
    -size,
    -size,
    0,
    size,
    size,
    0,
    size,
    -size,
    0,
  ];
  const posLoc = gl.getAttribLocation(prg, "InPosition");
  let vertexArray = gl.createVertexArray();
  gl.bindVertexArray(vertexArray);
  let vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexes), gl.STATIC_DRAW);
  if (posLoc != -1) {
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posLoc);
  }

  // Uniform data
  timeLoc = gl.getUniformLocation(prg, "Time");
  mxLoc = gl.getUniformLocation(prg, "mx");
  myLoc = gl.getUniformLocation(prg, "my");
  isLoupedLoc = gl.getUniformLocation(prg, "isLouped");
  // UBO

  frameBuffer = gl.createBuffer();
  gl.bindBuffer(gl.UNIFORM_BUFFER, frameBuffer);
  gl.bufferData(gl.UNIFORM_BUFFER, 4 * 4, gl.STATIC_DRAW);

  //  gl.bufferData(gl.UNIFORM_BUFFER, new Float32Array(), gl.STATIC_DRAW);

  gl.useProgram(prg);
  gl.uniformBlockBinding(
    prg,
    gl.getUniformBlockIndex(prg, "FrameBuffer"),
    frameUniformbufferIndex,
  );
} // End of 'initGL' function

// Load and compile shader function
function loadShader(shaderType, shaderSource) {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    let buf = gl.getShaderInfoLog(shader);
    console.log("Shader compile fail: " + buf);
  }
  return shader;
} // End of 'loadShader' function

let x = 1;

// Main render frame function
export function render() {
  // console.log(`Frame ${x++}`);
  gl.clear(gl.COLOR_BUFFER_BIT);
  if (timeLoc != -1) {
    const date = new Date();
    let t =
      date.getMinutes() * 60 +
      date.getSeconds() +
      date.getMilliseconds() / 1000;

    gl.uniform1f(timeLoc, t);
  }
  if (mxLoc != -1 && myLoc != -1) {
    gl.uniform1f(mxLoc, mx);
    gl.uniform1f(myLoc, my);
  }
  gl.uniform1f(isLoupedLoc, isLouped);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
} // End of 'render' function

export function setMousePos(x, y) {
  mx = x / 500.0 - 1.0;
  my = -(y / 500.0 - 1.0);
}
console.log("CGSG forever!!! mylib.js imported");

window.addEventListener("load", () => {
  document.getElementById("myCan").addEventListener("mousemove", (e) => {
    setMousePos(e.offsetX, e.offsetY);
  });
  window.addEventListener("keydown", (e) => {
    if (e.key == " ") {
      e.preventDefault();
      isLouped = 1.0 - isLouped;
    }
  });

  initGL();
  const pane = new Pane();
  const PARAMS = {
    background: { r: 1.0, g: 0, b: 0.3 },
  };
  pane.addBinding(PARAMS, "background", {
    color: { type: "float" },
  });
  const draw = () => {
    render();

    window.requestAnimationFrame(draw);
  };
  draw();
});
