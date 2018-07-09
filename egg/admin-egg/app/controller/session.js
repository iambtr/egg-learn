'use strict';
const Controller = require('egg').Controller;
class ViewController extends Controller {
  //   模板渲染
  async index() {
    const { ctx } = this;
    let n = ctx.session.views || 0;
    // 基于cookie 可以配置redis 不同用户的cookie 对应 不同的session  有了状态
    ctx.session.views = ++n;
    // ctx.body = n + ' views';
    ctx.logger.info(n);
    const renderData = { n };
    await ctx.render('session/index.html', renderData);
    // await next()  没有的
  }
}
module.exports = ViewController;
