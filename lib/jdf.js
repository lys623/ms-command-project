
var jdf = module.exports;
var f = require('./file.js');
var path = require('path');


jdf.createStandardDir = function(dir,argv) {
    jdf.config=global.settings;
    if(dir){
        dir += '/';
    }else{
        dir = 'miaoshou_init/';
    }
    var type='';
    var fisHash = {
        "m" : 'https://github.com/lys623/ms-project-mobile.git',
        "p" : 'https://github.com/lys623/ms-project-pc.git'
    };


    if(argv.p||argv.pc){
        type='pc';
        var templateDir = path.resolve(__dirname, '../template_pc/');
        jdf.getDemoMobile(fisHash['p'],type,argv);
    }else{
        type='mobile';
        jdf.getDemoMobile(fisHash['m'],type,argv);
    }
    console.log("Start Clone ms-project-"+type);
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