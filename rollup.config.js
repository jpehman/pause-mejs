import typescript from "@rollup/plugin-typescript";
import terser from '@rollup/plugin-terser';
import pkg from './package.json' with { type: "json" };

export default [
  {
    input: 'src/pause-me.ts',
    output: [
      { file: pkg.main, format: 'umd', exports: "default", name: "pauseMe" },
      { file: pkg.common, format: 'cjs', exports: "default", name: "pauseMe" },
      { file: pkg.module, format: 'es', exports: "default", name: "pauseMe" }
    ],
    plugins: [
      typescript(),
      terser()
    ]
  },
]