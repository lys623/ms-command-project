

// 启用 fis-spriter-csssprites 插件
fis.match('::package', {
  spriter: fis.plugin('csssprites')
})
// 对 CSS 进行图片合并
fis.match('*.{css,less}', {
  // 给匹配到的文件分配属性 `useSprite`
  useSprite: true,
  useHash: true,
  parser: fis.plugin('cssnext')
});

fis.match("*.js",{
  useHash:true
  //query: '?t=' + Date.now()
})


fis.match('*.es', {
  rExt: '.js',
  isJsLike:true,
  //query: '?t=' + Date.now(),
  useHash:true,
  parser: fis.plugin('babel')
});


fis.match('::package', {
  postpackager: fis.plugin('loader', {
    //allInOne: {
    //    css: 'pkg/web_app_${hash}.css',
    //    js: 'pkg/web_app_${hash}.js'
    //}
  })
})
//fis.match('*.less', {
//    rExt: '.css',
//    parser: fis.plugin('less-2.x', {
//
//  })
//})

//fis.match('*.{css,less}', {
//  //packTo: '/static/aio.css'
//    useHash:false
//});

//fis.match('*.html', {
//    parser: fis.plugin('translate-widget'),
//    postprocessor:fis.plugin('format')
//})
//
//fis.config.set("deploy.widget.ftp",{
//  remoteDir : '/wwwroot/widget.100xhs.com/',
//  connect : {
//    host:'192.168.97.150',
//    user:'luyisheng',
//    password:'666999'
//  }
//})
fis.config.set('settings',{
  connect : {
    host:'192.168.97.150',
    user:'luyisheng',
    password:'666999'
  },
  "baseDir": "", //静态文件名称
  "cssDir": "css", //css文件夹名称
  "imgDir": "css/i", //css/i文件夹名称
  "imagesDir": "images", //images文件夹名称
  "jsDir": "js", //js文件夹名称
  "htmlDir": "html", //html文件夹名称
  "widgetDir": "widget", //widget文件夹名称
  "cdn":"http://www.miaoshoucdn.com",
  "devcdn": "http://192.168.97.150:89", //newcdn
  "serverDir": "/wwwroot/www.miaoshoucdn.com/", //上传至远端服务器文件夹的名称
  "previewServerDir": "/wwwroot/page.miaoshou.com/", //html文件夹上传至服务器所在的文件夹名称
  "widgetServerDir": "/wwwroot/widget.miaoshou.com/", //widget服务器所在的文件夹名称
  "build":{
    "jsPlace": "insertBody", //调试时js文件位置 insertHead|insertBody
    "widgetIncludeComment":true,//widget引用带注释
    "livereload":false, //是否开启liveload
    "sass":true,//是否开启sass编译
    "less":true,//是否开启less编译
    "csslint":false,//是否开启csslint
    "weinre": false, //是否开启移动设备调试
    "weinreUrl": "http://123.56.105.44:8080"//调试移动设备的服务器地址
  },
  "output":{
    "vm": true, //是否开启vm编译
    "jsPlace": "insertBody", //编译后js文件位置 insertHead|insertBody
    "encoding": "utf-8"//指定项目的编码格式：utf-8，gbk
  },
  "widgetDir":"widget",
  "widget":{
    //widget预览所依赖的js
    "js": [
      "http://misc.360buyimg.com/jdf/lib/jquery-1.6.4.js",
      "http://misc.360buyimg.com/jdf/1.0.0/unit/base/1.0.0/base.js"
    ],
    //widget预览所依赖的css
    "css": [
      "http://misc.360buyimg.com/lib/skin/2013/base.css"
    ],
    //新建widget文件夹的文件类型
    "createFiles": ["vm"]
  }
})

fis.media('prod')
    .match('::package', {
      postpackager: fis.plugin('loader', {
        //allInOne: {
        //  css: 'pkg/web_app_${hash}.css',
        //  js: 'pkg/web_app_${hash}.js'
        //}
      })
    })
    .match('*.js', {
      useHash: true,
      optimizer: fis.plugin('uglify-js')
    })
    .match('*.css', {
      useHash: true,
      optimizer: fis.plugin('clean-css')
    })
    .match('*.png', {
      optimizer: fis.plugin('png-compressor')
    })

