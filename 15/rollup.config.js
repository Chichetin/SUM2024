import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "index.js",
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
