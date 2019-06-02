// import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import { DefinePlugin } from 'webpack';

const plugins = [
  new HtmlWebPackPlugin({
    title: 'Codejobs',
    template: './src/index.html',
    filename: './index.html',
  }),
  new DefinePlugin({
    // Dynamically access local environment variables based on the environment
    ENV: JSON.stringify(require('../../config')),
    'process.env': {
      // defaults the environment to development if not specified
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    },
  }),
];

export default plugins;
