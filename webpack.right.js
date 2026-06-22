const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const { isGitHubPages, rightUrl } = require('./config');
const { shared } = require('./webpack.shared');

// Absolute publicPath in dev so async chunks load from this remote's origin, not the host.
const publicPath = isGitHubPages ? '/' + process.env.GITHUB_REPOSITORY.split('/')[1] + '/right/' : `${rightUrl}/`;

module.exports = {
  entry: './src/right/bootstrap',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist/right'),
    filename: '[name].js',
    clean: true,
    publicPath: publicPath,
  },
  devServer: {
    port: 3004,
    static: {
      directory: path.join(__dirname, 'src/right'),
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
      name: 'right',
      filename: 'remoteEntry.js',
      exposes: {
        './RightPanel': './src/right/RightPanel',
      },
      shared,
    }),
    new HtmlWebpackPlugin({
      template: './src/right/index.html',
      filename: 'index.html',
    }),
  ],
};
