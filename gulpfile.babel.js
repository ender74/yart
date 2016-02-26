'use strict'

import gulp from 'gulp'
import template from 'gulp-template'
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream'
import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'
import streamify from 'gulp-streamify'

var path = {
    STATIC: ['src/static/**/*.*'],
    ALL: ['src/**/*.js', 'src/static/**/*.*'],
    ENTRY_POINT: ['src/app.js'],
    MINIFIED_OUT: 'build.min.js',
    DEST_SRC: 'dist/src',
    DEST_BUILD: 'dist/',
    DEST: 'dist',
    TEMPLATE_INDEX: 'src/templates/index.html',
    STATIC_INDEX: 'index.html'
}

function bundler() {
    const transformer = babelify.configure({
        presets: ["es2015", "react"]
    })
    var props = {
        cache: {}, packageCache: {}, fullPaths: true,
        entries: [path.ENTRY_POINT],
        transform: [transformer],
        debug: true
    }
    return browserify(props)
}

gulp.task('copy', function () {
    gulp.src(path.STATIC)
        .pipe(gulp.dest(path.DEST));
})

gulp.task('build-watch', function () {
    gulp.watch(path.STATIC, ['copy'])
    const myBundler = watchify(bundler())
    const bundle = function () {
        myBundler.bundle()
            .pipe(source(path.MINIFIED_OUT))
            .pipe(gulp.dest(path.DEST_BUILD))
        console.log("updated")
    }
    myBundler.on('update', bundle)
    bundle();
})

gulp.task('build-dev', function () {
    bundler().bundle()
        .pipe(source(path.MINIFIED_OUT))
        .pipe(gulp.dest(path.DEST_BUILD));
})

gulp.task('build', function () {
    bundler().bundle()
        .pipe(source(path.MINIFIED_OUT))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(path.DEST_BUILD));
})

gulp.task('renderStatic', function () {
    var staticReact = require('./src/renderToString')(
        './views/app/resume/resume',
        require('./src/static/resume.json'))

    return gulp.src(path.TEMPLATE_INDEX).
        pipe(template({ staticReact: staticReact })).
        pipe(gulp.dest(path.DEST_BUILD))
})

gulp.task('release', ['copy', 'build'])

gulp.task('watch', ['copy', 'build-watch']);

gulp.task('dev', ['copy', 'build-dev'])

gulp.task('default', ['watch'])