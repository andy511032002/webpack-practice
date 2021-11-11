const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// webpack --env=production  --output-path aaaa
// 透過argv 取得參數  使用  --output-path 改寫輸出的資料夾位置（預設是dist底下）

module.exports = (env, argv) => {
  console.log('---------')
  console.log(env)
  console.log('--=========')
  console.log(argv)
  return ({
    mode: env.production ? "production" : "development",
    entry: {
      main: path.resolve(__dirname, './src/js/joseph.js')
    },
    output: env.production
    ? {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].prod.[contenthash:8].js',
      }
    : {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].develope.[contenthash:8].js',
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader, 
            'css-loader', 
            'postcss-loader',
            'sass-loader'
          ],
        },
  
        // JavaScript
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        // Images
        {
          test: /\.(png|jpg|gif)$/,
          use: [
              {
                  loader: 'file-loader',
                  options: {
                      name: '[path][name].[ext]',
                      context: path.resolve(__dirname, "src/"),
                      publicPath: '../',
                      useRelativePaths: true
                  }
              }
          ] 
        },
  
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'andy joseph',
        template: path.resolve(__dirname, './src/index.html'), // template file
        filename: 'index.html', // output file
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name]-[contenthash:8].css',
      })

    ],

  })
};

// = {
//   mode: 'production',
//   entry: {
//     main: path.resolve(__dirname, './src/js/joseph.js'),
//   },
//   output: {
//     path: path.resolve(__dirname, './dist'),
//     filename: '[name].bundle.js',
//   },
  // module: {
  //   rules: [

  //     {
  //       test: /\.s[ac]ss$/i,
  //       use: [
  //         MiniCssExtractPlugin.loader, 
  //         'css-loader', 
  //         'postcss-loader',
  //         'sass-loader'
  //       ],
  //     },

  //     JavaScript
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       use: ['babel-loader'],
  //     },
  //     Images
  //     {
  //       test: /\.(png|jpg|gif)$/,
  //       use: [
  //           {
  //               loader: 'file-loader',
  //               options: {
  //                   name: '[path][name].[ext]',
  //                   context: path.resolve(__dirname, "src/"),
  //                   outputPath: 'dist/',
  //                   publicPath: '../',
  //                   useRelativePaths: true
  //               }
  //           }
  //       ] 
  //     },

  //   ],
  // },

  // plugins: [
  //   new HtmlWebpackPlugin({
  //     title: 'andy joseph',
  //     template: path.resolve(__dirname, './src/index.html'), // template file
  //     filename: 'index.html', // output file
  //   }),
  //   new CleanWebpackPlugin(),
  //   new MiniCssExtractPlugin({
  //     filename: '[name]-[contenthash:8].css',
  //   })

//   ],

// }
