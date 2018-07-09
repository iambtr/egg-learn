'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx, app } = this;
    // 打印日志
    ctx.logger.error('log user2');
    app.logger.info('log user app');
    this.ctx.body = 'hi, user';
  }
  async add() {
    this.ctx.body = 'hi, user add';
  }
  // 登出
  async logout() {
    const ctx = this.ctx;

    ctx.logout();
    console.log('refer:', ctx.get('referer'));
    ctx.redirect(ctx.get('referer') || '/');
  }
}

module.exports = UserController;
