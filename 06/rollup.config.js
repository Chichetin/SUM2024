import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "mylib.js",
  output: {
    dir: "output",
    format: "iife",
    sourcemap: "inline",
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
  ],
};
