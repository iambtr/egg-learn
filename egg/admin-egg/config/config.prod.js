'use strict';
// 覆盖配置 default.js
const path = require('path');
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
  // config.logger = {
  //   dir: path.join(appInfo.baseDir, 'logs2'),
  // }

  return config;
};
