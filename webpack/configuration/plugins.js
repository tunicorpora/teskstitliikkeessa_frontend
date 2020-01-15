import HtmlWebPackPlugin from "html-webpack-plugin";
const Dotenv = require("dotenv-webpack");
import CopyWebpackPlugin from "copy-webpack-plugin";

const plugins = [
  new HtmlWebPackPlugin({
    title: "Codejobs",
    template: "./src/index.html",
    filename: "./index.html"
  }),
  new CopyWebpackPlugin([{ from: "src/images", to: "images" }]),
  new Dotenv()
  // new BundleAnalyzerPlugin()
];

export default plugins;
