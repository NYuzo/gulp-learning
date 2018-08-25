const gulp = require('gulp')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')  
const autoprefixer = require('autoprefixer')
const cssWring = require('csswring')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const browserSync = require('browser-sync').create()

//option

const browserSyncOption = {
  server: './dist'
}

const autoprefixerOption = {
  grid: true
}

const postcssOption = [
  autoprefixer(autoprefixerOption),
  cssWring
]

//task

gulp.task('serve', (done) => {
  browserSync.init(browserSyncOption)
  done()
})

gulp.task('sass', () => {
  return gulp.src('./src/sass/style.scss')
    .pipe(sass())
    .pipe(postcss(postcssOption))
    .pipe(gulp.dest('./dist'))
})

gulp.task('js', () => {
  return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
})

gulp.task('img', () => {
  return gulp.src('./src/img/**/*.{jpg,jpeg,png,gif,svg}')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
})

gulp.task('watch', (done) => {
  const browserReload = (done) => {
    browserSync.reload()
    done()
  }
  gulp.watch('./src/**/*.scss', gulp.parallel('sass'))
  gulp.watch('./src/js/**/*.js', gulp.parallel('js'))
  gulp.watch('./src/img/**/*.{jpg,jpeg,png,gif,svg}', gulp.parallel('img'))
  gulp.watch('./dist/**/*', browserReload)
})

gulp.task('default', gulp.series('serve', 'watch'))