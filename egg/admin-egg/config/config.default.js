'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_iambtr';

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

  // add your config here
  // config.middleware = [];
  config.middleware = [ 'erhandle', 'gzip' ];
  //  自定义异常中间件 挂载
  // config.errorHandler = {
  //   // threshold: 1024, // 小于 1k 的响应体不压缩
  //   match: '/restapi',
  // };
  //  自定义中间件 挂载
  config.gzip = {
    threshold: 1024, // 小于 1k 的响应体不压缩
  };
  // config/config.default.js  语言配置
  config.i18n = {
    // 默认语言，默认 "en_US"zh-CN en  zh
    /*
    query: /?locale=en-US
    cookie: locale=zh-TW
    header: Accept-Language: zh-CN,zh;q=0.5
    */
    enable: true, // 开启 才能正常
    defaultLocale: 'zh',
    // URL 参数，默认 "locale"
    queryField: 'locale',
    // Cookie 记录的 key, 默认："locale"
    cookieField: 'locale',
    // Cookie 默认 `1y` 一年后过期， 如果设置为 Number，则单位为 ms
    cookieMaxAge: '1y',
  };
  // 数据库配置
  config.mysql = {
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'user_info',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // 安全配置 csrf 不能测试接口访问

  config.security = {
    csrf: {
      ignore: [ '/restapi', '/login' ],
    },
  };
  // 配置跨域
  config.cors = {
    origin: '*', // {string|Function}
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH', // {string|Array}
  };

  // 鉴权 默认 username password

  config.passportLocal = {
    // usernameField: 'username',
    // passwordField: 'password',
  };
  return config;
};
