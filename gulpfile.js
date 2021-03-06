/*

    - Make sure node is installed, then:

    npm install gulp -g

    - Then go to project dir and:

    npm install gulp --save-dev

    - Create the file package.json in the root of your proejct with this:

    {
        "dependencies": {
        }
    }

    - Install plugins by running this:

    npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-clean gulp-notify gulp-rename gulp-livereload gulp-cache --save-dev

    ( --save-dev creates a file: package.json)

    Use this browser extension:

    https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei

    Or see for script to place in your footer:

    http://feedback.livereload.com/knowledgebase/articles/86180-how-do-i-add-the-script-tag-manually

*/

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');

gulp.task('styles', function() {
  return gulp.src('sass/main.scss')
    // need to set this to your local path, result of a bug. See: https://github.com/sindresorhus/gulp-ruby-sass/issues/32
    .pipe(sass({loadPath: '~/Sites/imagelightbox/sass'}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minifycss())
    .pipe(gulp.dest('css'))
    .pipe(livereload({ auto: false }))
    .pipe(notify({ message: 'Styles task complete' }));
});


gulp.task('default', function() {

  // Watch .scss files
  gulp.watch('sass/*.scss', ['styles']);

  // Create LiveReload server
  var server = livereload();
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['example.html']).on('change', function(file) {
    server.changed(file.path);
  });

});