import babel from '@rollup/plugin-babel'
import esbuild from 'rollup-plugin-esbuild'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import filesize from 'rollup-plugin-filesize'
import progress from 'rollup-plugin-progress'
import json from 'rollup-plugin-json'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'
import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.exports.require,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.exports.import,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: './dist/index.iife.js',
      format: 'iife',
      name: 'ReactICD10',
      globals: {
        react: 'React',
      },
      sourcemap: true,
    },
  ],
  plugins: [
    json(),
    external(),
    url(),
    svgr(),
    postcss({ modules: true }),
    resolve({
      extensions: ['.js'],
      moduleDirectories: ['node_modules'],
      preferBuiltins: true,
    }),
    filesize(),
    progress(),
    babel({
      extensions: ['.js'],
      babelHelpers: 'runtime',
      presets: ['@babel/preset-env'],
      plugins: ['@babel/transform-runtime'],
    }),
    esbuild({
      experimentalBundling: true,
      include: /\.[t]s?$/,
      exclude: /node_modules/,
      minify: process.env.NODE_ENV !== 'development',
      target: 'es2020',
      sourceMap: true,
    }),
  ],
}
