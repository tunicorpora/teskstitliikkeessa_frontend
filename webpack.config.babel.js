import { module, plugins, resolve } from './webpack/configuration';

export default {
  module,
  plugins,
  resolve,
  entry: {
    main: './src/index.jsx',
    icon: './src/components/ui/icon',
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].bundle.js',
    // publicPath: https://puolukka.rd.tuni.fi/tekstitliikkeessa/
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
  },
};
