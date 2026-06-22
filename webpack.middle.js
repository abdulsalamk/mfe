const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const { isGitHubPages, middleUrl } = require('./config');
const { shared } = require('./webpack.shared');

// Absolute publicPath in dev so async chunks load from this remote's origin, not the host.
const publicPath = isGitHubPages ? '/' + process.env.GITHUB_REPOSITORY.split('/')[1] + '/middle/' : `${middleUrl}/`;

module.exports = {
  entry: './src/middle/bootstrap',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist/middle'),
    filename: '[name].js',
    clean: true,
    publicPath: publicPath,
  },
  devServer: {
    port: 3003,
    static: {
      directory: path.join(__dirname, 'src/middle'),
    },
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
    compress: true,
    allowedHosts: 'all',
    client: {
      overlay: false,
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'middle',
      filename: 'remoteEntry.js',
      exposes: {
        './MiddlePanel': './src/middle/MiddlePanel',
      },
      shared,
    }),
    new HtmlWebpackPlugin({
      template: './src/middle/index.html',
      filename: 'index.html',
    }),
  ],
};
