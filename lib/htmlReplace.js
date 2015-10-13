var f = require('./file.js');
var fs = require('fs');
var path = require('path');
var htmlArr=[]
var $ = module.exports ={
    init:function(source){
        //console.log(source)
        var core = function(){
            if(f.isDir(source)){

                if(!f.isBlankDir(source)){
                    fs.readdirSync(source).forEach(function(name){
                        if(name != '.' && name != '..' && !(/.svn/.test(name)) ) {
                            removedAll = $.init(source + '/' + name) && removedAll;
                        }
                    });

                    if(removedAll) {
                        fs.rmdirSync(source);
                    }
                }
            } else if(f.isFile(source) && f.filter(source)&&path.extname(source)=='.html'){
                    //console.log('html:'+source)
                    htmlArr.push(source);
                    $.replace(source)

            } else {
                removedAll = false;
            }
        }
        core();
    }
}
$.replace=function(path){
    var content=fis.util.read(path,true);
    //console.log(content)
    var resultCSS = content.match($.regCss());
    var resultJs=content.match($.regJs());
    if(resultCSS){
        var combine='';
        var combineArr=[]
        resultCSS.forEach(function(item,index){
            content=content.replace(item,'');
            var arr=$.getWidgetNameCss().exec(item);
            combineArr.push(arr[1]);
        })
        var projectName=global.baseUrl.split('/').pop();
        combine=global.settings.cdn + '/' +projectName+'/widget/??'+combineArr.join(',');
        var cssLink=$.placeholder.csscomboLink(combine)
        content=$.placeholder.insertHead(content,cssLink);
    }
    if(resultJs){
        var combine='';
        var combineArr=[]
        //console.log(resultJs);
        resultJs.forEach(function(item,index){
            content=content.replace(item,'');
            var arr=$.getWidgetNameJs().exec(item);
            combineArr.push(arr[1]);
        })
        var projectName=global.baseUrl.split('/').pop();
        combine=global.settings.cdn + '/' +projectName+'/widget/??'+combineArr.join(',');
        var cssLink=$.placeholder.jscomboLink(combine)
        content=$.placeholder.insertBody(content,cssLink);
        fis.util.write(path,content,'utf8')

    }
}
$.regCss=function(){
    <!--<link rel="stylesheet" type="text/css" href="/widget/other/other_68900ff.css" />-->
    //<link rel="stylesheet" type="text/css" href="/widget/footer/footer_38e08c9.css" />
    //return new RegExp('^(<!--){0}[.\\n\\t\\r\\s]*{%widget\\s.*?name="(.*?)".*?%}[.\\n\\r\\t\\s]*(-->){0}$','gm');
    //return new RegExp('^(<!--){0}[.\\n\\t\\r\\s]*<link\\s.*?href="/widget\\s.*?>[.\\n\\r\\t\\s]*(-->){0}$','gm');
    return new RegExp('^(<!--){0}[.\\n\\t\\r\\s]*<link.+href="/widget(.+)>[.\\n\\r\\t\\s]*(-->){0}$','gm');

}
$.regJs=function(){
    return new RegExp('^(<!--){0}[.\\n\\t\\r\\s]*<script.+src="/widget(.+)>[.\\n\\r\\t\\s]*(-->){0}$','gm');
}
$.getWidgetNameCss=function(){
    return new RegExp('<link.+href="/widget/(.+)"\\s.*?/>$','gm');
}
$.getWidgetNameJs=function(){
    //return new RegExp('<script.+src="/widget(.+)"\\s.*?/>$','gm');
    return new RegExp('<script.*src="/widget/(.*)".*>$','gm');
}
$.placeholder={
    csscomboLink : function(url){
        return '<link type="text/css" rel="stylesheet"  href="'+url+'" source="combo"/>\r\n';
    },
    cssLink : function(url){
        return '<link type="text/css" rel="stylesheet"  href="'+url+'" source="widget"/>\r\n';
    },
    jscomboLink:function(url){
        return '<script type="text/javascript" src="'+url+'" source="widget"></script>\r\n';
    },
    jsLink:function(url){
        return '<script type="text/javascript" src="'+url+'" source="widget"></script>\r\n';
    },
    insertHead:function(content,str){
        if ( /<\/head>/.test(content) ){
            return content.replace('</head>',str+'</head>');
        }else{
            return str + content;
        }
    },
    insertBody:function(content,str){
        if ( /<\/body>/.test(content) ){
            return content.replace(/<\/body>/g,str+'</body>');
        }else{
            return content + str;
        }
    }
}

//    <link rel="stylesheet" type="text/css" href="http://192.168.97.150:89/demo-lv1/widget/??footer/footer.css,header/header.css,other/other.less" />
