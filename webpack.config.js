import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// Get __dirname equivalent in ES module
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),  // Ensure this is an absolute path
    clean: true,
    publicPath: '/',
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: './public',
    historyApiFallback: true,
    hot: true,
    port: 3000,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
