
const { src , dest , series , parallel , watch } = require('gulp');
const clean = require('gulp-clean');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass');
const webserver = require('gulp-webserver');

function cleanTask(){
    return src('./dist' , { allowEmpty : true })
        .pipe(clean());
}

function htmlTask(){
    return src('./src/views/**')
            .pipe(fileinclude({
                prefix : '@',
                basepath : './src/views/templates'
            }))
            .pipe(dest('./dist/views'));
}

function cssTask(){
    return src('./src/css/all.scss')
            .pipe(sass())
            .pipe(dest('./dist/css'));
}

function jsTask(){
    return src('./src/js/**')
            .pipe(dest('./dist/js'));
}

function staticTask(){
    return src('./src/static/**')
            .pipe(dest('./dist/static'));
}

function libTask(){
    return src('./src/lib/**')
            .pipe(dest('./dist/lib'));
}

function mockTask(){
    return src('./src/mock/**')
            .pipe(dest('./dist/mock'));
}

function serverTask(){
    return src('./src/server/**')
            .pipe(dest('./dist/server'));
}

function watchTask(){
    watch('./src/server/**' , serverTask);
    watch('./src/mock/**' , mockTask);
    watch('./src/lib/**' , libTask);
    watch('./src/static/**' , staticTask);
    watch('./src/js/**' , jsTask);
    watch('./src/css/**' , cssTask);
    watch('./src/views/**' , htmlTask);
}

function webTask(){
    return src('./dist')
            .pipe(webserver({
                host : 'localhost',
                port : 3000,
                open : './views/index.html',
                livereload : true
            }));
}

module.exports = {
    dev : series( cleanTask , parallel(htmlTask , cssTask , jsTask , staticTask , libTask , mockTask , serverTask) , parallel(watchTask , webTask) )
};