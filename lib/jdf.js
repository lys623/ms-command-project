
var jdf = module.exports;
var f = require('./file.js');
var path = require('path');


jdf.createStandardDir = function(dir,argv) {
    jdf.config=global.settings;
    var dirArray = [];
    dirArray[0] = jdf.config.baseDir;
    dirArray[1] = jdf.config.cssDir;
    dirArray[2] = jdf.config.imagesDir;
    dirArray[3] = jdf.config.jsDir;
    dirArray[4] = jdf.config.htmlDir;
    dirArray[5] = jdf.config.widgetDir;
    dirArray[5] = jdf.config.imgDir;

    if(dir){
        dir += '/';
    }else{
        dir = 'miaoshou_init/';
    }

    for (var i = 0; i < dirArray.length; i++) {
        f.mkdir(dir+dirArray[i]);
    }

    var fileArray = [];
    fileArray[0] = jdf.config.htmlDir + '/index.html';
    fileArray[1] = jdf.config.cssDir + '/index.css';
    fileArray[2] = jdf.config.baseDir + '/fis-conf.js';
    var type='';
    if(argv.p||argv.pc){
        var templateDir = path.resolve(__dirname, '../template_pc/');
        type='pc';
    }else if(argv.m||argv.mobile){
        var templateDir = path.resolve(__dirname, '../template_mobile/');
        type='mobile';
    }else{
        var templateDir = path.resolve(__dirname, '../template_mobile/');
        type='mobile';

    }

    for (var i = 0; i < fileArray.length; i++) {
        if (!f.exists(fileArray[i])) f.write(dir+'/'+fileArray[i], f.read(templateDir + '/' + fileArray[i]));
    }

    console.log('miaoshou '+type+' project directory init done!');
}
