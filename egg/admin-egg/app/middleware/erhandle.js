// app/middleware/error_handler.js
// module.exports = () => {
//   return async function erhandle(ctx, next) {
//     try {
//       await next();
//     } catch (err) {
//       // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
//       ctx.app.emit('error', err, ctx);

//       const status = err.status || 500;
//       // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
//       const error = status === 500 && ctx.app.config.env === 'prod'
//         ? 'Internal Server Error'
//         : err.message;

//       // 从 error 对象上读出各个属性，设置到响应中
//       ctx.body = { error };
//       if (status === 422) {
//         ctx.body.detail = err.errors;
//       }
//       ctx.status = status;
//     }
//   };
// };
/* 
  只有正常才进状态码 200  msg 表示结果说明  或者为数据主体
  其余状态码都是异常 msg 表明异常原因

*/

module.exports=()=>{
    return async function errorHandler(ctx,next){
        try{
            await next();
        }catch(err){
            // 所有的异常都在 App 上触发一个error 事件，框架会记录一条错误日志
            // ctx.app.emit('error',err,ctx);
            console.log(err)
            let  status=err.status||500;
            // 生产环境时 500 错误的详细内容不放回给客户端，因为可能包含敏感信息
            let msg=status ===500&&ctx.app.config.env==='prod'?'internal server error':err.message;

            // 从error 对象上读出各个属性，设置到响应中
            /* 
            err.sqlMessage  : 数据库报错 
            name:ER_DUP_ENTTYError
            "msg":"ER_DUP_ENTRY: Duplicate entry 'iambtr2' for key 'username'"
            

            json 格式异常 这里捕获不到
            */
            // 名字重复 数据库报错
            if(/ER_DUP_ENTRY: Duplicate entry .* for key .username./gi.test(msg)){
              // status=200
              msg='用户名已存在'
            }
 
            ctx.body={};
            // 校验失败 egg-valiate 报错
            if(status==422){
                msg='参数错误'
                ctx.body.detail=err.errors;
            }
            ctx.body.msg=msg

            ctx.status=status
        }
    }
}  