import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';

export default {
  input: 'main.js',
  context: 'window',
  output: [
    {
      file: '../card/js/bundle.js',
      format: 'esm',
    },
    {
      file: '../card/js/bundle.min.js',
      format: 'esm',
      plugins: [terser()],
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ]
};
