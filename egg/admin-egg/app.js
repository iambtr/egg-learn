// /app.js
// 根目录下 做一些全局的处理
module.exports = app => {

  app.coreLogger.info('启动耗时 %d ms', Date.now() - app.start);

  app.once('server', server => {
    // websocket 只运行一次
    console.log('once server');
  });
  app.on('error', (err, ctx) => {
    // report error
    console.log('error');
  });
  app.on('request', ctx => {
    // log receive request
    // console.log(ctx.starttime)
  });
  app.on('response', ctx => {
    // ctx.starttime is set by framework  好像是请求开始的时间
    // const used = Date.now() - ctx.starttime;
    // log total cost  返回点位毫秒
    // ctx.logger.warn(`log test${used}`)
  });
  app.beforeStart(async () => {
    // 应用会等待这个函数执行完成才启动 准备工作
    // app.cities = await app.curl('http://example.com/city.json', {
    //     method: 'GET',
    //     dataType: 'json',
    // });

    // 也可以通过以下方式来调用 Service
    // const ctx = app.createAnonymousContext();
    // app.cities = await ctx.service.cities.load();
    console.log('beforeStart');
    app.city = 'wr';
  });


  // set redis session store
  // session store must have 3 methods
  // define sessionStore in `app.js` so you can access `app.redis`
  /** app.sessionStore = {
    async get(key) {
      const res = await app.redis.get(key);
      if (!res) return null;
      return JSON.parse(res);
    },

    async set(key, value, maxAge) {
      // maxAge not present means session cookies
      // we can't exactly know the maxAge and just set an appropriate value like one day
      if (!maxAge) maxAge = 24 * 60 * 60 * 1000;
      value = JSON.stringify(value);
      await app.redis.set(key, value, 'PX', maxAge);
    },

    async destroy(key) {
      await app.redis.del(key);
    },
  };*/

  // session store can be a session store class
};
