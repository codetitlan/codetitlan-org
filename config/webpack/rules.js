
const path = require('path');

const nodeModulesPath = path.resolve(__dirname, '../../node_modules');
const baseRules = [
  { // shims
    test: /\.shim\.js$/,
    use: ['script-loader'],
    exclude: nodeModulesPath,
  },
  { // eslint
    enforce: 'pre',
    test: /\.(js|jsx)$/,
    exclude: nodeModulesPath,
    use: [
      {
        loader: 'eslint-loader',
        options: {
          failOnError: true,
        },
      },
    ],
  },
  { // es6 and jsx
    test: /\.(js|jsx)$/,
    exclude: nodeModulesPath,
    use: [
      { loader: 'babel-loader' },
    ],
  },
  { // mdl
    test: require.resolve('material-design-lite/material'),
    loader: 'exports-loader?componentHandler',
  },
  { // SASS Style libs imports
    test: /src\/client\/styles\/libs\.scss/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      { loader: 'resolve-url-loader' },
      { loader: 'postcss-loader', options: { sourceMap: true } },
      { loader: 'sass-loader?sourceMap' },
    ],
    exclude: /node_modules/,
  },
  { // sass
    test: /\.(sass|scss)$/,
    use: [
      { loader: 'css-loader' },
      { loader: 'postcss-loader', options: { sourceMap: true } },
      { loader: 'resolve-url-loader', options: { sourceMap: true } },
      { loader: 'sass-loader', options: { sourceMap: true, outputStyle: 'compressed' } },
    ],
    exclude: [/node_modules/, /src\/client\/styles\/libs\.scss/],
  },
  { // sugarss
    test: /\.sss$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      { loader: 'postcss-loader', options: { parser: 'sugarss' } },
    ],
  },
  { // cssnext
    test: /\.css$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      { loader: 'postcss-loader' },
    ],
  },
  { // fonts
    test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
    use: [
      'file-loader?name=fonts/[name].[ext]',
    ],
  },
];

module.exports = { base: baseRules };
