var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: [ './client/src/app.js' ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/client/public/dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [path.join(__dirname, '/client/src')],
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      },
      {
        test: /\.css$/, // have to include node modules for css b/c of react-widgets
        include: [path.join(__dirname, '/client/src')],
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(gif|jpe?g|png|ttf|eot|svg|woff2?)$/,
        include: [path.join(__dirname, '/public'), path.join(__dirname, '/node_modules')],
        loader: 'url-loader?name=[name].[ext]?limit=25000',
      },
      { test: /\.html$/, loader: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      inject: 'body',
      hash: true
    })
  ]
};
