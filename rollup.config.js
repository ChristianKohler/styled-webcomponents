import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import pkg from './package.json';

const name = 'styledWebcomponents';

const extensions = [".ts", ".tsx"];
const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1"
      },
      useBuiltIns: "usage"
    }
  ],
  "@babel/preset-typescript"
];

module.exports = {
  input: "src/index.ts",
  output: [{
    file: pkg.main,
    format: 'cjs',
  }, {
    file: pkg.module,
    format: 'es',
  }, {
    file: pkg.browser,
    format: 'iife',
    name,
    globals: {},
  }],
  plugins: [
    babel({
      exclude: "node_modules/**",
      extensions,
      presets
    }),
    resolve({
      extensions
    })
  ]
};
