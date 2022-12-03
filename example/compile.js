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
