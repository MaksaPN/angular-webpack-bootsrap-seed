const ngtools = require('@ngtools/webpack');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
let pathForOutput = path.resolve(__dirname, 'src', 'dist');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    main: './src/main-aot.ts'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  target: 'node',

  output: {
    path: pathForOutput,
    filename: 'build.js'
  },

  plugins: [
    new ngtools.AotPlugin({
      tsConfigPath: './tsconfig-aot.json'
    }),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    new CopyWebpackPlugin([
      { from: 'src/assets/', to: 'assets' }
    ]),
  ],

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.component\.css$/,
        use: ['raw-loader']
      },
      {
        test: /\.css$/,
        exclude: /\.component\.css$/,
        use: ['style-loader']
      },
      { test: /\.html$/, use: 'raw-loader' },
      { test: /\.ts$/, use: '@ngtools/webpack' }
    ]
  }
}
