const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const analyzeBundle = false;

module.exports = (_, argv) => {
  const isProd = argv.mode === 'production';

  const config = {
    mode: isProd ? 'production' : 'development',
    entry: {
      index: path.resolve(__dirname, 'src', 'index.tsx'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `static/js/[name].${isProd ? '[contenthash]' : 'bundle'}.js`,
      chunkFilename: `static/js/[name].${isProd ? '[contenthash]' : 'bundle'}.js`,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
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
              loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
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
                name: `[name]${isProd ? '.[contenthash]' : ''}.[ext]`,
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
      splitChunks: isProd
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
      minimize: isProd,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
            compress: {
              drop_console: isProd,
            },
          },
        }),
      ],
    },
    plugins: [
      isProd ? new CleanWebpackPlugin() : undefined,
      isProd
        ? new MiniCssExtractPlugin({
            filename: `static/css/[name].[contenthash].css`,
          })
        : undefined,
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
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
    },
  };

  return config;
};
