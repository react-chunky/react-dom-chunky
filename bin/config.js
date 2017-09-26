var path = require('path')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (options) => {
  return {
    entry: [
       path.resolve(options.dir, 'node_modules', 'react-dom-chunky', 'app', 'index.js')
    ],

    output: {
      filename: 'chunky.js',
      path: path.resolve(options.dir, 'web', 'build'),
      publicPath: '/'
    },

    devtool: 'source-map',

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
              ]
            }
          }
        }
      ]
    },

    plugins: [
      new CopyWebpackPlugin([
        { from: path.resolve(options.dir, 'assets'), to: 'assets' }
      ]),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        comments: false
      })
    ]
  }
}
