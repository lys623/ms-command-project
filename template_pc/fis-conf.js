fis.match('*', {
  useHash: false
});

fis.match('::packager', {
  postpackager: fis.plugin('loader', {
    //allInOne: true
  })
})

fis.match('*.less', {
  rExt: '.css',
  parser: fis.plugin('less-2.x', {

  })
})

fis.match('.build/*',{
  release:false
})


//fis.match('*.{css,less}', {
//  packTo: '/static/aio.css'
//});
fis.match('*.html', {
  parser: fis.plugin('translate-widget'),
  useCache:false,
  postprocessor:fis.plugin('format'),
})

fis.config.set("deploy.widget.ftp",{
  remoteDir : '/wwwroot/widget.100xhs.com/',
  connect : {
    host:'192.168.97.150',
    user:'luyisheng',
    password:'666999',
    secure : false,
    secureOptions : undefined,
    connTimeout : 5000,
    pasvTimeout : 10000,
    keepalive : 10000
  }
})
