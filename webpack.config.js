const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const svgToMiniDataURI = require("mini-svg-data-uri");
const Dotenv = require('dotenv-webpack');

// --env aaa=zzz 可以透過此方法在 下方 env 中取到 aaa 的值 
// argv 只能輸入特定的參數才可以取到
// 透過argv 取得參數  使用  --output-path 改寫輸出的資料夾位置（預設是dist底下）

module.exports = (env, argv) => {

  const mode = env.mode || 'development';
  const isProduction = mode === 'production';

  return ({
    devServer: {
      static: './dist',
      compress: true,
      port: 9000,
      // 2021 update: For 4.0.0 後 writeToDisk 會放在 devMiddleware中
      devMiddleware: {
        writeToDisk: true
      },
      hot: true
    },
    devtool: isProduction ? false : 'source-map',
    optimization: isProduction ?
    {
      flagIncludedChunks: true, 
      sideEffects: true, 
      usedExports: true, 
      concatenateModules: true, 
      minimize: true
    } :
    {},
    mode,
    watch: true,
    entry: {
      main: path.resolve(__dirname, './src/js/joseph.js'),
    },
    output: isProduction
    ? {
      path: path.resolve(__dirname, './dist'),
      filename: 'js/[name].prod.[hash].js',
      }
    : {
      path: path.resolve(__dirname, './dist'),
      filename: 'js/[name].dev.[hash].js',
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
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      "useBuiltIns": "usage",
                      "corejs": 3
                    }
                  ]
                ],
                plugins: ["@babel/plugin-proposal-class-properties"]
              }

            }    
            
          
        ]
        },
        // Images / file 目前由複製檔案取代(CopyWebpackPlugin)，之後確認是有什麼情匡要用file-loader
        {
          test: /\.(png|jpg|gif)$/,
          use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[path][name].[ext]',
                  context: path.resolve(__dirname, 'src/'),
                  publicPath: '../',
                  limit: 100,
                  useRelativePaths: true
                }
              },
              // {
              //   loader: "url-loader",
              //   options: {
              //     limit: 0,
              //     name: '[path][name].[ext]',
              //     context: path.resolve(__dirname, 'src/'),
              //     useRelativePaths: true
              //   }
              // },
              'image-webpack-loader',
          ] 
        },

        // Svg
        {
          test: /\.svg$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: '[path][name].[ext]',
                context: path.resolve(__dirname, 'src/'),
                publicPath: '../',
                // 編譯後的檔案大小不可小於limit
                // 小於limit : 不會產出檔案 程式會用'data:image/.....'的方式引入 
                // 大於limit : 會產出檔案 程式會用'./assets/.....'的方式引入 
                limit: 310,
                generator: (content) => svgToMiniDataURI(content.toString()),
              },
            },
            "image-webpack-loader"
          ]
        }
  
      ],
      
    },

    plugins: [
      new CleanWebpackPlugin(),
      new Dotenv({
        path: `./.env.${ mode }`,
      }),
      new HtmlWebpackPlugin({
        title: 'andy joseph',
        template: path.resolve(__dirname, './src/index.html'), // template file
        filename: 'index.html', // output file
      }),
      new MiniCssExtractPlugin({
        filename: '[name]-[contenthash:8].css',
      }),
      // 暫時用來複製檔案 
      // new CopyWebpackPlugin({
      //   patterns: [{ from: 'src/assets', to: 'assets' }],
      // }), 
      // 目前
      // new webpack.DefinePlugin({
      //   'process.env':{
      //     NODE_ENV: JSON.stringify(mode),// 要非boolean 或是numbet 需要 stringify
      //   } 

      // }),

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
  //                   context: path.resolve(__dirname, 'src/'),
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
