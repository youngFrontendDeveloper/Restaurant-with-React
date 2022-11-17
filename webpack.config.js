// const path = require( "path" );
// const HTMLWebpackPlugin = require( "html-webpack-plugin" );
// const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
// const CopyWebpackPlugin = require( "copy-webpack-plugin" );
// const CssMinimizeWebpackPlugin = require( "css-minimizer-webpack-plugin" );
// const TerserWebpackPlugin = require( "terser-webpack-plugin" );
// // const ImageMinimizerPlugin = require( "image-minimizer-webpack-plugin" );
// // const ImageminWebpWebpackPlugin = require( "imagemin-webp-webpack-plugin" );
//
// const isDev = process.env.NODE_ENV === "development";
// const isProd = !isDev;
// const filename = (ext) => isDev ? `[name].${ ext }` : `[name].[contenthash].${ ext }`;
//
// const optimization = () => {
//   const configObj = {
//     splitChunks: {
//       chunks: "all"
//     },
//     usedExports: true,
//   };
//
//   if( isProd ) {
//     configObj.minimizer = [
//       new CssMinimizeWebpackPlugin(),
//       new TerserWebpackPlugin(),
//     ];
//   }
//
//   return configObj;
// };
//
// const plugins = () => {
//   const basePlugins = [
//     new HTMLWebpackPlugin( {
//       template: path.resolve( __dirname, "src/index.html" ),
//       filename: "index.html",
//       minify: {
//         collapseWhitespace: isProd
//       }
//     } ),
//     new MiniCssExtractPlugin( {
//       filename: `./css/${ filename( "css" ) }`
//     } ),
//     new CopyWebpackPlugin( {
//       patterns: [
//         { from: path.resolve( __dirname, "src/assets" ), to: path.resolve( __dirname, "app/assets" ) }
//       ]
//     } ),
//   ];
//
//   return basePlugins;
// };
//
// module.exports = {
//   mode: "development",
//   optimization: optimization(),
//   plugins: plugins(),
//   target: isDev ? "web" : "browserslist",
//   devtool: isDev ? "source-map" : false,
//   // context: path.resolve( __dirname, "src" ),
//   entry: {
//     main: path.resolve( __dirname, "./src/js/main.js" ),
//     filter: path.resolve( __dirname, "./src/js/filter.js" ),
//     reservation: path.resolve( __dirname, "src/js/reservation.js" )
//   },
//   output: {
//     filename: `./js/${ filename( "js" ) }`,
//     path: path.resolve( __dirname, "app" ),
//     clean: true,
//     assetModuleFilename: `assets/${ filename( "[ext]" ) }`,
//   },
//   devServer: {
//     historyApiFallback: true,
//     static: path.resolve( __dirname, "app" ),
//     open: true,
//     compress: true,
//     hot: true,
//     port: 3000,
//   },
//
//   module: {
//     rules: [
//       {
//         test: /\.html$/i, loader: "html-loader",
//       },
//
//       {
//         test: /\.(jsx?|tsx?)$/i,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           options: {
//             cacheDirectory: true, // Использование кэша для избежания рекомпиляции при каждом запуске
//           },
//         },
//       },
//
//       {
//         test: /\.(jpe?g|png|webp|gif|svg)$/i, use: [ {
//           loader: "image-webpack-loader", options: {
//             mozjpeg: {
//               progressive: true,
//             }, optipng: {
//               enabled: false,
//             }, pngquant: {
//               quality: [ 0.65, 0.90 ], speed: 4
//             }, gifsicle: {
//               interlaced: false,
//             }, webp: {
//               quality: 75
//             },
//           }
//         } ], type: "asset/resource", generator: {
//           filename: `img/${ filename( "[ext]" ) }`,
//         }
//       },
//
//       {
//         test: /\.(c|sa|sc)ss$/i, use: [ isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", {
//           loader: "postcss-loader", options: {
//             postcssOptions: {
//               plugins: [ require( "postcss-preset-env" ) ],
//             },
//           },
//         }, "group-css-media-queries-loader", "sass-loader", ],
//       },
//
//       {
//         test: /\.(woff|woff2)$/i, type: "asset/resource", generator: {
//           filename: `./fonts/${ filename( "[ext]" ) }`
//         }
//       },
//
//     ]
//   }
// };
