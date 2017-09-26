var path = require('path')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (options) => {
  return {
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:' + options.port,
      'webpack/hot/only-dev-server',
       path.resolve(options.dir, 'node_modules', 'react-dom-chunky', 'app', 'index.js')
    ],

    output: {
      filename: 'chunky.js',
      path: path.resolve(options.dir, 'web', 'build'),
      publicPath: '/'
    },

    devtool: 'inline-source-map',

    resolve: {
      extensions: ['.js', '.json'],
      modules: [
        path.resolve(options.dir),
        "node_modules"
      ]
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            path.resolve(options.dir, "node_modules", "react-chunky"),
            path.resolve(options.dir, "node_modules", "react-dom-chunky"),
            path.resolve(options.dir, "chunks")
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [path.resolve(options.dir, 'node_modules', 'babel-preset-es2015'), {
                  modules: false
                }],
                path.resolve(options.dir, 'node_modules', 'babel-preset-react'),
                path.resolve(options.dir, 'node_modules', 'babel-preset-stage-2')
              ],
              plugins: [
                require.resolve('react-hot-loader/babel')
              ]
            }
          }
        }
      ]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new CopyWebpackPlugin([
        { from:   path.resolve(options.dir, 'assets', to: 'assets') }
      ])
    ],

    devServer: {
      host: 'localhost',
      port: options.port,
      contentBase: path.resolve(options.dir, 'web', 'public'),
      watchContentBase: true,
      historyApiFallback: true,
      hot: true
    }
  }
}
