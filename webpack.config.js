const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/'
  },
  mode: 'development',
  devServer: {
    static: './dist',
    port: 5600,
    open: true, 
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new Dotenv({
      systemvars: true,
      silent: true
    })
  ],
  
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
