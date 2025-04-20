// webpack/webpack.dev.js
import { merge } from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: './public',
    historyApiFallback: true,
    hot: true,
    port: 3000,
  },
});
