const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
// const gcmq = require( "gulp-group-css-media-queries" );
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");
const imgCompress = require("imagemin-jpeg-recompress");
const imageminPngquant = require("imagemin-pngquant");
const newer = require("gulp-newer");
const svgSprite = require("gulp-svg-sprite");
// const svgmin = require( "gulp-svgmin" );
// const svgo = require( "svgo" );
const cheerio = require("gulp-cheerio");
const replace = require("gulp-replace");
const webp = require("gulp-webp");
// const svgstore = require( "gulp-svgstore" );
const webpack = require("webpack-stream");
// const del = require( "del" );

/* FILES PATHS */

// Project info

const buildFolder = "./build";

/*
 * Название текущего проекта
 * (необходимо прописать его также в ссылках на js, css и fonts файлы в файлах footer и head в папке layouts)
 */
const projectName = "restaurant";

// const themePath = `${buildFolder}/wp-content/themes/${projectName}/assets/`; // For wordpress
const themePath = `${buildFolder}/`; // For other cases
const htmlMin = false; // HTML minification (false by default)

const paths = {
  prod: {
    build: `${buildFolder}`,
  },
  html: {
    src: "./src/*.html",
    dest: `${buildFolder}`,
    watch: ["./src/*.html"],
  },
  // pug: {
  //   src: './src/pages/*.pug',
  //   dest: `${buildFolder}`,
  //   watch: ['./src/components/**/*.pug', './src/mixins-pug/**/*.pug', './src/pages/**/*.pug', './src/layouts/**/*.pug']
  // },
  // scss: {
  //   src: './src/scss/main.scss',
  //   dest: `${themePath}/css`,
  //   watch: ['./src/scss/**/*.scss', './src/components/**/*.scss']
  // },
  less: {
    src: "./src/less/style.less",
    dest: `${themePath}/css`,
    watch: ["./src/less/**/*.less", "./src/js/components/**/*.less"],
  },
  js: {
    src: "./src/js/index.js",
    dest: `${themePath}/js`,
    watch: "./src/js/**/*.js",
  },
  images: {
    src: ["./src/img/**/*", "!./src/img/*.svg", "!./src/img/**/*.webp"],
    dest: `${themePath}/img`,
    watch: ["./src/img/**/*", "!./src/img/*.svg", "!./src/img/**/*.webp"],
  },
  webpImages: {
    src: "./src/img/**/*.webp",
    dest: `${themePath}/img`,
    watch: "./src/img/**/*.webp",
  },
  svgSprite: {
    src: "./src/img/icons/*.svg",
    dest: `${themePath}/img/icons`,
    watch: "./src/img/icons/*.svg",
  },
  svg: {
    src: ["./src/img/*.svg", "!./src/img/icons/*.svg"],
    dest: `${themePath}/img/`,
    watch: ["./src/img/*.svg", "!./src/img/icons/*.svg"],
  },
  fonts: {
    src: "./src/fonts/**/*",
    dest: `${themePath}/fonts`,
    watch: "./src/fonts/*",
  },
  // php: {
  //   src: './src/php/**/*.php',
  //   dest: `${themePath}/php`,
  //   watch: './src/php/**/*.php'
  // },
  // video: {
  //   src: './src/video/**/*.*',
  //   dest: `${themePath}/video`,
  //   watch: './src/video/**/*.*'
  // }
};

// Project build type (development or production)
let isDev = true; // Оставить true для development или заменить на false для production версии сборки проекта
let isProd = !isDev;

/*
Название конечного js-файла для development или production версии сборки
Подключить соответствующее имя файла на нужных страницах (например, index.pug или index.html)
*/
let jsFilename = isDev ? "./[name].js" : "./[name].min.js";

