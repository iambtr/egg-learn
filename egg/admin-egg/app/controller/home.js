'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 获取权限
  /* 
    权限流程 
    通过 cookie 得到 session 的对应关系 
    从而得到ctx 用户状态
    ctx.isAuthenticated()  是否授权 或者判断 ctx.user 是否存在   undefined

    login 路由 
    校验用户和密码是否通过，接口调用次数
    api  ctx.login(user)  设置登录成功 可以存储 user

    接口内容 权限处理 可以通过 ctx.user  来做 逻辑

    logout 路由
    登出 用户 ctx.user不存在了    ctx.isAuthenticated() false
    api  ctx.logout()
  
  
  */
  async index() {
    const ctx = this.ctx;
    // 登录页面 action="/passport/local" method='post'  username  password
    await ctx.render('login.html');
  }
  async render() {
    const ctx = this.ctx;
    ctx.body = `
      <div>
        <h2>${ctx.path}</h2>
        <a href="/admin?a=be">admin</a>
      </div>
    `;
  }
  async welcome() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    console.log(username, password);
    // 登录授权接口  判断用户名 密码
    if ((username === 'wr' && password === 'wr') || username === 'l') {
      // 这样真的可以啊
      // await app.passport.authenticate('local')(ctx);

      // 方法2 原始的 passport   api ctx.login ctx.logout  根据用户cookie EGG_SESS 字段决定的
      ctx.login({username,password,type:2})
      ctx.redirect(ctx.session.returnTo)
      return;
    }
    ctx.body = '用户或者密码错误';
  }


  // 权限要求
  async admin() {
    const { ctx } = this;
    if (ctx.isAuthenticated()) {
      // show user info 鉴权成功： { provider: 'local', username: 'root', password: 'dh199248' }
      console.log('鉴权成功：', ctx.user);
      ctx.body = '这样就是代表有权限了？';
    } else {
      // redirect to origin url by ctx.session.returnTo
      console.log(ctx.path);// 估计是记录登录前路由
      ctx.session.returnTo = ctx.path;
      ctx.redirect('/welcome', 302);
    }
  }
  // 权限要求
  async my() {
    const { ctx } = this;
    console.log(ctx.isAuthenticated(),ctx.user)
    ctx.body = { isAuthenticated: ctx.isAuthenticated(), user: ctx.user };
  }


  async login() {
    const loginRule = {
      username: { type: 'string' },
      password: { type: 'string' },
    };

    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate(loginRule);
    const user = await ctx.service.user.userByname(body.username);
    if (user) {
      console.log('login:', user, ctx.seesion);
      this.ctx.logger.info('login:', user, ctx.seesion);
      if (user.password === body.password) {
        const token = body.username + 'token' + body.password;
        ctx.session[token] = user;
        ctx.body = { msg: '登录成功', token };
      } else {
        ctx.throw(402, '密码错误');
      }
    } else {
      ctx.throw(402, '不存在该用户');
    }
  }

}

module.exports = HomeController;
