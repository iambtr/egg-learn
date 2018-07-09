'use strict';
const Controller = require('egg').Controller;
class ViewController extends Controller {
  //   模板渲染
  async index() {
    // ctx - 当前请求的 Context 实例。
    // app - 应用的 Application 实例。
    // config - 应用的配置。
    // service - 应用所有的 service。
    // logger - 为当前 controller 封装的 logger 对象。
    const { ctx, logger } = this;

    /*

    ctx.cookies.get(name, [options]) 读取上下文请求中的cookie
    ctx.cookies.set(name, value, [options]) 在上下文中写入cookie
     ctx.cookies.set(
      'cid',
      'hello world',
      {
        domain: 'localhost',  // 写cookie所在的域名
        path: '/index',       // 写cookie所在的路径
        maxAge: 10 * 60 * 1000, // cookie有效时长
        expires: new Date('2017-02-15'),  // cookie失效时间
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
      }
    )
    */
    // 根据获取的这个cookie 的语言来设置 返回言语
    const locale = ctx.cookies.get('locale');
    // 2018-07-05 11:51:13,115 INFO 11024 [-/::1/-/6ms GET /i18] [controller.i18] locale 这个方便定位
    logger.info('locale');
    if (locale === 'zh') {
      ctx.cookies.set('locale', 'en');
      ctx.cookies.set('a', 'en');
      ctx.session.lang = 'zh';
    } else {
      ctx.session.lang = 'en';
      ctx.cookies.set('locale', 'zh');
    }

    //  或者使用 gettext，如果觉得 __ 不好看的话  语言包翻译  参数1  key
    const email = ctx.gettext('Email', locale, ctx.session.lang);

    const renderData = { email };
    await ctx.render('i18/index.html', renderData);
    // await next()  没有的
  }
}
module.exports = ViewController;
