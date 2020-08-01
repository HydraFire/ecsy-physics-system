const path = require('path');
const webpack = require('webpack');

let entry, publicPath, plugins = [];



  entry = ['webpack-hot-middleware/client?path=http://localhost:80/__webpack_hmr&reload=true','./examples/simple-car.js']
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )



module.exports = {
  devtool: 'source-map',
  entry,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '/build'),
    publicPath: '/build'
  },
  mode: 'development',
  plugins,
  /*
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/react', '@babel/preset-env'], plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-syntax-dynamic-import'] }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  }
  */
};
