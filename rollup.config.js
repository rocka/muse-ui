import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import minify from 'rollup-plugin-babel-minify';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import packageJson from './package.json';

const { name, version } = packageJson;
const banner = `/* ${name} myron.liu version ${version} */`;
const plugins = [
  postcss({
    extensions: ['.less'],
    extract: `dist/${name}.css`,
    minimize: true
  }),
  resolve({
    mainFields: ['module', 'jsnext:main', 'main'],
    browser: true
  }),
  commonjs({
    include: 'node_modules/**',
    namedExports: {
      'node_modules/body-scroll-lock/lib/bodyScrollLock.min.js': ['disableBodyScroll', 'enableBodyScroll', 'clearAllBodyScrollLocks']
    }
  }),
  replace({
    __VERSION__: version
  })
];

export default [{
  input: 'src/index.js',
  output: [{
    banner,
    file: `dist/${name}.common.js`,
    format: 'cjs',
    exports: 'named'
  }, {
    banner,
    file: `dist/${name}.esm.js`,
    format: 'es'
  }],
  plugins: plugins,
  external: ['vue']
}, {
  input: 'src/index.js',
  output: {
    file: `dist/${name}.js`,
    format: 'umd',
    name: 'MuseUI',
    exports: 'named',
    globals: {
      vue: 'Vue'
    }
  },
  plugins: [
    ...plugins,
    minify({
      comments: false
    }),
    babel({
      babelrc: false,
      include: 'src/**/*.js',
      runtimeHelpers: true
    })
  ],
  external: ['vue']
}];