/* Webpack options */
let webpackConfig = {
  entry: {
    main: "./src/js/main.js",
    filter: "./src/js/filter.js",
    reservation: "./src/js/reservation.js",
    contacts: "./src/js/contacts.js",
    // modal: "./src/js/modal.js",
  },
  output: {
    filename: jsFilename,
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          // options: {
          //   presets: [ "@babel/preset-react", , "@babel/preset-env" ],
          //   plugins: [
          //     "@babel/plugin-proposal-class-properties"
          //   ]
          // }
        },
      },
    ],
  },
  optimization: {
    minimize: isProd,
  },
  devServer: {
    port: 4200,
    overlay: true, // Вывод ошибки на оверлей на экране
    open: true, // Открытие проекта в браузере при запуске в development режиме
  },
  mode: isDev ? "development" : "production",
  devtool: isDev ? "source-map" : "none",
};

/* TASKS */

// Html
const html = () => {
  return gulp
    .src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
};
exports.html = html;

/* LESS TO CSS CONVERTATION & MINIFICATION */
const styles = () => {
  return gulp
    .src(paths.less.src)
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(concat("style.less"))
    .pipe(less())
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename("main.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest(paths.less.dest))
    .pipe(browserSync.stream());
};
exports.styles = styles;

/* JAVASCRIPT MINIFICATION VIA WEBPACK */

const scripts = () => {
  return gulp
    .src(paths.js.src)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream());
};
exports.scripts = scripts;

/* IMAGES MINIFICATION */

const imgmin = () => {
  return gulp
    .src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(
      imagemin([
        imgCompress({
          loops: 4,
          min: 70,
          max: 80,
          quality: "high",
        }),
        imageminPngquant({ quality: [0.7, 0.8], speed: 4 }),
      ])
    )
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browserSync.stream());
};
exports.imgmin = imgmin;

/* IMAGES JPG/JPEG & PNG TO WEBP CONVERTATION */

const createWebp = () => {
  return gulp
    .src(paths.images.src)
    .pipe(plumber())
    .pipe(webp())
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browserSync.stream());
};
exports.createWebp = createWebp;

/* SVG SPRITES */

const sprites = () => {
  return (
    gulp
      .src(paths.svgSprite.src)
      .pipe(plumber())
      .pipe(newer(paths.svgSprite.dest))
      .pipe(
        imagemin([
          imagemin.svgo({
            plugins: [
              {
                removeViewBox: true,
              },
              {
                cleanupIDs: false,
              },
            ],
          }),
        ])
      )
      // .pipe( cheerio( {
      //   run: ($) => {
      //     $( "[fill]" ).removeAttr( "fill" );
      //     $( "[stroke]" ).removeAttr( "stroke" );
      //     $( "[style]" ).removeAttr( "style" );
      //   },
      //   parserOptions: {
      //     xmlMode: true
      //   }
      // } ) )
      .pipe(replace("&gt;", ">"))
      .pipe(
        svgSprite({
          mode: {
            symbol: {
              sprite: "../sprite.svg",
            },
          },
        })
      )
      .pipe(gulp.dest(paths.svgSprite.dest))
      .pipe(browserSync.stream())
  );
};
exports.sprites = sprites;

/* SVG MINIFICATION */

const svg = () => {
  return gulp
    .src(paths.svg.src)
    .pipe(plumber())
    .pipe(newer(paths.svg.dest))
    .pipe(
      imagemin([
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: true,
            },
            {
              cleanupIDs: false,
            },
          ],
        }),
      ])
    )
    .pipe(gulp.dest(paths.svg.dest))
    .pipe(browserSync.stream());
};
exports.svg = svg;

/* FONTS MOVING TO BUILD */

const fonts = () => {
  return gulp
    .src(paths.fonts.src)
    .pipe(plumber())
    .pipe(newer(paths.fonts.dest))
    .pipe(gulp.dest(paths.fonts.dest))
    .pipe(browserSync.stream());
};
exports.fonts = fonts;

/* PHP MOVING TO BUILD */

// gulp.task('php', () => {
//   return gulp.src(paths.php.src)
//     .pipe(plumber())
//     // .pipe(newer(paths.php.dest))
//     .pipe(gulp.dest(paths.php.dest))
//     .pipe(browserSync.stream())
// });

