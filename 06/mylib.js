let
  canvas,
  gl,
  timeLoc;    

// OpenGL initialization function  
export function initGL() {
  canvas = document.getElementById("myCan");
  gl = canvas.getContext("webgl2");
  gl.clearColor(0.30, 0.47, 0.8, 1);
  
  // Shader creation
  let vs_txt =
  `#version 300 es
  precision highp float;
  in vec3 InPosition;
    
  out vec2 DrawPos;
  uniform float Time;

  void main( void )
  {
    gl_Position = vec4(InPosition, 1);
    gl_Position.x += 0.1 * sin(Time);
    DrawPos = InPosition.xy;
  }
  `;
  let fs_txt =
  `#version 300 es
  precision highp float;
  out vec4 OutColor;
  
  in vec2 DrawPos;
  uniform float Time;

  void main( void )
  {
    float x = DrawPos.x * 0.8;
    float y = DrawPos.y * 0.9;
    float perx;
    float n = 1.0;
    while (sqrt(x * x + y * y) < 2.0 && n < 255.0)
    {
        perx = x * x - y * y + 0.37 + 0.10 * cos(Time * 0.6) * sin(Time * 0.2);
        y = 2.0 * x * y + 0.30 + 0.8 * sin(Time * 0.4) * sin(Time * 0.5);
        x = perx;
        n = n + 1.0;
    }
    OutColor = vec4(n / 255.0, n / 100.0 , n / 155.0 , 1);
  }
  `;
  let
    vs = loadShader(gl.VERTEX_SHADER, vs_txt),
    fs = loadShader(gl.FRAGMENT_SHADER, fs_txt),
    prg = gl.createProgram();
  gl.attachShader(prg, vs);
  gl.attachShader(prg, fs);
  gl.linkProgram(prg);
  if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
    let buf = gl.getProgramInfoLog(prg);
    console.log('Shader program link fail: ' + buf);
  }                                            

  // Vertex buffer creation
  const size = 0.8;
  const vertexes = [-size, size, 0, -size, -size, 0, size, size, 0, size, -size, 0];
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

  gl.useProgram(prg);
}  // End of 'initGL' function               

// Load and compile shader function
function loadShader(shaderType, shaderSource) {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    let buf = gl.getShaderInfoLog(shader);
    console.log('Shader compile fail: ' + buf);
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
    let t = date.getMinutes() * 60 +
            date.getSeconds() +
            date.getMilliseconds() / 1000;

    gl.uniform1f(timeLoc, t);
  }
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
} // End of 'render' function

console.log("CGSG forever!!! mylib.js imported");