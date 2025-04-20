// webpack/webpack.uat.js
import { merge } from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
  mode: 'production',
  devtool: 'source-map', // You might want maps in UAT
  output: {
    publicPath: '/', // Could change to UAT URL if needed
  },
});
