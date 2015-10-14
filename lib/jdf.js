
var jdf = module.exports;
var f = require('./file.js');
var path = require('path');


jdf.createStandardDir = function(dir,argv) {
    jdf.config=global.settings;
    //var dirArray = [];
    //dirArray[0] = jdf.config.baseDir;
    //dirArray[1] = jdf.config.cssDir;
    //dirArray[2] = jdf.config.imagesDir;
    //dirArray[3] = jdf.config.jsDir;
    //dirArray[4] = jdf.config.htmlDir;
    //dirArray[5] = jdf.config.widgetDir;
    //dirArray[5] = jdf.config.imgDir;
    if(dir){
        dir += '/';
    }else{
        dir = 'miaoshou_init/';
    }

    //for (var i = 0; i < dirArray.length; i++) {
    //    f.mkdir(dir+dirArray[i]);
    //}
    //var fileArray = [];
    //fileArray[0] = jdf.config.htmlDir + '/index.html';
    //fileArray[1] = jdf.config.cssDir + '/index.css';
    //fileArray[2] = jdf.config.baseDir + '/fis-conf.js';
    var type='';
    var fisHash = {
        "m" : 'https://github.com/lys623/ms-project-mobile.git',
        "p" : 'https://github.com/lys623/ms-project-pc.git'
    };


    if(argv.p||argv.pc){
        type='pc';
        var templateDir = path.resolve(__dirname, '../template_pc/');
        jdf.getDemoMobile(fisHash['p'],type,argv);
        //}else if(argv.m||argv.mobile){
    }else{
        //var templateDir = path.resolve(__dirname, '../template_mobile/');
        type='mobile';
        jdf.getDemoMobile(fisHash['m'],type,argv);
    }
    console.log("Start Clone ms-project-"+type);
    //for (var i = 0; i < fileArray.length; i++) {
    //    if (!f.exists(fileArray[i])) f.write(dir+'/'+fileArray[i], f.read(templateDir + '/' + fileArray[i]));
    //}

    //console.log('miaoshou '+type+' project directory init done!');
}
jdf.getDemoMobile=function(cmd,type,argv){
    var noDir = !!argv.nodir;
    var exec = require('child_process').exec, child;
    child = exec('git clone '+cmd,
        function(error, stdout, stderr) {

            if(error){
                console.log(error);
            }
            else{

                console.log("Clone "+cmd+" Success");

                child = exec('rm -rf ms-project-'+type+'/.git',function(err,out) {

                    if(err)console.log(error);
                    if(argv.n){
                        child = exec('mv ./ms-project-'+type+' ./'+argv.n,function(err,out){

                            if(err)console.log(error);
                        });
                    }
                    if(noDir){
                        child = exec('cp -rf ms-project-'+type+'/* ./',function(err,out){

                            if(err)console.log(error);

                            child = exec('rm -rf ms-project-'+type,function(err,out){

                                if(err)console.log(error);
                            });
                        });
                    }

                });
            }
        });
}