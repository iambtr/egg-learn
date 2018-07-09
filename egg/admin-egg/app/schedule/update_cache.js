const Subscription = require('egg').Subscription;
class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置  定时任务
  static get schedule() {
    return {
      // interval:'1h',// 1 分钟间隔
      // 每三小时准点执行一次
      cron: '0 0 3 * * *',
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }
  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    // const res =await this.ctx.curl('http://www.api.com/cache',{
    //     dataType: 'json',
    // })
    this.ctx.logger.warn('schema');
    // this.ctx.app.cache=res.data;

  }
}
module.exports = UpdateCache;
