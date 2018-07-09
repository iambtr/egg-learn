'use strict';
const Controller = require('egg').Controller;
/*
GET	/posts	posts	app.controllers.posts.index
GET	/posts/new	new_post	app.controllers.posts.new
GET	/posts/:id	post	app.controllers.posts.show
GET	/posts/:id/edit	edit_post	app.controllers.posts.edit
POST	/posts	posts	app.controllers.posts.create
PUT	/posts/:id	post	app.controllers.posts.update
DELETE	/posts/:id	post	app.controllers.posts.destroy

*/
// 定义创建接口的请求参数规则
const createRule = {
  username: { type: 'string', required: true },
  password: { type: 'string', required: true },
  phone: { type: 'int', required: true, max: 10000000000 },
  address: 'string',
};
const updateRule = {
  username: { type: 'string', required: false },
  password: { type: 'string', required: false },
  phone: { type: 'int', max: 10000000000, required: false },
  address: { type: 'string', required: false },
};
class RestApiController extends Controller {
  async index() {
    this.ctx.body = '获取全部用户';
    const { ctx } = this;
    const users = await ctx.service.restapi.selectUsers();

    // console.log(users);

    ctx.body = users;
  }
  async show() {
    // this.ctx.body='获取当个用户'
    const { ctx } = this;
    const id = Number(ctx.params.id);
    // console.log(typeof id)  params 和 get 通常数字都是字符串 类型
    const user = await ctx.service.restapi.getUser(id);
    this.ctx.body = user;
  }
  async create() {
    // this.ctx.body='创建用户'
    const { ctx } = this;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(createRule);
    // 调用 service 创建一个 topic
    const res = await ctx.service.restapi.create(ctx.request.body);
    // 设置响应体和状态码
    // const bodyData = ctx.request.body;
    //  ctx.body = {
    //     topic_id: id,
    //   };
    console.log(ctx.session.user);
    ctx.session.user = ctx.request.body;

    ctx.body = { msg: '创建用户成功', res };
    //   ctx.status = 201;
  }
  async update() {
    // this.ctx.body='更新用户'
    const { ctx } = this;
    const token = ctx.get('token');
    console.log('headtoken:', token);
    const tokenUser = ctx.session[token];
    if(!tokenUser){
        ctx.throw(401,'请登录')
        return
    }
    console.log('update:', tokenUser,ctx.session);
    ctx.logger.warn(ctx.session)
    const bodyData = ctx.request.body;
    // const row ={
    //     id:ctx.params.id,
    //     ...bodyData
    // }
    if(Number(ctx.params.id)!==tokenUser.id){0
        ctx.throw(403,'无权修改')
        return
    }
    const row = Object.assign({}, { id: ctx.params.id }, bodyData);

    ctx.validate(updateRule);
    const res = await ctx.service.restapi.updateUser(row);
    ctx.body = { res, tokenUser };
    // this.ctx.body = { msg: '更新用户', bodyData, id };
  }
  async destroy() {
    const { ctx } = this;
    console.log('del:', ctx.session.user);
    ctx.body = '删除用户';
    const id = Number(ctx.params.id);
    const res = await ctx.service.restapi.deleteUser(id);
    ctx.body = res;
  }
}

module.exports = RestApiController;
