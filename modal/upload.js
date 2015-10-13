
var remoteDirCache = {};
var resolveing = {};
module.exports= {
    init:function(path,argv){
        var force=false;
        var cmd='';
        var remoteSettings=fis.config.get('settings');
        global.remoteSettings=remoteSettings;
        if(!remoteSettings){
            console.log('fis3 warnning : please write fis.config.set("settings",{}) in fis-conf.js file');
            return ;
        }
        if(argv.h||argv.html){
            var publishDir=remoteSettings.serverDir = remoteSettings.previewServerDir || '/';
        }else{
            var publishDir=remoteSettings.serverDir = remoteSettings.serverDir || '/';
        }
        var name = process.argv[2];
        var iSProd=process.argv.indexOf('prod')>-1;
        if(iSProd){
            cmd='rm -rf ./build&&fis3 release prod -d ./build'
        }else{
            cmd='rm -rf ./build&&fis3 release udev -d ./build'
        }
        var exec = require('child_process').exec;
        var child = exec(cmd, function(err, stdout, stderr) {
            if(!iSProd){
                global.settings.cdn=global.settings.devcdn
            }
            if (err) throw err;
            console.log(stdout);
            var name=path.split('/').pop();
            var ftp = require('../lib/ftp.js');
            var $ = require('../lib/base.js');
            var htmlReplace=require('../lib/htmlReplace.js');
            htmlReplace.init(path+'/build');
            if(argv.h||argv.html){
                M.uploadhtml(remoteSettings,name,ftp,$)
            }else if(argv.c||argv.css){
                M.uploadCss(remoteSettings,name,ftp,$)
            }else{
                M.uploadAll(remoteSettings,name,ftp,$)
            }

            //process.exit(1);
        });
        //dest = path.join(dest.to || '', dest.release);
        //var dirname = global.baseUrl+'/widget/'+name;

       // var cUrl = global.baseUrl+'/widget/'+name  +'/'+ 'component.json';

    }
}
var M={}
M.uploadCss=function(remoteSettings,name,ftp,$,cb){
    //var publishDir=remoteSettings.serverDir = remoteSettings.serverDir || '/';
    var target=remoteSettings.serverDir+name;
    ftp.mkdir(target,function(err){
        ftp.uploadMain(global.baseUrl+'/build/', target,'(js|css|'+$.imageFileType()+')$', null, null, null, null, function(err,num){
            if(cb){
                cb(num)
            }else{
                console.log('miaoshou porject(css,js) publish  done! '+num+' files');
                process.exit(1) ;
            }
        });
    });
}
M.uploadhtml=function(remoteSettings,name,ftp,$,cb){
    //var publishDir=remoteSettings.serverDir = remoteSettings.previewServerDir || '/';
    var target=(remoteSettings.previewServerDir || '/')+name;
    ftp.mkdir(target+'/html',function(){
        ftp.uploadMain(global.baseUrl+'/build/html', target+'/html',null, null, null, null, null, function(err,num){
            if(cb){
                cb(num)
            }else{
                console.log('miaoshou porject(html) publish  done! '+num+' files');
                process.exit(1) ;
            }
        });
    });
}
M.uploadAll=function(remoteSettings,name,ftp,$){
    M.uploadhtml(remoteSettings,name,ftp,$,function(uploadNum){
    })
    M.uploadCss(remoteSettings,name,ftp,$,function(uploadNum){
        console.log('miaoshou porject(all) publish  done! '+uploadNum+' files');

    })
}


