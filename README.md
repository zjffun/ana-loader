<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]

# ana-loader

A webpack loader for analyzing dependencies. Support TypeScript, JSX, Vue, AMD, CJS, ESM, CSS, Sass, Scss, Less and Stylus.

## Getting Started

To begin, you'll need to install `ana-loader`:

```console
$ npm install ana-loader --save-dev
```

Then add the loader to your `webpack` config. For example:

**compile.js**

```js
const path = require('path');

const webpack = require('webpack');

const config = {
  mode: 'none',
  devtool: false,
  entry: path.resolve(__dirname, './index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        loader: require.resolve('ana-loader'),
      },
    ],
  },
};

const compiler = webpack(config);

compiler.run((error, stats) => {
  const { modules } = stats.toJson();
  const result = modules.map((m) => {
    return {
      id: m.name,
      reasons: m.reasons.map((r) => r.moduleName),
    };
  });

  console.log(result);
  /*
    [
      { id: './index.js', reasons: [ null ] },
      { id: './test.js', reasons: [ './index.js' ] },
      { id: './test1.css', reasons: [ './index.js' ] },
      { id: './test2.css', reasons: [ './test1.css' ] },
      { id: './test.png', reasons: [ './test1.css' ] },
      { id: 'webpack/runtime/compat get default export', reasons: [] },
      { id: 'webpack/runtime/define property getters', reasons: [] },
      { id: 'webpack/runtime/hasOwnProperty shorthand', reasons: [] },
      { id: 'webpack/runtime/make namespace object', reasons: [] }
    ]
   */
});
```

And run `node compile.js` to get dependencies info.

## Options

### `excludes`

Type: `array`
Default: `[/node_modules/]`

Exclude finding dependencies in these conditions.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        loader: `ana-loader`,
        options: {
          excludes: [/node_modules/, /test/],
        },
      },
    ],
  },
};
```

## [Examples](./example)

Get dependencies info from stats.

**index.js**

```js
import './test.js';
import './test1.css';

// ...
```

**test.js**

```js
// ...
```

**test1.css**

```css
@import './test2.css';

.test {
  background: url('./test.png');
}
/* ... */
```

**test2.css**

```css
/* ... */
```

**test.png**

Image.

**compile.js**

```js
const path = require('path');

const webpack = require('webpack');

const config = {
  mode: 'none',
  devtool: false,
  entry: path.resolve(__dirname, './index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        loader: require.resolve('ana-loader'),
      },
    ],
  },
};

const compiler = webpack(config);

compiler.run((error, stats) => {
  const { modules } = stats.toJson();
  const result = modules.map((m) => {
    return {
      id: m.name,
      reasons: m.reasons.map((r) => r.moduleName),
    };
  });

  console.log(result);
  /*
    [
      { id: './index.js', reasons: [ null ] },
      { id: './test.js', reasons: [ './index.js' ] },
      { id: './test1.css', reasons: [ './index.js' ] },
      { id: './test2.css', reasons: [ './test1.css' ] },
      { id: './test.png', reasons: [ './test1.css' ] },
      { id: 'webpack/runtime/compat get default export', reasons: [] },
      { id: 'webpack/runtime/define property getters', reasons: [] },
      { id: 'webpack/runtime/hasOwnProperty shorthand', reasons: [] },
      { id: 'webpack/runtime/make namespace object', reasons: [] }
    ]
   */
});
```

## License

[MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/ana-loader.svg
[npm-url]: https://npmjs.com/package/ana-loader
[node]: https://img.shields.io/node/v/ana-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/zjffun/ana-loader.svg
[deps-url]: https://david-dm.org/zjffun/ana-loader
[cover]: https://codecov.io/gh/zjffun/ana-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/zjffun/ana-loader
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=ana-loader
[size-url]: https://packagephobia.now.sh/result?p=ana-loader
