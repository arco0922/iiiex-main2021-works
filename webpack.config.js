const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
      filename: 'static/js/[name].[contenthash].js',
      chunkFilename: 'static/js/[name].[contenthash].js',
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          use: [
            {
              loader: 'ts-loader',
            },
          ],
          exclude: /node_modules/,
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
          test: /\.(gif|png|jpg|jpeg|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[contenthash].[ext]',
                outputPath: 'static/images',
              },
            },
          ],
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
      new CleanWebpackPlugin(),
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
