'use strict';

// had enabled by egg
// exports.static = true;
module.exports = {
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  // i18: {
  //   enable: true, 不用重复定义 配置里面打开就好了
  //   package: 'egg-i18n',
  // },
  validate: {// 参数验证逻辑
    enable: true,
    package: 'egg-validate',
  },
  mysql: {// mysql 插件
    enable: true,
    package: 'egg-mysql',
  },
  // 跨域
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // 鉴权
  passport: {
    enable: true,
    package: 'egg-passport',
  },
  passportLocal: {
    enable: true,
    package: 'egg-passport-local',
  },
};
