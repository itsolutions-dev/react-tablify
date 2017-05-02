var path = require('path');

module.exports = [{
  test: /\.js$/,
  loader: 'babel-loader',
  include: path.join(__dirname, 'src'),
}, {
  test: /\.json$/,
  loader: 'json-loader',
}, {
  test: /\.woff(\?\S*)?$/,
  loader: 'url-loader?limit=10000&mimetype=application/font-woff',
}, {
  test: /\.woff2(\?\S*)?$/,
  loader: 'url-loader?limit=10000&mimetype=application/font-woff2',
}, {
  test: /\.(ttf|otf)(\?\S*)?$/,
  loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
}, {
  test: /\.eot(\?\S*)?$/,
  loader: 'file-loader',
}, {
  test: /\.(jpe?g|png|gif|svg|ico)$/i,
  loaders: [
    'file-loader?name=[name]-[hash].[ext]',
    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
  ],
}];
