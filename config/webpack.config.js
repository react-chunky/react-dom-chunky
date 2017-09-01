var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:3000',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './src/index.js',
    // the entry point of our app
  ],

  output: {
    filename: 'chunky.js',
    // the output bundle

    path: path.resolve(__dirname, 'public'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: [
            [require.resolve('babel-preset-es2015'), {
              modules: false
            }],
            require.resolve('babel-preset-react')
          ],
          plugins: [require.resolve('react-hot-loader/babel'),
          [require.resolve('babel-plugin-react-css-modules'), {
            context: path.resolve(__dirname, 'src'),
            filetypes: {
              ".scss": "postcss-scss"
            }
          }]]
        }
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss'
            }
          }
        ],
      }
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors
  ],

  devServer: {
    host: 'localhost',
    port: 3000,
    contentBase: './public',
    // By default files from `contentBase` will not trigger a page reload.
    watchContentBase: true,
    historyApiFallback: true,
    // respond to 404s with index.html

    hot: true,
    // enable HMR on the server
  },
};
