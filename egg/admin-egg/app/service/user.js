const Service = require('egg').Service;
class userService extends Service {
  async userByname(username) {
    const user = await this.app.mysql.get('user', { username });
    console.log('user:',user)
    if (user) {
      return user;
    }
    return null;
  }
}
module.exports = userService;
