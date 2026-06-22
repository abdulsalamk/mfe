const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const { isGitHubPages, leftUrl, middleUrl, rightUrl } = require('./config');
const { shared, hostShared } = require('./webpack.shared');

const publicPath = isGitHubPages ? '/' + process.env.GITHUB_REPOSITORY.split('/')[1] + '/' : '/';

module.exports = {
  entry: './src/host/bootstrap',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist/host'),
    filename: '[name].js',
    clean: true,
    publicPath: publicPath,
  },
  devServer: {
    port: 3001,
    static: {
      directory: path.join(__dirname, 'src/host'),
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
      name: 'host',
      remotes: {
        left: `left@${leftUrl}/remoteEntry.js`,
        middle: `middle@${middleUrl}/remoteEntry.js`,
        right: `right@${rightUrl}/remoteEntry.js`,
      },
      shared: hostShared,
    }),
    new HtmlWebpackPlugin({
      template: './src/host/index.html',
      filename: 'index.html',
    }),
  ],
};
