import { Pane } from "tweakpane/dist/tweakpane.js";
import { f } from "./scripts/scripts.js";
import { vec3 } from "./mth/vec3.js";
let canvas,
  gl,
  timeLoc,
  mxLoc,
  myLoc,
  mx = 1,
  my = 1,
  isLoupedLoc,
  isLouped = 0,
  R = 0.2,
  upscale = 2.0;
let frameBuffer;
let frameData = [0, 0, 0, 0];
const frameUniformBufferIndex = 5;

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
  
 uniform FrameBuffer
  {
    vec4 Data;
  };

  in vec2 DrawPos;
  uniform float Time;
  uniform float mx, my;
  uniform float isLouped;
 
  float Julia(float x, float y)
  {
  float perx;
    float n = 1.0;
    
    while (sqrt(x * x + y * y) < 2.0 && n < 255.0)
    {
        perx = x * x - y * y + 0.37 + my * 0.10 * cos(Time * 0.6) * sin(Time * 0.2);
        y = 2.0 * x * y + 0.30 + mx * 0.8 * sin(Time * 0.4) * sin(Time * 0.5);
        x = perx;
        n = n + 1.0;
    }
    
    return n;
  }

  float Maldebrot(float x, float y)
  {
  float perx;
    float n = 1.0;
    float osx = x, osy = y;


    while (sqrt(x * x + y * y) < 2.0 && n < 255.0)
    {
        perx = x * x - y * y + 0.37 + osx * 0.10 * cos(Time * 0.6) * sin(Time * 0.2);
        y = 2.0 * x * y + 0.30 + osy * 0.8 * sin(Time * 0.4) * sin(Time * 0.5);
        x = perx;
        n = n + 1.0;
    }
    
    return n;
  }

  void main( void )
  {
    float x = DrawPos.x;
    float y = DrawPos.y;
    float R = Data.x;
    float upscale = Data.y;

    if (isLouped == 0.0 && abs(DrawPos.x - mx) < R && abs(DrawPos.y - my) < R)
    {
      x = mx + (x - mx) / upscale;
      y = my + (y - my) / upscale;
    }
    
    float n = Maldebrot(x, y);
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
  frameData[0] = R;
  frameData[1] = upscale;
  frameBuffer = gl.createBuffer();
  gl.bindBuffer(gl.UNIFORM_BUFFER, frameBuffer);
  gl.bufferData(gl.UNIFORM_BUFFER, 4 * 4, gl.STATIC_DRAW);

  //  gl.bufferData(gl.UNIFORM_BUFFER, new Float32Array(), gl.STATIC_DRAW);

  gl.useProgram(prg);
  gl.uniformBlockBinding(
    prg,
    gl.getUniformBlockIndex(prg, "FrameBuffer"),
    frameUniformBufferIndex,
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

  //Setup frame buffer data
  gl.bindBuffer(gl.UNIFORM_BUFFER, frameBuffer);
  gl.bufferData(gl.UNIFORM_BUFFER, new Float32Array(frameData), gl.STATIC_DRAW);
  gl.bindBufferBase(gl.UNIFORM_BUFFER, frameUniformBufferIndex, frameBuffer);

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
    switch (e.key) {
      case " ":
        e.preventDefault();
        isLouped = 1.0 - isLouped;
        break;

      case "l":
        R *= 1.1;
        frameData[0] = R;
        break;

      case "j":
        R = Math.max(0.1, R * 0.91);
        frameData[0] = R;
        break;

      case "i":
        upscale *= 1.1;
        frameData[1] = upscale;
        break;
      case "k":
        upscale = Math.max(upscale * 0.91, 0.1);
        frameData[1] = upscale;
        break;
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