// Cleaning
// const clean = () => {
//   return del( paths.prod.build );
// };
// exports.clean = clean;

// Reload
const reload = (done) => {
  browserSync.reload({ stream: true });
  done();
};

// Server
const server = (done) => {
  browserSync.init({
    server: {
      baseDir: paths.prod.build,
    },
    reloadOnRestart: true,
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};
exports.server = server;

// Watcher
const watcher = () => {
  gulp.watch(paths.less.watch, gulp.series(styles));
  gulp.watch(paths.js.watch, gulp.series(scripts));
  gulp.watch(paths.html.watch, gulp.series(html, reload));
  gulp.watch(paths.images.watch, gulp.series(imgmin, reload));
  gulp.watch(paths.images.watch, gulp.series(createWebp, reload));
  gulp.watch(paths.svgSprite.watch, gulp.series(sprites, reload));
  gulp.watch(paths.svg.watch, gulp.series(svg, reload));
  gulp.watch(paths.fonts.watch, gulp.series(fonts, reload));
  // gulp.watch(paths.php.watch, gulp.series('php', reload));
};

/* PROJECT TASK DEVELOPMENT QUEUE */

// gulp.task( "dev", gulp.series(
// const dev = gulp.series(
//     styles,
//     html,
//     scripts,
//     imgmin,
//     webp,
//     sprites,
//     svg,
//     fonts,
//     // php
//   );

// gulp.task( "prod", gulp.series(
// const prod = gulp.series(
//   clean,
//   styles,
//   html,
//   scripts,
//   imgmin,
//   webp,
//   sprites,
//   svg,
//   fonts,
//   // php
// );

/* START DEVELOPMENT GULP */

exports.default = gulp.series(
  // clean,
  imgmin,
  // styles,
  // html,
  // scripts,
  // webp,
  // sprites,
  // svg,
  // fonts,
  // php
  gulp.parallel(html, styles, sprites, scripts, createWebp, svg, fonts),
  gulp.series(server, watcher)
);

/* START PRODUCTION GULP */

// gulp.task( "prod", gulp.series(
//   prod, "server"
// ) );
const prod = gulp.series(
  // clean,
  fonts,
  gulp.parallel(styles, html, scripts, imgmin, createWebp, sprites, svg),
  gulp.series(server, watcher)
);
exports.prod = prod;

// Copy Images только для разработки, чтобы не тратить время на оптимизацию
// const copyImages = () => {
//   return gulp.src( "src/img/**/*.{jpg,png,svg}" ).pipe( gulp.dest( "build/img" ) );
// };

// Images WebP
// const createWebp = () => {
//   return gulp
//     .src( "src/img/**/*.{jpg,png}" )
//     .pipe( webp( { quality: 80 } ) )
//     .pipe( gulp.dest( "build/img" ) );
// };
// exports.createWebp = createWebp;

// SVG sprite
// const sprite = () => {
//   return gulp
//     .src( "src/img/icons/*.svg" )
//     .pipe(
//       svgstore( {
//         inlineSvg: true,
//       } )
//     )
//     .pipe( rename( "sprite.svg" ) )
//     .pipe( gulp.dest( "build/img" ) );
// };
// exports.sprite = sprite;

// Copy files
// const copy = (done) => {
//   gulp
//     .src(
//       [ "src/fonts/*.{woff2,woff}", "src/*.ico", "src/js/libs/*.js" ],
//       {
//         base: "src",
//       }
//     )
//     .pipe( gulp.dest( "build" ) );
//   done();
// };
// exports.copy = copy;

// Build
// const build = gulp.series(
//   // clean,
//   copy,
//   images,
//   gulp.parallel( styles, sprite, scripts, html, createWebp )
// );
// exports.build = build;

// exports.default = gulp.series(
//   clean,
//   copy,
//   copyImages,
//   gulp.parallel( html, styles, scripts, sprite, createWebp ),
//   gulp.series( server, watcher )
// );
