import { readFileSync } from "fs";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8"));

export default [
  {
    input: "src/pause-me.ts",
    output: [
      { file: pkg.main, format: "umd", exports: "named", name: "pauseMe" },
      { file: pkg.common, format: "cjs", exports: "named", name: "pauseMe" },
      { file: pkg.module, format: "es", exports: "named", name: "pauseMe" }
    ],
    plugins: [
      typescript(),
      commonjs(),
      terser()
    ]
  },
]