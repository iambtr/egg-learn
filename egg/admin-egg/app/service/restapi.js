'use strict';
const Service = require('egg').Service;

class RestService extends Service {
  constructor(ctx) {
    super(ctx);
    this.root = 'https://cnodejs.org/api/v1';
  }
  // 建立用户
  async create(user) {
    const res = await this.app.mysql.insert('user', user); // 在 user 表中，插入 新用户
    return res;
  }

  // 更新用户
  async updateUser(user) {
    const res = await this.app.mysql.update('user', user);
    if (res.affectedRows == 0) {
      this.ctx.throw(402, '无此用户');
    } else {
      return '更新成功';
    }
  }

  // 读取用户 全部
  async selectUsers() {
    // get 单条 select 全部
    // const results = await this.app.mysql.select('posts', { // 搜索 post 表
    //     where: { status: 'draft', author: ['author1', 'author2'] }, // WHERE 条件
    //     columns: ['author', 'title'], // 要查询的表字段 返回字段
    //     orders: [['created_at','desc'], ['id','desc']], // 排序方式  asc从小到大  desc从大到小
    //     limit: 10, // 返回数据量
    //     offset: 0, // 数据偏移量
    //   });
    const users = await this.app.mysql.select('user', {
      columns: [ 'id', 'username', 'phone', 'sex', 'address', 'register_time' ],
      orders: [[ 'register_time', 'desc' ]],
    });
    return users;
  }

  // 读取用户 个别
  async getUser(id) {
    const user = await this.app.mysql.get('user', { id });
    if (user) {
      return user;
    }
    // service 层面  要保证结果正常 或者抛出异常  参数2 编程 err 下面  message:'无此用户'  参数3  扩展到 err 对象下
    this.ctx.throw(402, '无此用户', { fa: 'result.data' });

  }

  // 删除用户
  async deleteUser(id) {
    const res = await this.app.mysql.delete('user', { id });
    /*
            {
                "fieldCount":0,
                "affectedRows":0,
                "insertId":0,
                "serverStatus":2,
                "warningCount":0,
                "message":"",
                "protocol41":true,
                "changedRows":0
            }

        */
    if (res.affectedRows == 0) {
      this.ctx.throw(402, '无此用户');
    } else {
      return '删除成功';
    }

  }
}


module.exports = RestService;


// 更新用户

/*
    // 修改数据，将会根据主键 ID 查找，并更新
    const row = {
    id: 123,
    name: 'fengmk2',
    otherField: 'other field value',    // any other fields u want to update
    modifiedAt: this.app.mysql.literals.now, // `now()` on db server
    };
    const result = await this.app.mysql.update('posts', row); // 更新 posts 表中的记录

    => UPDATE `posts` SET `name` = 'fengmk2', `modifiedAt` = NOW() WHERE id = 123 ;

    // 判断更新成功
    const updateSuccess = result.affectedRows === 1;

    // 如果主键是自定义的 ID 名称，如 custom_id，则需要在 `where` 里面配置
    const row = {
    name: 'fengmk2',
    otherField: 'other field value',    // any other fields u want to update
    modifiedAt: this.app.mysql.literals.now, // `now()` on db server
    };

    const options = {
    where: {
        custom_id: 456
    }
    };
    const result = await this.app.mysql.update('posts', row, options); // 更新 posts 表中的记录

    => UPDATE `posts` SET `name` = 'fengmk2', `modifiedAt` = NOW() WHERE custom_id = 456 ;

    // 判断更新成功
    const updateSuccess = result.affectedRows === 1;

    */


// app/service/topics.js
// const Service = require('egg').Service;

// class TopicService extends Service {
//   constructor(ctx) {
//     super(ctx);
//     this.root = 'https://cnodejs.org/api/v1';
//   }

//   async create(params) {
//     // 调用 CNode V1 版本 API
//     const result = await this.ctx.curl(`${this.root}/topics`, {
//       method: 'post',
//       data: params,
//       dataType: 'json',
//       contentType: 'json',
//     });
//     // 检查调用是否成功，如果调用失败会抛出异常
//     this.checkSuccess(result);
//     // 返回创建的 topic 的 id
//     return result.data.topic_id;
//   }

//   // 封装统一的调用检查函数，可以在查询、创建和更新等 Service 中复用
//   checkSuccess(result) {
//     if (result.status !== 200) {
//       const errorMsg = result.data && result.data.error_msg ? result.data.error_msg : 'unknown error';
//       this.ctx.throw(result.status, errorMsg);
//     }
//     if (!result.data.success) {
//       // 远程调用返回格式错误
//       this.ctx.throw(500, 'remote response error', { data: result.data });
//     }
//   }
// }

// module.exports = TopicService;
