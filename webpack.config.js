const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const analyzeBundle = false;

module.exports = (_, argv) => {
  /** phaseは、local | development | production */
  const phase = argv.env.phase;

  /** modeは、phaseがlocalならdevelopment、それ以外ならproduction */
  const mode = phase === 'local' ? 'development' : 'production';

  /** isBuildは、modeがproductionかどうか */
  const isBuild = mode === 'production';

  /** 環境変数の設定 */
  const envConfig = require('dotenv').config({
    path: path.resolve(__dirname, `./config/.env.${phase}`),
  });

  const config = {
    mode: mode,
    entry: {
      index: path.resolve(__dirname, 'src', 'index.tsx'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `static/js/[name].${isBuild ? '[contenthash]' : 'bundle'}.js`,
      chunkFilename: `static/js/[name].${isBuild ? '[contenthash]' : 'bundle'}.js`,
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'ts-loader',
            },
          ],
          exclude: /[\\/]node_modules[\\/]/,
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
            },
          ],
        },
        {
          test: /[\\/]public[\\/]/,
          type: 'asset/resource',
          exclude: /\.html$/,
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: isBuild ? MiniCssExtractPlugin.loader : 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
          exclude: /[\\/]public[\\/]/,
        },
        {
          test: /\.(ico|gif|png|jpg|jpeg|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: `[name]${isBuild ? '.[contenthash]' : ''}.[ext]`,
                outputPath: 'static/images',
              },
            },
          ],
          exclude: /[\\/]public[\\/]/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, 'tsconfig.json') })],
    },
    optimization: {
      splitChunks: isBuild
        ? {
            cacheGroups: {
              default: false,
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                chunks: 'all',
              },
            },
          }
        : false,
      minimize: isBuild,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
            compress: {
              drop_console: isBuild,
            },
          },
        }),
      ],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './src/assets'),
            to: 'static/assets',
          },
        ],
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify({
          ...envConfig.parsed,
        }),
      }),
      isBuild ? new CleanWebpackPlugin() : undefined,
      isBuild
        ? new MiniCssExtractPlugin({
            filename: `static/css/[name].[contenthash].css`,
          })
        : undefined,
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
        // templateParameters: { G_ID: process.env.G_ID, UA_ID: process.env.UA_ID },
      }),
      analyzeBundle ? new BundleAnalyzerPlugin() : undefined,
    ].filter((plugin) => plugin),
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      port: 3000,
      compress: true,
      hot: true,
      open: true,
      historyApiFallback: true,
    },
  };

  return config;
};
