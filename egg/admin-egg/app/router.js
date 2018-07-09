'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', 'home.render');// 初始页面
  router.get('/admin', 'home.admin');
  router.get('welcome', '/welcome', 'home.index');
  router.post('/welcome', 'home.welcome');
  router.get('/my', 'home.my');

  // const localStrategy = app.passport.authenticate('local');
  // post username  password 登录权限
  // router.post('pass','/passport/local', localStrategy);

  router.get('/logout', 'user.logout');


  // router.get('/', controller.home.index);
  router.post('/login', controller.home.login);
  router.get('/view', controller.view.index);
  router.get('/user', controller.user.index);
  router.get('/user2', controller.user.add);
  router.get('/session', controller.session.index);
  router.get('/i18', controller.i18.index);

  // restApi
  router.resources('restapi', '/restapi', controller.restapi);

  // 模块？ egg-router-plus。
  // router.resources('devices', '/api/v1/users/:id/devices', controller.v1.devices);
};
