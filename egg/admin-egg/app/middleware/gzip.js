// app/middleware/gzip.js
const isJSON = require('koa-is-json');
const zlib = require('zlib');
// options 是 /config 里面设置options gzip
module.exports = options => {
  return async function gzip(ctx, next) {
    await next();
    let body = ctx.body;
    if (!body) return;
    // 支持 options.threshold
    ctx.logger.warn('zlib');
    if (options.threshold && ctx.length < options.threshold) return;
    if (isJSON(body)) body = JSON.stringify(body);
    // 设置 gzip body，修正响应头
    const stream = zlib.createGzip();
    stream.end(body);
    ctx.body = stream;
    ctx.set('Content-Encoding', 'gzip');
  };
};
