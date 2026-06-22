const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const { isGitHubPages, leftUrl } = require('./config');
const { shared } = require('./webpack.shared');

// Absolute publicPath in dev so async chunks load from this remote's origin, not the host.
const publicPath = isGitHubPages ? '/' + process.env.GITHUB_REPOSITORY.split('/')[1] + '/left/' : `${leftUrl}/`;

module.exports = {
  entry: './src/left/bootstrap',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist/left'),
    filename: '[name].js',
    clean: true,
    publicPath: publicPath,
  },
  devServer: {
    port: 3002,
    static: {
      directory: path.join(__dirname, 'src/left'),
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
      name: 'left',
      filename: 'remoteEntry.js',
      exposes: {
        './LeftPanel': './src/left/LeftPanel',
      },
      shared,
    }),
    new HtmlWebpackPlugin({
      template: './src/left/index.html',
      filename: 'index.html',
    }),
  ],
};
