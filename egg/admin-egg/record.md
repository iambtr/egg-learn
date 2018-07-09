# egg.js

## 接口返回逻辑

    1种 只有200 正常 其余都是异常 包含msg 原因  正常包含数据
    2种 都是200 只要服务器响应 新增字段 success true 正常  false 异常 msg data数据内容

## router.js
> /app/router.js  对应到controller 的方法

    'use strict';

    /**
    * @param {Egg.Application} app - egg application
    */
    module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/login', controller.home.login);
    router.get('/view', controller.view.index);
    router.get('/user', controller.user.index);

    // 模块？
    // router.resources('devices', '/api/v1/users/:id/devices', controller.v1.devices);
    };

## controller
> /app/controller/*.js  对应到controller 的方法

    'use strict';

    const Controller = require('egg').Controller;

    class HomeController extends Controller {
    async index() {
        this.ctx.body = 'hi, egg';
    }

    async login() {
        this.ctx.body = 'hi, login';
    }
    }

    module.exports = HomeController;


## 静态资源目录 
> /app/public

    /app/public/hi.html

    http://localhost:7001/public/hi.html  映射目录 public 访问

    html:
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <link rel="stylesheet" href="./css/1.css">
    <script src="./js/1.js"></script>
    <body>
        <h1>egg.js static 资源</h1>
    </body>
    </html>

    js:
    /app/public/js/1.js
    'use strict';
    console.log(0);

    js:
    /app/public/css/1.css
    'use strict';
    console.log(0);


## 模板文件
> 配置文件 /config/plugin.js

    'use strict';

    // had enabled by egg
    // exports.static = true;
    exports.nunjucks = {
        enable: true,//打开？
        package: 'egg-view-nunjucks',//使用的包
    };

    /config/config.default.js
      // 视图
    config.view = {
        mapping: {
            // 根据后缀来匹配模板名，比如指定 .nj 后缀的文件使用 Nunjucks 进行渲染。
            '.nj': 'nunjucks',
            '.html': 'nunjucks',
        },
        // 如果根据文件后缀没有找到对应的模板引擎，会使用默认的模板引擎进行渲染。对于只使用一种模板引擎的应用，建议配置此选项。
        defaultViewEngine: 'nunjucks',
        defaultExtension: '.nj',
    };


    'use strict';
    const Controller = require('egg').Controller;
    class ViewController extends Controller {
    //   模板渲染
    async index() {
        let { ctx } = this
        let { type } = ctx.request.query;
        if (!type) { type = 2; }
        // render(name, locals) 渲染模板文件, 并赋值给 ctx.body
        // renderView(name, locals) 渲染模板文件, 仅返回不赋值
        // renderString(tpl, locals) 渲染模板字符串, 仅返回不赋值
        const renderData = { renderType: 'render', items: [{ title: 'abc' }, { title: 'abc2' }, { title: 'abc3' }] };
        switch (Number(type)) {
        case 0:
            await ctx.render('user/index.html', renderData);
            break;
        case 1:
            //   对应view 下面的 user文件夹     // render a template, path relate to `app/view`
            const htmlData = await ctx.renderView('user/index.html', renderData);
            ctx.body = { htmlData };
            break;
        default:
            ctx.body = await ctx.renderString('hi, {{ renderType }}', renderData);
            break;
        }
        // await next()  没有的
    }
    }
    module.exports = ViewController;


> nunjucks

    /app/view 页面根目录 默认的

    await ctx.render('home.nj');

> 路径
    // render a template, path relate to `app/view`
    await ctx.render('home/index.tpl', data);


## service 
> 在实际应用中，Controller 一般不会自己产出数据，也不会包含复杂的逻辑，复杂的过程应抽象为业务逻辑层 Service。    
    
    /app/service  建立文件夹

## logger
> 在实际应用中，Controller 一般不会自己产出数据，也不会包含复杂的逻辑，复杂的过程应抽象为业务逻辑层 Service。    
    
    ctx.logger.debug('debug info');
    ctx.logger.info('some request data: %j', ctx.request.body);
    ctx.logger.warn('WARNNING!!!!');

    // 错误日志记录，直接会将错误日志完整堆栈信息记录下来，并且输出到 errorLog 中
    // 为了保证异常可追踪，必须保证所有抛出的异常都是 Error 类型，因为只有 Error 类型才会带上堆栈信息，定位到问题。
    ctx.logger.error(new Error('whoops'));

## helper
> /app/extend/helper.js  通过ctx.helper 调用它的方法
    
     module.exports={
        formatUser(user){
            return 'helper_user'
        }
    }

    class UserController extends Controller {
    async fetch() {
        const { app, ctx } = this;
        const id = ctx.query.id;
        const user = app.cache.get(id);
        ctx.body = ctx.helper.formatUser(user);
    }
    }
## app.js
> /app.js 会运行的入口  可以不存在  初始化 和监听
    
    // /app.js
    // 根目录下 做一些全局的处理 
    module.exports = app => {
    app.once('server', server => {
        // websocket 只运行一次
        console.log('once server')
    });
    app.on('error', (err, ctx) => {
        // report error
        console.log('error')
    });
    app.on('request', ctx => {
        // log receive request
        console.log(ctx.starttime)
    });
    app.on('response', ctx => {
        // ctx.starttime is set by framework  好像是请求开始的时间
        const used = Date.now() - ctx.starttime;
        // log total cost  返回点位毫秒
        ctx.logger.warn(`log test${used}`)
    });
    app.beforeStart(async () => {
        // 应用会等待这个函数执行完成才启动 准备工作
        // app.cities = await app.curl('http://example.com/city.json', {
        //     method: 'GET',
        //     dataType: 'json',
        // });

        // 也可以通过以下方式来调用 Service
        // const ctx = app.createAnonymousContext();
        // app.cities = await ctx.service.cities.load();
        console.log('beforeStart');
        app.city = 'wr';
    });
    };

