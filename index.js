exports.name = 'project [media name]';
exports.desc = 'build  your project';
exports.options = {
    '-n, --name xxx (-p||-m)':'create a project width name',
    '-u, --upload':'upload a project(css,js,img) to serverDir',
    '-uh, -u --html':'upload a project(html) to previewServerDir',
    '-uc, -u --css':'upload a project(css,js,img) to serverDir',
    '--nodir':'create a project to cur dir'
};
var jdf=require('./lib/jdf.js')
exports.run = function(argv, cli, env) {
    var porjectName=''
    global.baseUrl=env.configBase;
    var settings=fis.config.get('settings');
    global.settings=settings;

    // 显示帮助信息
    if (argv.help) {
        return cli.help(exports.name, exports.options);
    }
    validate(argv);
    porjectName=argv.n||argv.name;
    if(argv.u||argv.upload){
        if(!settings){
            console.log('fis3 warnning : please write fis.config.set("settings",{}) in fis-conf.js file');
            return ;
        }
        require('./modal/upload.js').init(env.configBase,argv);
    }else if(argv.n||argv.name||argv.nodir){
        jdf.createStandardDir(porjectName,argv);
    }else{
        return cli.help(exports.name, exports.options);
    }

    function validate(argv) {
        if (argv._.length > 1) {
            fis.log.error('Unregconized `%s`, please run `%s project --help`', argv._.slice(1).join(' '), fis.cli.name);
            return;
        }

        var allowed = ['_', 'name', 'n', 'upload', 'u', 'html', 'h','p','m','c','nodir'];

        Object.keys(argv).forEach(function(k) {
            if (!~allowed.indexOf(k)) {
                fis.log.error('The option `%s` is unregconized, please run `%s widget --help`', k, fis.cli.name);
                return;
            }
        });
    }
}