import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "main.js",
  output: {
    dir: "output",
    format: "iife",
    sourcemap: "inline",
    name: "MyBundle",
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
  ],
};
