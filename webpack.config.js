const path = require('path');

module.exports = {
  entry: './src/main.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query:
        {
          presets:['react']
        }
      }
    ],
  },
};
