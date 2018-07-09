'use strict';
const Controller = require('egg').Controller;
class ViewController extends Controller {
  //   模板渲染
  async index() {
    const { ctx } = this;
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
