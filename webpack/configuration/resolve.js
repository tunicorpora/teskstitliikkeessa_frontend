export default {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: 'bundle.js',
  },
  extension: ['.js', '.jsx'],
  alias: {
    styles: 'src/components/main',
  },
};
