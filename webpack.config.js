// webpack.config.js
const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const isProduction = process.env.NODE_ENV && process.env.NODE_ENV === 'production';

const vendorFiles = [
  'react-dom',
  'react'
];


const rules = [
  {
    test: /\.js$/,
    include: path.resolve(__dirname, 'src'),
    use: [{
      loader: 'babel-loader'
    }]
  },
  {
    test: /\.(png|jpg|)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 10000,
      name: 'img/[path]/[name].[hash:8].[ext]'
    }
  }
];

if (isProduction) {
  rules.push({
    test: /\.css$/,
    exclude: '/node_modules/',
    use: ExtractTextPlugin.extract({
      fallback: [{
        loader: 'style-loader',
      }],
      use: [{
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[name]__[local]--[hash:base64:5]',
        },
      }, {
        loader: 'postcss-loader',
      }],
    }),
  });
}
else {
  rules.push({
    test: /\.css$/,
    exclude: '/node_modules/',
    loaders: [
      'style-loader',
      'css-loader?modules&importLoaders=1',
      'postcss-loader'
    ]
  });
}



const config = {
  devtool: 'source-map',
  context: path.resolve(__dirname, 'src'),
  entry: {
   app: './app.js',
   vendor: vendorFiles,
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    // publicPath: "/public/",
    filename: 'bundle-[hash].js'
  },
  module: {
    rules: rules,
  },
  plugins: [
    new DashboardPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor-[hash].js',
    }),
    new webpack.DefinePlugin({
      // 'process.env': {
      //   NODE_ENV: JSON.stringify(nodeEnv),
      // },
    }),
    new ExtractTextPlugin('bundle-[hash].min.css'),
    new HtmlWebpackPlugin({ template: __dirname + "/src/index.html" }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 8080,
    historyApiFallback: true,
    inline: true
  }
};

module.exports = config;